let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollectionDiv = document.querySelector("#toy-collection")
  const toyUrl = 'http://localhost:3000/toys'
  const toyForm = document.querySelector('.add-toy-form')

  const getToys = () => {
    fetch(toyUrl)
      .then(response => response.json())
      .then(toyData => renderToy(toyData))
  }

  function renderToy(toyData) {
    toyCollectionDiv.innerHTML=""
    toyData.forEach(toy => {
      div = document.createElement("div")
      div.className = "card"
      div.dataset.id = toy.id
      div.innerHTML = `
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn">Like <3</button>
    </div>`
      toyCollectionDiv.append(div)
    })
  }

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyForm.addEventListener("submit", function(event){
        event.preventDefault()

        let addToyForm = event.target

        const name = addToyForm.name.value
        const image = addToyForm.image.value    
        const likes = 0 

        fetch(`http://localhost:3000/toys`, {
          method: 'POST',
          headers: {
            "accept": "application/json",
            "content-type": "application/json"
          },
          body: JSON.stringify({name, image, likes})
        }).then(response => response.json())
        .then(getToys)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  document.addEventListener("click", function(event){
    if (event.target.className === "like-btn"){
      const id = event.target.parentElement.dataset.id
      const likesTag = event.target.parentElement.querySelector("p")
      let likes = parseInt(likesTag.innerText.split(" ")[0])
      likes += 1
      
      fetch(`http://localhost:3000/toys/${id}`,{
        method: 'PATCH',
        headers: {
          "accept": "application/json",
          "content-type": "applcation/json"
        },
        body: JSON.stringify({
          likes: `${likes}`
        })
      })
      .then(response => response.json())
      .then(likesTag.innerHTML = `${likes} likes`)
      
    }
  })
  getToys()

});
