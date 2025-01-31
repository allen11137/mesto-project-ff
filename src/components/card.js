import {toggleCardLike, apiRemoveCard} from './api'

export function createNewCard(cardId, title, cardImageLink, removeCard, likes, toggleLikeCallback, openImagePopup, ownerId, userId) {
	const cardTemplate = document.querySelector('#card-template').content
	const card = cardTemplate.querySelector('.card').cloneNode(true)
	const cardImage = card.querySelector('.card__image')
	const likesCount = card.querySelector('.card__like-count')

	cardImage.setAttribute('src', cardImageLink)
	cardImage.setAttribute('alt', title)
	card.querySelector('.card__title').textContent = title
	likesCount.textContent = likes.length

	const buttonDelete = card.querySelector('.card__delete-button')

	cardImage.addEventListener('click', () => {
		openImagePopup(cardImageLink, title)
	})

	const buttonOfLike = card.querySelector('.card__like-button')
	buttonOfLike.addEventListener('click', () => {
		toggleLikeCallback(buttonOfLike, cardId, likesCount)
	})

	const userHasLiked = likes.some(like => like._id === userId)
	if (userHasLiked) {
		buttonOfLike.classList.add('card__like-button_is-active')
	}
	
	if (userId !== ownerId) {
		console.log('Removing delete button')
		buttonDelete.remove()
	} else {
		buttonDelete.addEventListener('click', () => {
			removeCard(card, cardId)
		})
	}

	return card
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







