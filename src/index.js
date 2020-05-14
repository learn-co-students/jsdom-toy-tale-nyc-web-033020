let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  // const toyCollection = document.querySelector('#toy-collection')
  // const card = document.createElement('div')
  // const imageTag = document.createElement('img')

  // card.setAttribute('class', 'card');
  // imageTag.setAttribute('src', photo);
  // toyCollection.appendChild(card)
  // card.appendChild(imageTag)

  // console.log(toyCollection)

  const toyCollection = document.querySelector('#toy-collection')


  fetch('http://localhost:3000/toys')
  .then(function(response) {
  return response.json();
  })
 .then(function(json) {
  console.log(json)

  const characterInfo = json

  characterInfo.forEach(person => {
  const name = person.name
  const photo = person.image 
  const likes = person.likes 

  const card = document.createElement('div')
  card.setAttribute('id', `${person.id}`)
  toyCollection.appendChild(card)
  const imageTag = document.createElement('img')
  imageTag.setAttribute('class', 'toy-avatar')
  imageTag.setAttribute('src', photo);
  const h2 = document.createElement('h2')
  h2.innerText = name 
  const para = document.createElement('p')
  para.innerHTML = `${likes} likes`
  const button = document.createElement('button')
  button.innerHTML = 'Like'
  button.setAttribute('id', `${name}`)
  card.setAttribute('class', 'card');
  card.appendChild(h2)
  card.appendChild(imageTag)
  card.appendChild(para)
  card.appendChild(button)
  });

  console.log(toyCollection)


  const form = document.querySelector('.add-toy-form')
  const submit = form.getElementsByTagName('input')[2]

  submit.addEventListener('click', function(e){
    console.log(e.target)
    e.preventDefault()

    const newName = form.getElementsByTagName('input')[0].value 
    const newUrl = form.getElementsByTagName('input')[1].value
    console.log(newName)
   
  
     const newDiv = document.createElement('div')
     newDiv.setAttribute('class','card')

     newDiv.innerHTML = `  <h2>${newName}</h2>
     <img src=${newUrl} class="toy-avatar"/>
     <p> 0 Likes </p>
     <button class="like-btn">Like </button>`
  
    toyCollection.appendChild(newDiv)

    fetch('http://localhost:3000/toys/new'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": newName,
        "image": newUrl,
        "likes": 0
       })
}
})
  

  document.addEventListener('click', function(e){
    let toy = e.target.parentElement
    let likes = toy.getElementsByTagName('p')[0].innerText
    let currentlikes = parseInt(likes)
    let newAmountOflikes = currentlikes + 1 
    console.log(newAmountOflikes)
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({likes:`${newAmountOflikes}` })
    }).then(function(response) {
      return response.json();
      })
     .then(function(json) {
      toy.querySelector('p').innerText = `${json.likes} likes`
      console.log(json)
     });
    


  //   fetch('http://localhost:3000/toys')
  //   .then(function(response) {
  //   return response.json();
  //   })
  //  .then(function(json) {
  //   console.log(json)
  });

});

  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });


 



});
