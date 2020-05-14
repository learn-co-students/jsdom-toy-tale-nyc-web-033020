let addToy = false;
document.addEventListener("DOMContentLoaded", () => {
  const toyFormContainer = document.querySelector(".container");
  const addBtn = document.querySelector("#new-toy-btn");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
  
  let toyCollection = document.getElementById("toy-collection")
  
  function addToyToDom (toy){
    let div = document.createElement("div")
    div.innerHTML += `
    <div class="card" id=${toy.id}>
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" alt=${toy.name}>
    <p>${toy.likes} Likes </p> 
    <button class="like-btn">Like <3 </button>
    </div`
    toyCollection.appendChild(div)
  }

  
fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(json => json.forEach(addToyToDom));


document.addEventListener("submit", function(e){
  e.preventDefault()
  const form = e.target
  fetch ('http://localhost:3000/toys',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": form.name.value,
      "image": form.image.value,
      "likes": 0
    }),
  })
  .then(resp => resp.json())
  .then(json => addToyToDom(json));
  form.reset()
})


toyCollection.addEventListener("click", (element) => {
  if (element.target.className === 'like-btn'){
    let toyID = element.target.parentElement.id
    let numLikes = parseInt(element.target.previousElementSibling.innerText) +1
    fetch (`http://localhost:3000/toys/${toyID}`,{
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": numLikes
      }),
    })
    .then((response) => response.json())
    .then(toy => {
      element.target.previousElementSibling.innerText = `${numLikes} Likes`
    })
  }
})

});