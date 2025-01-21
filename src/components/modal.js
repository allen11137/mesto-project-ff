export {openModal, closeModal}

function openModal(popup) {
	 {	popup.classList.add('popup_is-opened')
		document.addEventListener('keydown', closeEscModal)
		popup.addEventListener('click', closeModalByOverlay)
	}
}

function closeModal(popup) {
	 {	popup.classList.remove('popup_is-opened')
		document.removeEventListener('keydown', closeEscModal)
		popup.removeEventListener('click', closeModalByOverlay)
	}
}

function closeEscModal(evt) {
	if (evt.key === 'Escape') {
		const openedPopup = document.querySelector('.popup_is-opened')
		if (openedPopup) {
			closeModal(openedPopup)
		}
	}
}

function closeModalByOverlay(evt) {
	if (evt.target === evt.currentTarget || evt.target.classList.contains("popup__close")) {
		closeModal(evt.currentTarget)
	}
}