let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const toyUrl = "http://localhost:3000/toys";
  const toyCollection = document.querySelector("#toy-collection");
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetch(toyUrl)
  .then(response => response.json())
  .then(data => {
    const toyDiv = document.createElement("div");
    toyDiv.className = "card"
    console.log(toyDiv)
    toyCollection.appendChild(toyDiv)
    
    const toyInfo = data;

    toyInfo.stringify()

    toyInfo.forEach(toyInfo.innerHTML =`<div class="card">
    <h2>${toyInfo.name}</h2>
    <img src=${toyInfo.image} class="toy-avatar" />
    <p>${toyInfo.likes} Likes </p>
    <button class="like-btn">Like <3</button>
  </div>`)
    console.log(toyInfo)
  })
});
  





// This will create a server storing all of our lost toy data with restful routes
// at `http://localhost:3000/toys`. You can also check out
// `http://localhost:3000/toys/:id`

// ## Fetch Andy's Toys

// On the `index.html` page, there is a `div` with the `id` "toy-collection."

// When the page loads, make a 'GET' request to fetch all the toy objects. With the
// response data, make a `<div class="card">` for each toy and add it to the
// toy-collection `div`.
