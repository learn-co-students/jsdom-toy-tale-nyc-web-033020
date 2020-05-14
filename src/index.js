let addToy = false;
const url = 'http://localhost:3000/toys';


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector('#toy-collection')

  fetch(url)
    .then(resp => resp.json())
    .then(toys => {
      for(const toy of toys) {
        const toyDiv = document.createElement('div')
        toyDiv.className = 'card'

        toyDiv.innerHTML = `
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button class="like-btn">Like <3</button>
        `
        toyCollection.append(toyDiv)
      }
    })
  
  const likeBtn = document.getElementsByClassName('like-btn')
  console.log(likeBtn)
  // const likeBtnArray = Array.from(likeBtn)
  // console.log(likeBtnArray)
  for (const btn of likeBtn) {
    // console.log(btn)
    btn.addEventListener('click', (event) => {
      console.log(event.target)
      if(event.target.className == 'like-btn'){
        const parent = event.target.parentElement
        const p = parent.querySelector('p')
        const totalNumLikes = parseInt(p.textContent)
        const newNumLikes = totalNumLikes + 1
        p.textContent = newNumLikes
      }
    })
  }

  // clicks on addnewtoy
  // make post request to add the toy
  // render on page
  addBtn.addEventListener("click", () => {
    // want to make a post request
    // doesn't add to bottom of page tho
    fetch(url, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
      },
      body: JSON.stringify({
        "name": "Jessie",
        "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
        "likes": 0
      })
    }).then(response => response.json())
    .then(json => {
      toyCollection.append(json)
    })

    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
