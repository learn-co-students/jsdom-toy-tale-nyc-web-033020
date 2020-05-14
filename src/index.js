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
        `
        const btn = document.createElement('button')
        btn.className = 'like-btn'
        btn.textContent = "Like <3"
        btn.addEventListener('click', event => {
          console.log('click', event)
          if(event.target.className == 'like-btn'){
            const parent = event.target.parentElement
            const p = parent.querySelector('p')
            const totalNumLikes = parseInt(p.textContent)
            const newNumLikes = totalNumLikes + 1
            p.textContent = newNumLikes + " Likes"

            const patchUrl = url + '/' + toy.id
            const options = {
              method: 'PATCH',
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
              body: JSON.stringify({
                likes: newNumLikes,
              })
            }
            fetch(patchUrl, options).then(response => console.log(response))
          }
        })
        toyDiv.append(btn)
        toyCollection.append(toyDiv)
      }
    })
    
  const form = document.querySelector('.add-toy-form')
  form.addEventListener('submit', (event) => {
    const name = form.name.value
    const imageUrl = form.image.value
    fetch(url, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
      },
      body: JSON.stringify({
        "name": name,
        "image": imageUrl,
        "likes": 0
      })
    }).then(response => console.log(response))
  })

  addBtn.addEventListener("click", () => {

    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
