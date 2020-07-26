export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.token = options.headers.authorization;
  }
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.token,
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getUserData(func) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        func(res.name, res.about, res.avatar);
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  saveUserData({ name, about }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then((res) => {
        if (!res.ok) return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  saveCardData({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((res) => {
        if (!res.ok) return Promise.reject(`Ошибка: ${res.status}`);
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCardData(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
    });
  }

  likeCard(user, item, card) {
    const myLike = item.likes.find((currentUser, index, array) => {
      if (currentUser._id === user._id) array.splice(index, 1);
      return currentUser._id === user._id;
    });
    if (!myLike) item.likes.push(user);
    return fetch(`${this.baseUrl}/cards/likes/${item._id}`, {
      method: myLike ? "DELETE" : "PUT",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) return Promise.reject(`Ошибка: ${res.status}`);
        res.json().then((res) => {
          card.querySelector(".elements__like-counter").textContent =
            res.likes.length;
          card
            .querySelector(".elements__button")
            .classList.toggle("elements__button_active");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  changeAvatar(url) {
    console.log(url);
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: url.link,
      }),
    })
      .then((res) => {
        if (!res.ok) return Promise.reject(`Ошибка: ${res.status}`);
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
