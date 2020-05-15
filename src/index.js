let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const allToysUrl = "http://localhost:3000/toys/"
  fetch(allToysUrl)
      .then(response => response.json())
      .then(toys => {
        toys.forEach(item => {
          const name = item.name 
          const image = item.image
          let likes = item.likes

          let toyCard = document.createElement("div")
          toyCard.className="card"
          toyCard.innerHTML = `
          <h2>${name}</h2>
          <img src="${image}" class="toy-avatar">
          `
          let likeNumber = document.createElement("p")
          likeNumber.innerHTML = `${likes} Likes<3`
          likeNumber.className = "manylikes"
          toyCard.appendChild(likeNumber)
          let likeButton = document.createElement("button")
          likeButton.className = "like-btn"
          likeButton.innerHTML ="Like <3"
          toyCard.appendChild(likeButton)
          likeButton.addEventListener("click", function(event){
            let thisToy = `http://localhost:3000/toys/${item.id}`
            fetch(thisToy,{
              method: "PATCH",
              headers: 
              {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
              
              body: JSON.stringify({
                "likes": likes + 1
              })
            })
            .then(response => response.json())
            .then(json => {
              likes = json.likes
              likeNumber.innerHTML = `${likes} Likes<3`
              likeButton.disabled = true
              likeButton.style.color = "grey"
            })
          })

          const toyCollection = document.querySelector("#toy-collection")
          toyCollection.appendChild(toyCard)
          
        })
        // let likeButtons = document.getElementsByClassName("like-btn")
        // let likeButtonsArray = Array.from(likeButtons)
        // likeButtonsArray.forEach()
        // function incrementLikes()
      })
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
  
// get data 
// make a variable  
// grab html element 
// get the div that's already on file
// set the html element to the variable 
// append it to the parent div



    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      const createNewToyButton = document.querySelector(".submit")
      document.addEventListener("submit", function(event){
        let newToyName = document.querySelector(".add-toy-form").name.value
        let newToyImage = document.querySelector(".add-toy-form").image.value
        console.log(newToyName, newToyImage)
        if (!newToyImage || !newToyName){
          alert("Include a name and image!")
          event.preventDefault
        } else {
          fetch(allToysUrl, {
            method: "POST", 
            headers: 
              {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
            body: JSON.stringify({
              "name": `${newToyName}`,
              "image": `${newToyImage}`,
              "likes": 0
            })
          })
        }
      })


      
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  // get the like buttons 
  // add eventlistener to the like
  // get the likes in html from card 
  // incriment those likes by 1 
  // patch the new like amount to the database

});
