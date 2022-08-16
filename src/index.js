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

  // get toy inventory
  fetch('http://localhost:3000/toys')
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

    const {id, name, image, likes} = toyInfo;
    const toyId = id;

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