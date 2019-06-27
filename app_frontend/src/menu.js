const container = document.querySelector('.container')
new Sound("assets/sounds/05-Thought-Soup.mp3");
renderOnOpen()

// On Open Render New Page

function renderOnOpen()
{
  let newPage = `
    <form class="new_game_form">
      <h3>Welcome to Mountain Runner! </h3>
      <select id="select-user">
      </select>
      <input type="submit" name="submit" value="Start Game" class="submit" id="new-game">
    </form>
    <br><br>
    <form id="manipulate_users"><br><br><br>
    </form>
    `
  container.innerHTML = newPage
  renderDropDown()
  let startGame = document.querySelector(".new_game_form")
  startGame.addEventListener("submit",(e) => {
    e.preventDefault()
    let gamerTag = e.target[0].value
    if (gamerTag == "Select a Gamer Tag") {
      renderOnOpen()
    }
    else {
      e.target.parentElement.style.display = "none"
      document.querySelector('video').remove()
      playGame(e)
    }
  })
  let editButton = document.createElement('button')
  editButton.innerText = "Edit Gamer"
  editButton.addEventListener('click',(e)=>{
    e.preventDefault()
    renderEditPage()
  })
  let newButton = document.createElement('button')
  newButton.innerText = "New Gamer"
  newButton.addEventListener('click',(e)=>{
    e.preventDefault()
    renderNewPage()
  })
  document.querySelector("#manipulate_users").append(editButton,newButton)

}

// Populate DropDown

function renderDropDown(){
  const selectTag = document.querySelector('#select-user')
  let opTitle = document.createElement('option')
  opTitle.innerText = "Select a Gamer Tag"
  opTitle.selected = true
  opTitle.disabled = true
  selectTag.append(opTitle)
  fetch(USER_URL)
    .then((resp)=>{return resp.json()})
    .then((data)=>{
      data.forEach((user)=>{
        let opTitle = document.createElement('option')
        opTitle.innerText = user.gamer_tag
        selectTag.append(opTitle)
      })
    })
}

function renderEditPage(){
  let editPage = `
    <form id="edit_user_form">
      <h3>Welcome to Mountain Runner! </h3>
      <select id="select-user">
      </select>
      <input type="text" placeholder="New Gamer Tag">
    </form>
    `
  container.innerHTML = editPage
  renderDropDown()
  let editUser = document.createElement('button')
  editUser.innerText = "Edit Gamer"
  editUser.addEventListener('click',(e)=>{
    e.preventDefault()
    let gamerTag = e.target.parentElement.children[1].value
    let newGamerTag = e.target.parentElement.children[2].value
    let selectedIndex = e.target.parentElement.children[1].selectedIndex
    updateUser(gamerTag,newGamerTag)
  })
  let deleteUser = document.createElement('button')
  deleteUser.innerText = "Delete Gamer"
  deleteUser.addEventListener('click',(e)=>{
    e.preventDefault()
    let gamerTag = e.target.parentElement.children[1].value
    let selectedIndex = e.target.parentElement.children[1].selectedIndex
    let selectTag = document.querySelector('#select-user')
    selectTag.children[selectedIndex].remove()
    removeUser(gamerTag)
  })
  document.querySelector("#edit_user_form").append(editUser,deleteUser)
}

function renderNewPage(){
  let newPage = `
    <form id="new_user_form">
      <h3>Welcome to Mountain Runner! </h3>
      <input type="text" placeholder="New Gamer Tag">
    </form>
    `
  container.innerHTML = newPage
  let newUser = document.createElement('button')
  newUser.innerText = "New Gamer"
  newUser.addEventListener('click',(e)=>{
    e.preventDefault()
    let newGamerTag = e.target.parentElement.children[1].value
    renderOnOpen()
    createNewUser(newGamerTag)
    let selectTag = document.querySelector('#select-user')
    let opTitle = document.createElement('option')
    opTitle.innerText = newGamerTag
    opTitle.selected = true
    selectTag.append(opTitle)
  })
  document.querySelector("#new_user_form").append(newUser)
}

function renderGameOver(user,score,killer){
  getTopTen()
  let gameOver = `
    <h3>You were killed by a ${killer}</h3>
    <h1>GAME OVER</h1>
    <h2>Score = ${score}<br></h2>
    <div id="top-10">
    <div>
    `
  container.style.display = "block"
  container.innerHTML = gameOver
  let topTenDiv = document.querySelector("h2")
  let playAgain = document.querySelector("#play-again")
  let playAgainButton = document.createElement('button')
  playAgainButton.innerText = "Play Again"
  playAgainButton.addEventListener('click',(e)=>{
    document.querySelector('video').remove()
    new Sound("assets/sounds/05-Thought-Soup.mp3");
    renderOnOpen()
  })
  topTenDiv.append(playAgainButton)
}
