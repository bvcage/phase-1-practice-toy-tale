let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  // toggle add toy form

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

  // load existing toy inventory
  const toyCollection = document.querySelector('#toy-collection');
  fetch('http://localhost:3000/toys')
  .then((response) => response.json())
  .then((data) => {
    Object.values(data).forEach((toyObj) => {
      const newToyCard = createToyCard(toyObj);
      toyCollection.appendChild(newToyCard);
    });
  });

  // post new toy to inventory
  const newToyForm = document.querySelector('form.add-toy-form');
  newToyForm.addEventListener('submit', (event) => postNewToy(event, newToyForm));

});

function postNewToy (event, newToyForm) {
  event.preventDefault();
  const newToyName = newToyForm.querySelector('[name="name"]');
  const newToyImg = newToyForm.querySelector('[name="image"]');

  const newToyObj = {
    "name": newToyName.value,
    "image": newToyImg.value,
    "likes": 0
  }

  const newToyPost = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(newToyObj)
  }

  fetch('http://localhost:3000/toys', newToyPost)
  .then((response) => response.json())
  .then((data) => {
    const newToyCard = createToyCard(data);
    toyCollection.appendChild(newToyCard);
  })
  .catch((error) => {
    console.log(error);
  });
}

function createToyCard(toyObj) {

    // create toy card
    let toyCard = document.createElement('div');
    toyCard.classList.add('card');

    // populate card
    let {name, image, likes, id} = toyObj;

    // add name
    let toyCardName = document.createElement('h2');
    toyCardName.textContent = name;
    toyCard.appendChild(toyCardName);

    // add image
    let toyCardImg = document.createElement('img');
    toyCardImg.classList.add('toy-avatar');
    toyCardImg.src = image;
    toyCard.appendChild(toyCardImg);

    // add likes
    let toyCardLikes = document.createElement('p');
    toyCardLikes.textContent = `${likes} like`;
    if (likes !== 1) {toyCardLikes.textContent += 's'}
    toyCard.appendChild(toyCardLikes);

    // add like button
    let toyCardLikeBtn = document.createElement('button');
    toyCardLikeBtn.classList.add('like-btn');
    toyCardLikeBtn.id = id;
    toyCardLikeBtn.textContent = 'Like ❤️';
    toyCard.appendChild(toyCardLikeBtn);

    // add update like button functionality
    toyCardLikeBtn.addEventListener('click', (event) => updateLikeCount(toyCard, id));

    return toyCard;
}

function updateLikeCount(toyCard, toyId) {

  let numLikes = parseInt(toyCard.querySelector('p').textContent.split(' ')[0]);
  numLikes += 1;

  const newToyObj = {
    "likes": numLikes
  }

  const newToyPatch = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(newToyObj)
  }

  fetch(`http://localhost:3000/toys/${toyId}`, newToyPatch)
  .then((response) => response.json())
  .then((data) => {
    newLikeString = `${data.likes} like`;
    if (data.likes !== 1) {newLikeString += 's'}
    toyCard.querySelector('p').textContent = newLikeString;
  })
  .catch((error) => {
    console.log(error);
  });

}