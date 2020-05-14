let addToy = false;

const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");


document.addEventListener("DOMContentLoaded", () => {
  const toyCollection = document.querySelector('#toy-collection')

  fetch('http://localhost:3000/toys')
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
