export {createNewCard, deleteCard, toggleLikeCallback};

function createNewCard(title, cardImageLink, deleteCard, toggleLikeCallback, openImageCallbackPopup ) {
    const cardTemplate = document.querySelector('#card-template').content; 
    const card = cardTemplate.querySelector('.card').cloneNode(true); 
    const cardImage = card.querySelector('.card__image'); 
    cardImage.setAttribute('src', cardImageLink );
    cardImage.setAttribute('alt', title);
    card.querySelector('.card__title').textContent = title;

    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
        deleteCard(card);
    });
    cardImage.addEventListener('click', () => {
        openImageCallbackPopup (cardImageLink , title);
    });
    const buttonOfLike = card.querySelector('.card__like-button');
    buttonOfLike.addEventListener('click', () => {
        toggleLikeCallback(buttonOfLike);
    });

    return card; 
}


function deleteCard(card) {
    card.remove(); 
}


function toggleLikeCallback(card) {
    card.classList.toggle('card__like-button_is-active'); 
}



