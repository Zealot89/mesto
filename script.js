const page = document.querySelector(".page");
const content = page.querySelector(".content");
const profile = content.querySelector(".profile");
const profileInfo = profile.querySelector(".profile__info");
const editButton = profileInfo.querySelector(".profile__edit-button");
const popup = content.querySelector(".popup");
const popupToggle = popup.querySelector(".popup__toggle");
let profileName = profileInfo.querySelector(".profile__title");
let profileActiviti = profileInfo.querySelector(".profile__subtitle");
let nameInput = popup.querySelector(".popup__input_name");
let activitiInput = popup.querySelector(".popup__input_activiti");

nameInput.value = profileName.textContent;
activitiInput.value = profileActiviti.textContent;

function openPopup() {
  popup.setAttribute("enable", true);
  popup.classList.toggle("popup_active");
  nameInput.value = profileName.textContent;
  activitiInput.value = profileActiviti.textContent;
}

editButton.addEventListener("click", openPopup);
function closePopup() {
  popup.setAttribute("enable", true);
  popup.classList.toggle("popup_active");
  nameInput.textContent = profileName.value;
  activitiInput.textContent = profileActiviti.value;
}
popupToggle.addEventListener("click", openPopup);

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActiviti.textContent = activitiInput.value;
}

let popupForm = content.querySelector(".popup__form");
popupForm.addEventListener("submit", formSubmitHandler);

const saveButton = popupForm.querySelector(".popup__button");
saveButton.addEventListener("click", closePopup);
