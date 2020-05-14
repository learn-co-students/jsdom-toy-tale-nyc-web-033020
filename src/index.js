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

  const allToys = 'http://localhost:3000/toys'
  fetch(allToys)
  .then(response => response.json())
  .then(toys =>{
    toys.forEach(toy => renderToy(toy))
  })
  function renderToy(toy){
    const container = document.querySelector('#toy-collection')
    container.innerHTML += `
    <div class="card" data-num="${toy.id}">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn">Like <3</button>
    </div>
    `  
  }
  const form = document.querySelector('.add-toy-form')
  form.addEventListener('submit', function(e){
    event.preventDefault()
    const newToys = 'http://localhost:3000/toys'
    fetch(newToys, {
      method: 'POST',
      headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": form.name.value,
        "image": form.image.value,
        "likes": 0
      })
      // form.reset()
    })
    
  })
  // const card = document.getElementsByClassName('card')
  // const toyArray = Array.from(card)
  // console.log(toyArray)
  // toyArray.forEach(toy => {
  //   document.addEventListener('click', function(e){
  //     event.preventDefault()
  //   const likeBtn = document.querySelector('.like-btn')
  //   console.log('clicked!')
  // })
  document.addEventListener('click', function(e){
    event.preventDefault()
    if (e.target.className === 'like-btn'){
      let card = e.target.parentElement
      let p = card.querySelector('p')
      let prevCount = parseInt(p.textContent)
      let id = parseInt(card.getAttribute('data-num'))
      const newCount = prevCount + 1
      p.textContent = `${newCount} likes`
      // count = p.textContent
      fetch(`http://localhost:3000/toys/${id}`, {
        method: 'PATCH',
        headers: 
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "likes": newCount
        })
      })
    }
  })
})

