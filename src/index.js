import { createNewCard, removeCard, toggleLikeCallback } from './components/card.js';
import { updateUserData, fetchInitialCards, fetchUserData, updateUserAvatar } from './components/api.js';
import { clearValidation, enableValidation, validationConfig} from './components/validation.js';
import { closeModal, openModal } from './components/modal.js';
import './pages/index.css';

import {
  cardListContainer,
  closePopupButtonsList,
  createCardPopup,
  createCardForm,
  cardTitleInput,
  cardImageInput,
  addNewCardButton,
  profileEditPopup,
  profileEditForm,
  profileNameInput,
  profileAboutInput,
  profileDetails,
  profileHeader,
  profileSubtitle,
  editProfileButton,
  avatarEditPopup,
  avatarEditForm,
  avatarUrlInput,
  userAvatar,
  imagePopup,
  imageElement,
  imageCaptionElement,
} from './components/constants.js';

let sessionUserId = null;

function openImagePopup(imageSrc, caption) {
  imageElement.src = imageSrc;
  imageElement.alt = caption;
  imageCaptionElement.textContent = caption;
  openModal(imagePopup);
}

function appendCardToContainer(cardElement, toStart) {
  if (toStart) {
    cardListContainer.prepend(cardElement);
  } else {
    cardListContainer.append(cardElement);
  }
}

const renderLoading = (isLoading, formElement) => {
  const buttonElement = formElement.querySelector('.popup__button');
  if (isLoading) {
    buttonElement.setAttribute('data-text', buttonElement.textContent);
    buttonElement.textContent = 'Сохранение...';
  } else {
    buttonElement.textContent = buttonElement.getAttribute('data-text');
    buttonElement.removeAttribute('data-text');
  }
};


function handleProfileSubmit(event) {
  event.preventDefault();
  renderLoading(true, profileEditForm);
  
  updateUserData(profileNameInput.value, profileAboutInput.value)
    .then((userData) => {
      profileHeader.textContent = userData.name;
      profileSubtitle.textContent = userData.about;
      closeModal(profileEditPopup);
    })
    .catch(console.error)
    .finally(() => renderLoading(false, profileEditForm));
}

function handleAddCardSubmit(event) {
  event.preventDefault();
  renderLoading(true, createCardForm);
  
  createNewCard(cardTitleInput.value, cardImageInput.value)
    .then((card) => {
      const newCard = createNewCard(
        card._id,
        cardTitleInput.value,
        cardImageInput.value,
        removeCard,
        card.likes,
        toggleLikeCallback,
        openImagePopup,
        card.owner._id,
        sessionUserId
      );
      appendCardToContainer(newCard, true);
      createCardForm.reset();
      closeModal(createCardPopup);
    })
    .catch(console.error)
    .finally(() => renderLoading(false, createCardForm));
}

function handleEditAvatarSubmit(event) {
  event.preventDefault();
  renderLoading(true, avatarEditForm);
  
  updateUserAvatar(avatarUrlInput.value)
    .then(({ avatar }) => {
      userAvatar.style.backgroundImage = `url(${avatar})`;
      avatarEditForm.reset();
      closeModal(avatarEditPopup);
    })
    .catch(console.error)
    .finally(() => renderLoading(false, avatarEditForm));
}



editProfileButton.addEventListener('click', () => {
  profileNameInput.value = profileHeader.textContent;
  profileAboutInput.value = profileSubtitle.textContent;
  clearValidation(profileEditForm, validationConfig);
  openModal(profileEditPopup);
});

addNewCardButton.addEventListener('click', () => {
  createCardForm.reset();
  clearValidation(createCardForm, validationConfig);
  openModal(createCardPopup);
});

userAvatar.addEventListener('click', () => {
  avatarEditForm.reset();
  clearValidation(avatarEditForm, validationConfig);
  openModal(avatarEditPopup);
});

closePopupButtonsList.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => {
    if (popup) {
      closeModal(popup);
    }
  });
});

profileEditForm.addEventListener('submit', handleProfileSubmit);
createCardForm.addEventListener('submit', handleAddCardSubmit);
avatarEditForm.addEventListener('submit', handleEditAvatarSubmit);

Promise.all([fetchUserData(), fetchInitialCards()])
  .then(([userData, initialCards]) => {
    sessionUserId = userData._id;
    profileHeader.textContent = userData.name;
    profileSubtitle.textContent = userData.about;
    userAvatar.style.backgroundImage = `url(${userData.avatar})`;
    
    initialCards.forEach((card) => {
      const newCard = createNewCard(
        card._id,
        card.name,
        card.link,
        removeCard,
        card.likes,
        toggleLikeCallback,
        openImagePopup,
        card.owner._id,
        sessionUserId
      );
      appendCardToContainer(newCard);
    });
  })
  .catch(console.error);



enableValidation(validationConfig);
