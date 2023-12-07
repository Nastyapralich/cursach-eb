import "./slider.js";

function addToCartHandler(event) {
  const catalogItem = event.target.closest(".catalog-item");

  if (catalogItem) {
    const title = catalogItem.querySelector(".item-title").innerText;
    const type = catalogItem.querySelector(".item-type").innerText;
    const price = catalogItem.querySelector(".item-price").innerText;
    const img = catalogItem.querySelectorAll(img).innerHTML;

    const itemData = {
      title: title,
      type: type,
      price: price,
      img: img,
    };

    const existingCartItems = JSON.parse(localStorage.getItem("cart")) || [];

    existingCartItems.push(itemData);

    localStorage.setItem("cart", JSON.stringify(existingCartItems));
    alert("Товар добавлен в корзину!");
    // showCartFromLocalStorage();
  }
}

const addToCartButtons = document.querySelectorAll(".addToCart");

addToCartButtons.forEach((button) => {
  button.addEventListener("click", addToCartHandler);
  button.addEventListener("click", showCartFromLocalStorage);
});

const cartC = document.querySelector(".cart-container");
const cartList = document.createElement("div");
cartList.className = "cart-list";
cartC.append(cartList);
const button = document.createElement("button");
button.innerHTML = "Закрыть корзину";
cartC.append(button);

function showCartFromLocalStorage() {
  cartList.innerHTML = "";
  cartC.classList.add("active");
  const cart = localStorage.getItem("cart");
  if (cart) {
    const cartItems = JSON.parse(cart);
    if (cartItems.length == 0) {
      cartList.innerHTML = `<p class ="cartlist-text">Корзина пуста</p>`;
    } else {
      cartItems.forEach((cardItem) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.id = cardItem.id;
        const titleItem = document.createElement("span");
        titleItem.className = "cart-item_title";
        const deleteItem = document.createElement("span");
        deleteItem.className = "delete-item";
        const priceItem = document.createElement("span");
        priceItem.className = "cart-item_price";
        // const itemImg = document.createElement("img");
        // itemImg.className = "item-img";
        titleItem.innerHTML = `Товар ${cardItem.title}`;
        priceItem.innerHTML = `Цена: ${cardItem.price}`;
        // itemImg.src = cardItem.img;
        cartItem.append(priceItem, titleItem, deleteItem);
        cartList.append(cartItem);
        removefromLS(deleteItem, cartItem);
      });
    }
  }
}

let priceSum = 0;
function sum(price) {
  priceSum += price;
  console.log(priceSum);
}

button.addEventListener("click", () => {
  cartC.classList.remove("active");
});

function removefromLS(deleteItem, cartItem) {
  deleteItem.addEventListener("click", function () {
    cartItem.remove(); // Удаляем элемент из интерфейса
    const titleToRemove = cartItem.querySelector(".cart-item_title").innerText;
    console.log(titleToRemove);
    let cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    cart = cart.filter((item) => `Товар ${item.title}` !== titleToRemove); // Фильтруем товары, оставляя только те, которые не совпадают с удаляемым

    localStorage.setItem("cart", JSON.stringify(cart));
    showCartFromLocalStorage();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const filterItems = document.querySelectorAll(".filter-list-item");

  const catalogItems = document.querySelectorAll(".catalog-item");

  filterItems.forEach((filterItem) => {
    filterItem.addEventListener("click", function () {
      filterItems.forEach((item) => {
        item.classList.remove("active");
      });

      filterItem.classList.add("active");

      const filterType = filterItem.textContent.toLowerCase();

      catalogItems.forEach((catalogItem) => {
        const itemType = catalogItem
          .querySelector(".item-type")
          .textContent.toLowerCase();

        if (filterType === "все" || filterType === itemType) {
          catalogItem.style.display = "block";
        } else {
          catalogItem.style.display = "none";
        }
      });
    });
  });
});

const like = document.querySelectorAll(".fa-heart");

like.forEach((likes) => {
  likes.addEventListener("click", setLike);
});

function setLike(event) {
  const catalogItem = event.target.closest(".catalog-item");

  if (catalogItem) {
    const title = catalogItem.querySelector(".item-title").innerText;
    const type = catalogItem.querySelector(".item-type").innerText;
    const price = catalogItem.querySelector(".item-price").innerText;

    const itemData = {
      title: title,
      type: type,
      price: price,
    };

    const existingLikes = JSON.parse(localStorage.getItem("likes")) || [];

    existingLikes.push(itemData);

    localStorage.setItem("likes", JSON.stringify(existingLikes));
    alert("Товар добавлен в избранное");
  }
}

const cartHeader = document.getElementsByClassName("navigation-list-item")[1];
console.log(cartHeader);
cartHeader.addEventListener("click", showCartFromLocalStorage);

const input = document.querySelector("input");
input.addEventListener("input", search);

function search() {
  const searchTerm = input.value.toLowerCase();
  const cards = document.querySelectorAll(".catalog-item");

  cards.forEach((card) => {
    const title = card.querySelector(".item-title").textContent.toLowerCase();
    const description = card
      .querySelector(".item-type")
      .textContent.toLowerCase();

    if (title.includes(searchTerm) || description.includes(searchTerm)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}


// валидация
document.getElementById('input-submit').addEventListener('click', function(event) {
  event.preventDefault();
   
  let name = document.getElementById('input-name').value;
  let email = document.getElementById('input-email').value;
  let subject = document.getElementById('input-subject').value;
  let message = document.getElementById('input-message').value;
   
  if (name === '' || email === '' || subject === '' || message === '') {
     alert('Все поля должны быть заполнены!');
  } else if (!validateEmail(email)) {
     alert('Неправильный формат Email!');
  } else {
     alert('Заявка успешно отправлена!');
  }
 });
 
 function validateEmail(email) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
 }