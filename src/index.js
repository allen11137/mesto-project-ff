
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

// Открытие попапа с изображением
function openImagePopup(imageSrc, caption) {
  imageElement.src = imageSrc;
  imageElement.alt = caption;
  imageCaptionElement.textContent = caption;
  openModal(imagePopup);
}

// Добавление карточки в контейнер
function appendCardToContainer(cardElement, toStart = false) {
  if (toStart) {
    cardListContainer.prepend(cardElement);
  } else {
    cardListContainer.append(cardElement);
  }
}

// Управление состоянием кнопки "Сохранить"
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

// Обработчик отправки формы профиля
function handleProfileSubmit(event) {
  event.preventDefault();
  renderLoading(true, profileEditForm);
  
  updateUserData(profileNameInput.value, profileAboutInput.value)
    .then((userData) => {
      profileHeader.textContent = userData.name;
      profileSubtitle.textContent = userData.about;
      closeModal(profileEditPopup);
    })
    .catch((err) => {
      console.error('Ошибка при обновлении профиля:', err);
      // Можно добавить уведомление пользователю
    })
    .finally(() => renderLoading(false, profileEditForm));
}

// Обработчик отправки формы добавления карточки
function handleAddCardSubmit(event) {
  event.preventDefault();

  if (!createCardForm.checkValidity()) {
    return; // Если форма не валидна, прекращаем выполнение
  }

  renderLoading(true, createCardForm);

  createNewCardApi(cardTitleInput.value, cardImageInput.value)
    .then((card) => {
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
    .catch((err) => {
      console.error('Ошибка при создании карточки:', err);
      // Можно добавить уведомление пользователю
    })
    .finally(() => renderLoading(false, createCardForm));
}

// Обработчик отправки формы обновления аватара
function handleEditAvatarSubmit(event) {
  event.preventDefault();
  renderLoading(true, avatarEditForm);
  
  updateUserAvatar(avatarUrlInput.value)
    .then(({ avatar }) => {
      userAvatar.style.backgroundImage = `url(${avatar})`;
      avatarEditForm.reset();
      closeModal(avatarEditPopup);
    })
    .catch((err) => {
      console.error('Ошибка при обновлении аватара:', err);
      // Можно добавить уведомление пользователю
    })
    .finally(() => renderLoading(false, avatarEditForm));
}

// Открытие попапа редактирования профиля
editProfileButton.addEventListener('click', () => {
  profileNameInput.value = profileHeader.textContent;
  profileAboutInput.value = profileSubtitle.textContent;
  clearValidation(profileEditForm, validationConfig);
  openModal(profileEditPopup);
});

// Открытие попапа добавления карточки
addNewCardButton.addEventListener('click', () => {
  createCardForm.reset();
  clearValidation(createCardForm, validationConfig);
  openModal(createCardPopup);
});

// Открытие попапа редактирования аватара
userAvatar.addEventListener('click', () => {
  avatarEditForm.reset();
  clearValidation(avatarEditForm, validationConfig);
  openModal(avatarEditPopup);
});

// Закрытие попапов по кнопке
closePopupButtonsList.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => {
    if (popup) {
      closeModal(popup);
    }
  });
});

// Назначение обработчиков событий
profileEditForm.addEventListener('submit', handleProfileSubmit);
createCardForm.addEventListener('submit', handleAddCardSubmit);
avatarEditForm.addEventListener('submit', handleEditAvatarSubmit);

// Загрузка данных пользователя и карточек
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
  .catch((err) => {
    console.error('Ошибка при загрузке данных:', err);
    // Можно добавить уведомление пользователю
  });

// Включение валидации форм
enableValidation(validationConfig);
