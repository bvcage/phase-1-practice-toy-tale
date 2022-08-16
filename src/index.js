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
      toyCollection.appendChild(newCard);
    });
  }
});