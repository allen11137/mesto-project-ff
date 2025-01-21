import './pages/index.css';
import { initialCards } from './components/cards.js';
import { createNewCard, deleteCard, toggleLikeCallback } from './components/card.js';
import { closeModal, openModal } from './components/modal.js';


const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_edit');
const profileEditForm = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = profileEditForm.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const addCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = document.querySelector('.popup__form[name="new-place"]');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardImageLinkInput = document.querySelector('.popup__input_type_url');

const cardListContainer = document.querySelector('.places__list');
const closePopupButtons = document.querySelectorAll('.popup__close');

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');


function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  closeModal(editProfilePopup);
}

function handleImagePopupOpen(imageSrc, caption) {
  imagePopupImage.src = imageSrc;
  imagePopupImage.alt = caption;
  imagePopupCaption.textContent = caption;

  openModal(imagePopup);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const card = cardNameInput.value;
  const cardImageLink = cardImageLinkInput.value;
  const newCard = createNewCard(
    card,
    cardImageLink,
    deleteCard,
    toggleLikeCallback,
    handleImagePopupOpen
  );

  renderCard(newCard, true);
  newCardForm.reset();
  closeModal(newCardPopup);
}

function renderCard(cardElement, toStart) {
  if (toStart === true) {
    cardListContainer.prepend(cardElement);
  } else {
    cardListContainer.append(cardElement);
  }
}


profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(editProfilePopup);
});

addCardButton.addEventListener('click', () => {
  openModal(newCardPopup);
});

closePopupButtons.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => {
    if (popup) {
      closeModal(popup);
    }
  });
});

profileEditForm.addEventListener('submit', handleProfileFormSubmit);
newCardForm.addEventListener('submit', handleAddCardFormSubmit);


initialCards.forEach(card => {
  const newCard = createNewCard(
    card.name,
    card.link,
    deleteCard,
    toggleLikeCallback,
    handleImagePopupOpen
  );
  renderCard(newCard);
});
  