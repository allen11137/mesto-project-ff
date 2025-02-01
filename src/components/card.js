
import {toggleCardLike, apiRemoveCard} from './api'

export function createNewCard(card, { removeCard, toggleLikeCallback, openImagePopup, userId }) {
	try {
	const cardTemplate = document.querySelector('#card-template')?.content;
	if (!cardTemplate) {
	  console.error(' Ошибка: Не найден шаблон #card-template');
	  return;
	}
  
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	if (!cardElement) {
	  console.error(' Ошибка: Не найден .card в шаблоне');
	  return;
	}
  
	const cardImage = cardElement.querySelector('.card__image');
	const likesCount = cardElement.querySelector('.card__like-count');
	const cardTitle = cardElement.querySelector('.card__title');
  
	if (!cardImage || !likesCount || !cardTitle) {
	  console.error(' Ошибка: Отсутствуют элементы карточки');
	  return;
	}
  
	cardImage.setAttribute('src', card.link);
	cardImage.setAttribute('alt', card.name);
	cardTitle.textContent = card.name;
	likesCount.textContent = card.likes.length;
  
	cardImage.addEventListener('click', () => {
	  openImagePopup(card.link, card.name);
	});
  
	const likeButton = cardElement.querySelector('.card__like-button');
	likeButton.addEventListener('click', () => {
	  toggleLikeCallback(likeButton, card._id, likesCount);
	});
  
	const userHasLiked = card.likes.some(like => like._id === userId);
	if (userHasLiked) {
	  likeButton.classList.add('card__like-button_is-active');
	}
  
	const deleteButton = cardElement.querySelector('.card__delete-button');
	if (card.owner._id !== userId) {
	  deleteButton.remove();
	} else {
	  deleteButton.addEventListener('click', () => {
		removeCard(cardElement, card._id);
	  });
	}
  
	return cardElement;
} catch (error) {
    console.error('Ошибка в createNewCard:', error);
  }
}
  

export function toggleLikeCallback(buttonOfLike, cardId, likesCount) {
	const isLiked = buttonOfLike.classList.contains('card__like-button_is-active')

	toggleCardLike(cardId, isLiked)
		.then(updatedCard => {
			buttonOfLike.classList.toggle('card__like-button_is-active')
			likesCount.textContent = updatedCard.likes.length
		})
		.catch(err => console.log(err))
}


export function removeCard(card, cardId) {
	apiRemoveCard(cardId)
		.then(() => {
			card.remove()
		})
		.catch(err => {
			console.log(`Ошибка во время удаления карточки: ${err}`)
		})
}
