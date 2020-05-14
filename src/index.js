let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
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
  const baseURL = "http://localhost:3000/toys"

  fetch(baseURL)
  .then(resp => resp.json())
  // .then(json => console.log(json))
  .then(json => renderToys(json))

  function renderToys(toys) {
    toyCollectionDiv.innerHTML = ""

    // console.log(toys)

    for (const element of toys) {
      const cardDiv = document.createElement('div')
      cardDiv.className = "card"
      cardDiv.setAttribute('title', `${element.id}`)
      // cardDiv.textContent = "test"
      cardDiv.innerHTML += `
        <h2>${element.name}</h2>
        <img src="${element.image}" class="toy-avatar" />
        <p>${element.likes} Likes </p>
        <button class="like-btn">Like <3</button>
      `
      toyCollectionDiv.appendChild(cardDiv)
      // console.log(element.likes)
    }
}

addToyForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const toyName = e.target.name.value
  const toyImageURL = e.target.image.value
  e.target.reset()

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: toyName,
      image: toyImageURL,
      likes: 0
    })
  });

  fetch(baseURL)
    .then(resp => resp.json())
    // .then(json => console.log(json))
    .then(json => renderToys(json))


})

toyCollectionDiv.addEventListener('click', (e) => {

if (e.target.className === 'like-btn') {
  // console.log(e.target.parentNode)
  const toyCard = e.target.parentNode
  const toyId = e.target.parentNode.title
  let toyLikes
  let currentToyLikes
  let updateToyLike = toyCard.childNodes[5]

  toyLikes = toyCard.childNodes[5].textContent
  const toyLikesArr = toyLikes.split(" ")
  console.log(toyLikesArr[0])
  currentToyLikes = parseInt(toyLikesArr[0])
  currentToyLikes += 1
  console.log(currentToyLikes)
  updateToyLike.textContent = `${currentToyLikes} likes`

  // console.log(e.target.id)

  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      // id: `${}`,
      likes: parseInt(currentToyLikes)
    })
  });

}

})


});
