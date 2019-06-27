const SPRITE_ROOT = './assets/sprites'

const rockBottom = 40
const scoreBoard = document.querySelector("#score")
const character = document.createElement("img")

const characterHeight = "100px"
character.style.height = characterHeight
character.style.position = "absolute"
character.style.left = "100px"
character.style.bottom = `${rockBottom+40}px`
character.src = `${SPRITE_ROOT}/run.gif`
document.body.append(character)

let speed_y = 25
let speed_x = 5

document.addEventListener("keydown",(e)=>{
  if(e.key == "ArrowUp" || e.key == " "){
    e.preventDefault()
    jump()
  }
  if(e.key =="ArrowDown" || e.key =="ArrowLeft" || e.key =="ArrowRight"){
    e.preventDefault()
  }
})

let newCloudInterval = setInterval(newCloud,2000)

let cloudInterval = setInterval(function(){
  let allClouds = document.querySelectorAll(".cloud")
  allClouds.forEach((cloud)=>{
    if (parseInt(cloud.style.left) < -300){
      cloud.remove()
    }
    cloud.style.left = `${parseInt(cloud.style.left) - cloud.speed}px`
  })
},20)

// GAME START

function playGame(e) {
  clearInterval(playerIntervalIntro)
  fetchUser(e.target[0].value)
  new Sound("assets/sounds/Ludum-Dare-30- Track-4.wav");
  let playerInterval = setInterval(function(){
    if (parseInt(character.style.bottom) > (window.innerHeight - parseInt(characterHeight))) {
      character.style.bottom = `${window.innerHeight - parseInt(characterHeight)}px`
      speed_y = speed_y - 1
    }
    if (speed_y > 5) { //accelerating upward
      character.src = `${SPRITE_ROOT}/jump1.png`
      character.style.height = characterHeight
      speed_y = speed_y - 1
    }
    if (speed_y == 5 ) {
      character.src = `${SPRITE_ROOT}/mid_air.gif`
      character.style.height = characterHeight
      speed_y = speed_y - 1
    }
    if ( (speed_y < 5) && ( parseInt(character.style.bottom) > (rockBottom+20) ) ) { //weightlessness
      speed_y = speed_y - 1
    }
    if ((parseInt(character.style.bottom) <= rockBottom+20) && (parseInt(character.style.bottom) != rockBottom)) { //landing
      character.style.bottom = `${rockBottom}px`
      character.src = `${SPRITE_ROOT}/run.gif`
      character.style.height = characterHeight
      speed_y = 0
    }
    character.style.bottom = `${parseInt(character.style.bottom)+speed_y}px`
  },20)

  document.querySelectorAll(".obstacle").forEach((obstacle)=>{ obstacle.remove() })
  let score = 0

  let scoreInterval = setInterval(function(){
    scoreBoard.innerText = `SCORE: ${Math.round(score)}`
    score = score +=0.02
  },20)

  // Obstacle Animation

  let newObstacleInterval = setInterval(newObstacle,Math.floor(Math.random()*3000)+1000)

  let obstacleInterval = setInterval(function(){
    let allObstacles = document.querySelectorAll(".obstacle")
    allObstacles.forEach((obstacle)=>{
      if (parseInt(obstacle.style.left) < -300){
        obstacle.remove()
      }
      obstacle.style.left = `${parseInt(obstacle.style.left) - obstacle.speed}px`
      if (impact(obstacle)) {
        persistScore(user,Math.round(score))
        clearInterval(newObstacleInterval)
        clearInterval(obstacleInterval)
        clearInterval(scoreInterval)
        clearInterval(playerInterval)
        let gameOver = document.createElement('p')
        e.target.parentElement.style.display = "block"
        setTimeout(function(){renderGameOver(user,Math.round(score),obstacle.name)},50)
      }
    })
  },20)
}

