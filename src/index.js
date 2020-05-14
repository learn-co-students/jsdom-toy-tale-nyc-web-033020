let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  let toyCollection = document.querySelector("#toy-collection")
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  const baseUrl = "http://localhost:3000/toys"

  fetch(baseUrl)
    .then(response => response.json())
    .then(toys => toys.forEach(createCard))

  function createCard(toy) {
    let div = document.createElement("div")
    div.className = 'card'
    div.innerHTML = `
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button class="like-btn">Like <3</button>
    `
    toyCollection.appendChild(div)
  }

  document.addEventListener("submit", event => {
    event.preventDefault()
    const toyForm = document.querySelector(".add-toy-form")
    let newToy = {
      name: event.target.name.value,
      image: event.target.image.value,
      like: 0
    }
    fetch(baseUrl, {
      method: 'Post',
      headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newToy)
    })
      .then( response => response.json() )
      .then( toy => {
        createCard(toy)
        toyForm.reset()
      })
  })
});
