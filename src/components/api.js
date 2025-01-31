const config = {
	baseUrl: 'https://nomoreparties.co/v1/wff-cohort-30',
	headers: {
		authorization: 'ef6f4971-986f-4940-9ee3-c61b74980adb',
		'Content-Type': 'application/json',
	},
}
const getResponse = res => {
	if (res.ok) {
		return res.json()
	}
	return Promise.reject(`Ошибка ${res.status}`)
}

export const fetchUserData = () => {
	return fetch(`${config.baseUrl}/users/me`, {
		headers: config.headers,
	}).then(getResponse)
}

export const fetchInitialCards = () => {
	return fetch(`${config.baseUrl}/cards`, {
		headers: config.headers,
	}).then(getResponse)
}

export const createNewCardApi = (name, link) => {
	return fetch(`${config.baseUrl}/cards`, {
		method: 'POST',
		headers: config.headers,
		body: JSON.stringify({
			name,
			link,
		}),
	}).then(getResponse)
}

export const updateUserData = (name, about) => {
	return fetch(`${config.baseUrl}/users/me`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			name,
			about,
		}),
	}).then(getResponse)
}

export const toggleCardLike = (cardId, isLiked) => {
	const method = isLiked ? 'DELETE' : 'PUT'

	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method,
		headers: config.headers,
	}).then(getResponse)
}

export const apiRemoveCard = cardId => {
	return fetch(`${config.baseUrl}/cards/${cardId}`, {
		method: 'DELETE',
		headers: config.headers,
	}).then(getResponse)
}

export const updateUserAvatar = avatar => {
	return fetch(`${config.baseUrl}/users/me/avatar`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			avatar,
		}),
	}).then(getResponse)
}




