let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyDiv = document.querySelector("#toy-collection")
  // const submitButton = document.querySelector('.submit')

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  document.addEventListener('submit', function(event){
    event.preventDefault()
    console.log(event)
    const form = event.target
    
    const toyName = form[0].value
    const toyImage = form[1].value

    const newToy = {
      name: toyName,
      image: toyImage,
      likes: 0
    }

    fetch('http://localhost:3000/toys', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newToy),
      })
      .then(response => response.json())
      .then(data => {
        createToyDiv(data);
      })

  })

  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(data => createToyLis(data))

  function createToyLis(toys){
    toys.forEach(function(toy){
      const toyLi = createToyDiv(toy)
      toyDiv.append(toyLi)

      })
    }

    function createToyDiv(toy){
      let div = document.createElement('div')
      div.className = "card"
      div.innerHTML = `
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p> ${toy.likes}Likes </p>
        <button class="like-btn">Like <3</button>
      `
      return div
  }
});

