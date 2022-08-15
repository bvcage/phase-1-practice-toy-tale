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

      // create toy card
      let toyCard = document.createElement('div');
      toyCard.classList.add('card');

      // populate card
      let {name, image, likes, id} = toyObj;

        // add toy name
        let toyCardName = document.createElement('h2');
        toyCardName.textContent = name;
        toyCard.appendChild(toyCardName);

        // add toy image
        let toyCardImg = document.createElement('img');
        toyCardImg.classList.add('toy-avatar');
        toyCardImg.src = image;
        toyCard.appendChild(toyCardImg);

        // add toy likes
        let toyCardLikes = document.createElement('p');
        toyCardLikes.textContent = `${likes} like`;
        if (likes > 1) {toyCardLikes.textContent += 's'}
        toyCard.appendChild(toyCardLikes);

        // add like button
        let toyCardLikeBtn = document.createElement('button');
        toyCardLikeBtn.classList.add('like-btn');
        toyCardLikeBtn.id = id;
        toyCardLikeBtn.textContent = 'Like ❤️';
        toyCard.appendChild(toyCardLikeBtn);
      
      // append toy card to collection div
      toyCollection.appendChild(toyCard);
    });
  });


});
