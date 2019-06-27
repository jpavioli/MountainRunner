const USER_URL = 'http://localhost:3000/users'
const SCORE_URL = 'http://localhost:3000/scores'
let user = {}
let topTen = []

function createNewUser(gamerTag){
  fetch(USER_URL,{
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      gamer_tag: gamerTag
    })
  })
}

function removeUser(gamerTag){
  fetch(USER_URL)
    .then((resp)=>{return resp.json()})
    .then((data)=>{
      let user = data.find((user)=>{return user.gamer_tag == gamerTag})
      fetch(`${USER_URL}/${user.id}`,{
        method: 'DELETE',
      })
    })
  fetch(SCORE_URL)
    .then((resp)=>{return resp.json()})
    .then((scores)=>{
      let userScores = scores.filter((score)=>{return score.user.gamer_tag == gamerTag})
      userScores.forEach((score)=>{
        fetch(`${SCORE_URL}/${score.id}`,{
          method: 'DELETE',
        })
        .then(()=>{renderOnOpen()})
      })
    })
}

function updateUser(gamerTag,newGamerTag){
  fetch(USER_URL)
    .then((resp)=>{return resp.json()})
    .then((data)=>{
      user = data.find((user)=>{return user.gamer_tag == gamerTag})
      fetch(`${USER_URL}/${user.id}`,{
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          gamer_tag: newGamerTag
        })
      })
      .then(()=>{renderOnOpen()})
    })
}

function fetchUser(gamerTag){
  fetch(USER_URL)
    .then((resp)=>{return resp.json()})
    .then((data)=>{
      user = data.find((user)=>{return user.gamer_tag == gamerTag})
      if (user == undefined) {
        createNewUser(gamerTag)
      }
    })
}

function persistScore(user,score){
  fetch(SCORE_URL,{
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      user_id: user.id,
      game_score: score
    })
  })
}

function getTopTen() {
  fetch(SCORE_URL)
    .then((resp)=>{return resp.json()})
    .then((data)=>{
      let topTenDiv = document.querySelector("#top-10")
      topTen = data.sort((a,b) => {return b.game_score - a.game_score}).slice(0,10)
      topTen.forEach((score,index)=>{
        let entry = document.createElement('li')
        entry.innerText = `${index+1}. ${score.game_score} - ${score.user.gamer_tag}`
        topTenDiv.append(entry)
      })
    })
}
