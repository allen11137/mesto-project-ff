// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки

function newCard(card, deleteCard) {
    const cardNode = cardTemplate.querySelector(".card").cloneNode(true);
    const imageOfCard = cardNode.querySelector(".card__image");
    cardNode.querySelector(".card__title").textContent = card.name;
    imageOfCard.src = card.link;
    imageOfCard.alt = card.name;

    const deleteOfButton = cardNode.querySelector(".card__delete-button");
    deleteOfButton.addEventListener("click", deleteCard);

    return cardNode;
}

// @todo: Функция удаления карточки

function deleteCard(event) {

    const eventTarget = event.target.closest(".places__item");

    if (eventTarget !== null) {
        eventTarget.remove();
    }
}

function showCards(initialCards) {

    initialCards.forEach((card) => {
        const placesCard = newCard(card, deleteCard);
        placesList.append(placesCard);
    });
}

showCards(initialCards);
