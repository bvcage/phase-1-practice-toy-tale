let addToy = false;

const DATA_URL = 'http://localhost:3000/toys';
const NO_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/240px-No_image_available.svg.png';

document.addEventListener("DOMContentLoaded", () => {

  // hide & seek new toy form

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // upload new toy to database

  const toyForm = document.querySelector('form.add-toy-form');
  toyForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const inputName = toyForm.querySelector('[name="name"]').value;
    const inputImg = toyForm.querySelector('[name="image"]').value;

    postNewToy(inputName, inputImg);

  });

  function postNewToy (toyName, toyImg) {
    newToy = {
      "name" : toyName,
      "image" : toyImg,
      "likes" : 0
    }

    newPost = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newToy)
    }

    fetch(DATA_URL, newPost)
    .then((response) => response.json())
    .then((toy) => {
      logToys({toy});
    })
    .catch((error) => console.log(error));

  }

  // get toy inventory & display

  fetch(DATA_URL)
  .then((response) => response.json())
  .then((data) => logToys(data))
  .catch((error) => console.log(error));

  function logToys (inventory) {
    const toyCollection = document.querySelector('div#toy-collection');
    Object.values(inventory).forEach((toy) => {
      const newCard = document.createElement('div');
      newCard.classList.add('card');
      logToyDetails(toy, newCard);
      toyCollection.appendChild(newCard);
    });
  }

  function logToyDetails (toyInfo, toyCard) {

    let {id, name, image, likes} = toyInfo;
    const toyId = id;

    // error handling
    if (image === '') {image = NO_IMAGE}
    if (likes === ('' || undefined)) {likes = 0}

    // assign values

    const h2 = document.createElement('h2');
    h2.textContent = name;
    toyCard.appendChild(h2);

    const img = document.createElement('img');
    img.classList.add('toy-avatar');
    img.src = image;
    toyCard.appendChild(img);

    const para = document.createElement('p');
    para.textContent = `${likes} like`;
    if (likes !== 1) {para.textContent += 's'}
    toyCard.appendChild(para);

    const btn = document.createElement('button');
    btn.classList.add('like-btn');
    btn.id = toyId;
    btn.textContent = 'Like ❤️';
    toyCard.appendChild(btn);

  }
});