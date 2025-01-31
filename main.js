(()=>{"use strict";const e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-30",headers:{authorization:"ef6f4971-986f-4940-9ee3-c61b74980adb","Content-Type":"application/json"}},t=e=>e.ok?e.json():Promise.reject(`Ошибка ${e.status}`),r=()=>fetch(`${e.baseUrl}/users/me`,{headers:e.headers}).then(t);function o(e,t,r,o,n,c,a,s,l){const i=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),u=i.querySelector(".card__image"),d=i.querySelector(".card__like-count");u.setAttribute("src",r),u.setAttribute("alt",t),i.querySelector(".card__title").textContent=t,d.textContent=n.length;const p=i.querySelector(".card__delete-button");u.addEventListener("click",(()=>{a(r,t)}));const _=i.querySelector(".card__like-button");return _.addEventListener("click",(()=>{c(_,e,d)})),n.some((e=>e._id===l))&&_.classList.add("card__like-button_is-active"),l!==s?(console.log("Removing delete button"),p.remove()):p.addEventListener("click",(()=>{o(i,e)})),i}function n(r,o,n){((r,o)=>fetch(`${e.baseUrl}/cards/likes/${r}`,{method:o?"DELETE":"PUT",headers:e.headers}).then(t))(o,r.classList.contains("card__like-button_is-active")).then((e=>{r.classList.toggle("card__like-button_is-active"),n.textContent=e.likes.length})).catch((e=>console.log(e)))}function c(r,o){(r=>fetch(`${e.baseUrl}/cards/${r}`,{method:"DELETE",headers:e.headers}).then(t))(o).then((()=>{r.remove()})).catch((e=>{console.log(`Ошибка во время удаления карточки: ${e}`)}))}const a={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},s=(e,t)=>{const r=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);r.forEach((r=>l(e,r,t))),i(r,o,t)},l=(e,t,r)=>{const o=e.querySelector(`.${t.id}-error`);o?(t.classList.remove(r.inputErrorClass),t.setCustomValidity(""),o.classList.remove(r.errorClass),o.textContent=""):console.error(`Элемент с ошибкой для ${t.id} не найден`)},i=(e,t,r)=>{(e=>e.some((e=>!e.validity.valid)))(e)?(t.disabled=!0,t.classList.add(r.inactiveButtonClass)):(t.disabled=!1,t.classList.remove(r.inactiveButtonClass))};function u(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",p),e.addEventListener("click",_)}function d(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",p),e.removeEventListener("click",_)}function p(e){if("Escape"===e.key){const e=document.querySelector(".popup_is-opened");e&&d(e)}}function _(e){(e.target===e.currentTarget||e.target.classList.contains("popup__close"))&&d(e.currentTarget)}const m=document.querySelector(".places__list"),y=document.querySelectorAll(".popup__close"),v=document.querySelector(".popup_type_new-card"),f=document.querySelector('.popup__form[name="new-place"]'),h=f.querySelector(".popup__input_type_card-name"),S=f.querySelector(".popup__input_type_url"),b=document.querySelector(".profile__add-button"),q=document.querySelector(".popup_type_edit"),E=document.querySelector('.popup__form[name="edit-profile"]'),L=E.querySelector(".popup__input_type_name"),k=E.querySelector(".popup__input_type_description"),C=document.querySelector(".profile__info"),g=C.querySelector(".profile__title"),x=C.querySelector(".profile__description"),$=C.querySelector(".profile__edit-button"),A=document.querySelector(".popup_type_avatar"),T=document.querySelector('.popup__form[name="edit-avatar"]'),U=document.querySelector(".popup__input_type_avatar"),w=document.querySelector(".profile__image"),B=document.querySelector(".popup_type_image"),P=B.querySelector(".popup__image"),D=B.querySelector(".popup__caption");let j=null;function N(e,t){P.src=e,P.alt=t,D.textContent=t,u(B)}function O(e,t){t?m.prepend(e):m.append(e)}const I=(e,t)=>{const r=t.querySelector(".popup__button");e?(r.setAttribute("data-text",r.textContent),r.textContent="Сохранение..."):(r.textContent=r.getAttribute("data-text"),r.removeAttribute("data-text"))};$.addEventListener("click",(()=>{L.value=g.textContent,k.value=x.textContent,s(E,a),u(q)})),b.addEventListener("click",(()=>{f.reset(),s(f,a),u(v)})),w.addEventListener("click",(()=>{T.reset(),s(T,a),u(A)})),y.forEach((e=>{const t=e.closest(".popup");e.addEventListener("click",(()=>{t&&d(t)}))})),E.addEventListener("submit",(function(e){})),f.addEventListener("submit",(function(r){var a,s;r.preventDefault(),I(!0,f),(a=h.value,s=S.value,fetch(`${e.baseUrl}/cards`,{method:"POST",headers:e.headers,body:JSON.stringify({name:a,link:s})}).then(t)).then((e=>{O(o(e._id,e.name,e.link,c,e.likes,n,N,e.owner._id,j),!0),f.reset(),d(v)})).catch(console.error).finally((()=>I(!1,f)))})),T.addEventListener("submit",(function(o){var n;o.preventDefault(),I(!0,T),(n=U.value,fetch(`${e.baseUrl}/users/me/avatar`,{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:n})}).then(t)).then((()=>r())).then((e=>{w.style.backgroundImage=`url(${e.avatar})`,j=e._id,T.reset(),d(A)})).catch(console.error).finally((()=>I(!1,T)))})),Promise.all([r(),fetch(`${e.baseUrl}/cards`,{headers:e.headers}).then(t)]).then((([e,t])=>{j=e._id,g.textContent=e.name,x.textContent=e.about,w.style.backgroundImage=`url(${e.avatar})`,t.forEach((e=>{O(o(e._id,e.name,e.link,c,e.likes,n,N,e.owner._id,j))}))})).catch(console.error),(e=>{Array.from(document.querySelectorAll(e.formSelector)).forEach((t=>((e,t)=>{const r=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);i(r,o,t),r.forEach((n=>{n.addEventListener("input",(()=>{((e,t,r)=>{t.validity.valid?l(e,t,r):((e,t,r,o)=>{const n=e.querySelector(`.${t.id}-error`);t.classList.add(o.inputErrorClass),n.textContent=r,n.classList.add(o.errorClass)})(e,t,t.validationMessage,r)})(e,n,t),i(r,o,t)}))}))})(t,e)))})(a)})();