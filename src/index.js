let addToy = false;

const url = "http://localhost:3000/toys"
const submitBtn = document.querySelector('.submit')
const addBtn = document.querySelector("#new-toy-btn")

const toyFormContainer = document.querySelector(".container")
const urlHeaders = {
    "Content-Type": "application/json",
    "Accept": "application/json"
}

fetchAndPopulateInfoForAndysToys()

document.addEventListener('submit',event => {
    event.preventDefault()
    fetch(url,{
        method: "POST",
        headers: urlHeaders,
        body: JSON.stringify({
            "name": `${event.target.name.value}`,
            "image": `${event.target.image.value}`,
            "likes": 0
        })
    })
})

document.addEventListener('click', event => {
    
    let likeCount = parseInt(event.target.parentNode.children[2].textContent,10)
    let newLikeCount = likeCount + 1
    if(event.target.className === "like-btn"){
        fetch(`${url}/${event.target.parentNode.dataset.id}`,{
            method: "PATCH",
            headers: urlHeaders,
            body: JSON.stringify({
                "likes": `${newLikeCount}`
            })
        })
        .then(resp => resp.json())
        .then(console.log)
    }
})


function fetchAndPopulateInfoForAndysToys(){
    fetch(url)
    .then(resp => resp.json())
    .then(toys => {
        toys.forEach(toy => {
            const toyCollection = document.querySelector('#toy-collection')
            const toyCard = document.createElement('div')
            toyCard.className = "card"
            toyCard.dataset.id = `${toy.id}`
            toyCard.innerHTML = `
            <h2>${toy.name}</h2>
            <img src = ${toy.image} class="toy-avatar" />
            <p>${toy.likes}</p>
            <button class="like-btn">Like <3</button>
            `
            toyCollection.appendChild(toyCard)
        })
    } )
}

addBtn.addEventListener("click", event => {
    addToy = !addToy
        if (addToy) {
            toyFormContainer.style.display = "block"
        } else {
            toyFormContainer.style.display = "none"
        }
    })



