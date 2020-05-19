document.addEventListener('DOMContentLoaded', function(){
  const url = 'http://localhost:3000/toys'
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const collection = document.querySelector('#toy-collection')
  let addToy = false;
  

  // toy container 
  function displayToys(){
    fetch(url).then(res => res.json()).then(toys => {
      toys.forEach(toy => {
      const toyDiv = document.createElement('div')
      toyDiv.setAttribute('class','card')
      toyDiv.setAttribute('id',`${toy.id}`)
      toyDiv.innerHTML = `<h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar"/>
      <p>${toy.likes} Likes </p>
      <button class="like-btn">Like <3</button>`
      collection.appendChild(toyDiv)
      }) 
    })
  }
displayToys()

// add a toy and like a toy 
  document.addEventListener('click', function(e){
    e.preventDefault()
      if (e.target.className == 'submit'){
       const form = document.querySelector('form')
       const newName = document.querySelectorAll('input')[0].value 
       const newPic = document.querySelectorAll('input')[1].value
              let newtoyDiv = document.createElement('div')
              newtoyDiv.setAttribute('class','card')
              newtoyDiv.innerHTML += `<h2>${newName}</h2>
              <img src="${newPic}" class="toy-avatar"/>
              <p> 0 Likes </p>
              <button class="like-btn">Like <3</button>`
              collection.appendChild(newtoyDiv)
       form.reset()
          fetch(url, {
            method: 'POST',
            headers: {
              "content-type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              name: newName,
              image: newPic,
              likes: 0
            })
            
          })
      } 
      else if (e.target.className == 'like-btn'){
        const id = e.target.parentElement.id
        const likesTag = e.target.parentElement.querySelector('p')
        const likes = parseInt(likesTag.innerText) + 1 
             fetch(`${url}/${id}`, {
               method: 'PATCH',
               headers: {
                 "content-type": "application/json",
                 Accept: "application/json"
               },
               body: JSON.stringify({
                 likes: `${likes}`
               })
             }).then(likesTag.innerHTML = `${likes} Likes`)
      }
  })



  /// add new toy dropdown 
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

})