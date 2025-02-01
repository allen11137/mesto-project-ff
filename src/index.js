import { createNewCard, removeCard, toggleLikeCallback } from './components/card.js';
import { createNewCardApi, updateUserData, fetchInitialCards, fetchUserData, updateUserAvatar } from './components/api.js';
import { clearValidation, enableValidation } from './components/validation.js';
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
  cardTitleError
} from './components/constants.js';

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

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


    function validateCardTitleInput() {
      const pattern = /^[a-zA-Zа-яА-ЯёЁ\- ]+$/;
      if (!pattern.test(cardTitleInput.value)) {
        cardTitleInput.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы");
      } else {
        cardTitleInput.setCustomValidity("");
      }
      cardTitleError.textContent = cardTitleInput.validationMessage;
    }
    
   
    cardTitleInput.addEventListener("input", validateCardTitleInput);
    
    function handleAddCardSubmit(event) {
      event.preventDefault();
      validateCardTitleInput();
    
      if (!createCardForm.checkValidity()) {
        return; 
      }
    
      renderLoading(true, createCardForm);
    
      createNewCardApi(cardTitleInput.value, cardImageInput.value)
        .then((card) => {
          console.log('Карточка создана на сервере:', card);
    
          const newCard = createNewCard(
            card,
            {
              removeCard,
              toggleLikeCallback,
              openImagePopup,
              userId: sessionUserId
            }
          );
    
          if (!newCard) {
            console.error('Ошибка: карточка не создана');
            return;
          }
    
          appendCardToContainer(newCard, true);
          createCardForm.reset();
          closeModal(createCardPopup);
        })
        .catch(err => console.error('Ошибка при создании карточки:', err))
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
        card,
        { 
          removeCard, 
          toggleLikeCallback, 
          openImagePopup, 
          userId: sessionUserId 
        }
      );
      appendCardToContainer(newCard);
    });
    
  })
  .catch(console.error);

enableValidation(validationConfig);
