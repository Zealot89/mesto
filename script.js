const profile = document.querySelector(".profile");
const profileInfo = profile.querySelector(".profile__info");
const editButton = profileInfo.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupToggle = popup.querySelector(".popup__toggle");

let profileName = profileInfo.querySelector(".profile__title");
let profileActiviti = profileInfo.querySelector(".profile__subtitle");
let nameInput = popup.querySelector(".popup__input_name");
let activitiInput = popup.querySelector(".popup__input_activiti");
let popupForm = popup.querySelector(".popup__form");
const saveButton = popupForm.querySelector(".popup__button");

function openClosePopup() {
  popup.classList.toggle("popup_active");
  if (popup.classList.contains("popup_active")) {
    nameInput.value = profileName.textContent;
    activitiInput.value = profileActiviti.textContent;
  }
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActiviti.textContent = activitiInput.value;
  openClosePopup();
}
editButton.addEventListener("click", openClosePopup);
popupForm.addEventListener("submit", formSubmitHandler);
popupToggle.addEventListener("click", openClosePopup);
saveButton.addEventListener("click", formSubmitHandler);