// Cloud Animation
function newCloud() {
  const CLOUD_ROOT = './assets/clouds'
  const cloudRef = ['1','2','3']
  let cloud = document.createElement("img")
  cloud.style.width = `${Math.floor(Math.random()*200)+100}px`
  cloud.style.position = "absolute"
  cloud.style.left = `${window.innerWidth+10}px`
  cloud.style.bottom = `${(Math.floor(Math.random()*5)+5)*window.innerHeight/10}px`
  cloud.src = `${CLOUD_ROOT}/cloud-${cloudRef[Math.floor(Math.random() * cloudRef.length)]}.png`
  cloud.setAttribute("class","cloud")
  cloud.speed = Math.floor(Math.random()*3+1)
  document.body.append(cloud)
}

/////////////
//FUNCTIONS//
/////////////

let playerIntervalIntro = setInterval(function(){
  if (parseInt(character.style.bottom) > (window.innerHeight - parseInt(characterHeight))) {
    character.style.bottom = `${window.innerHeight - parseInt(characterHeight)}px`
    speed_y = speed_y - 1
  }
  if (speed_y > 5) { //accelerating upward
    character.src = `${SPRITE_ROOT}/jump1.png`
    character.style.height = characterHeight
    speed_y = speed_y - 1
  }
  if (speed_y == 5 ) {
    character.src = `${SPRITE_ROOT}/mid_air.gif`
    character.style.height = characterHeight
    speed_y = speed_y - 1
  }
  if ( (speed_y < 5) && ( parseInt(character.style.bottom) > (rockBottom+20) ) ) { //weightlessness
    speed_y = speed_y - 1
  }
  if ((parseInt(character.style.bottom) <= rockBottom+20) && (parseInt(character.style.bottom) != rockBottom)) { //landing
    character.style.bottom = `${rockBottom}px`
    character.src = `${SPRITE_ROOT}/run.gif`
    character.style.height = characterHeight
    speed_y = 0
  }
  character.style.bottom = `${parseInt(character.style.bottom)+speed_y}px`
},20)

function jump() {
  speed_y = 25
}

function newObstacle() {
  let nextUp = obstacleArr[Math.floor(Math.random() * obstacleArr.length)]
  let obstacle = document.createElement("img")
  obstacle.src = nextUp.root
  let sizeRatio = Math.random() * (nextUp.size_range[1] - nextUp.size_range[0]) + nextUp.size_range[0]
  obstacle.style.height = `${Math.floor(nextUp.size_y * sizeRatio)}px`
  obstacle.style.width = `${Math.floor(nextUp.size_x * sizeRatio)}px`
  obstacle.style.position = "absolute"
  obstacle.style.left = `${window.innerWidth+10}px`
  obstacle.style.bottom = `${Math.random() * (nextUp.height_range[1] - nextUp.height_range[0]) + nextUp.height_range[0]}px`
  obstacle.name = nextUp.name
  obstacle.target_ratio = nextUp.target_ratio
  obstacle.setAttribute("class","obstacle")
  obstacle.speed = Math.random() * (nextUp.speed_range[1] - nextUp.speed_range[0]) + nextUp.speed_range[0]
  document.body.append(obstacle)
}

// logic to detect an impact with an obstacle

function impact(obstacle) {
  let y1 = parseInt(character.style.bottom)
  let y2 = y1 + parseInt(character.style.height)
  let x1 = parseInt(character.style.left)
  let x2 = x1 + parseInt(character.style.width)
  let oy1 = parseInt(obstacle.style.bottom)+parseInt(obstacle.style.height)*(1.0-obstacle.target_ratio)/2.0
  let oy2 = oy1 + parseInt(obstacle.style.height)*obstacle.target_ratio
  let ox1 = parseInt(obstacle.style.left)+parseInt(obstacle.style.width)*(1.0-obstacle.target_ratio)/2.0
  let ox2 = ox1 + parseInt(obstacle.style.width)*obstacle.target_ratio
  if ( ( ((x1>ox1)&&(x1<ox2)) || ((x2>ox1)&&(x2<ox2)) ) && ( ((y1<oy2)&&(y1>oy1)) || ((y2<oy2)&&(y2>oy1)) ) ) {
    return true
  }
  else {
    return false
  }
}
