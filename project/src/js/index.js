// Функция, добавляющая объект в localStorage
function addToCartHandler(event) {
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

    const existingCartItems = JSON.parse(localStorage.getItem("cart")) || [];

    existingCartItems.push(itemData);

    localStorage.setItem("cart", JSON.stringify(existingCartItems));
    alert("Item added to cart!");
    // showCartFromLocalStorage();
  }
}

const addToCartButtons = document.querySelectorAll(".addToCart");

addToCartButtons.forEach((button) => {
  button.addEventListener("click", addToCartHandler);
  button.addEventListener("click", showCartFromLocalStorage)
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

button.addEventListener("click", () => {
  cartC.classList.remove("active");
});


function removefromLS (deleteItem, cartItem){
  deleteItem.addEventListener('click', function (){
    deleteItem.parentElement.remove(cartItem)
      console.log(deleteItem.closest('.item-type'));
      let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
      cart.forEach((card, index) => {
        if(deleteItem.parentElement.type == card.type){
          cart.splice(index, index + 1);
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      })
      localStorage.setItem("cart", JSON.stringify(cart));
      showCartFromLocalStorage();
  });
}


document.addEventListener('DOMContentLoaded', function () {
  // Получаем все элементы списка фильтра
  const filterItems = document.querySelectorAll('.filter-list-item');

  // Получаем все элементы каталога
  const catalogItems = document.querySelectorAll('.catalog-item');

  // Добавляем обработчик события клика к каждому элементу фильтра
  filterItems.forEach(filterItem => {
    filterItem.addEventListener('click', function () {
      // Убираем класс 'active' у всех элементов фильтра
      filterItems.forEach(item => {
        item.classList.remove('active');
      });

      // Добавляем класс 'active' только к выбранному элементу фильтра
      filterItem.classList.add('active');

      // Получаем тип продукта, соответствующий выбранному элементу фильтра
      const filterType = filterItem.textContent.toLowerCase();

      // Перебираем все элементы каталога и скрываем/показываем их в зависимости от типа
      catalogItems.forEach(catalogItem => {
        const itemType = catalogItem.querySelector('.item-type').textContent.toLowerCase();

        if (filterType === 'all' || filterType === itemType) {
          catalogItem.style.display = 'block';
        } else {
          catalogItem.style.display = 'none';
        }
      });
    });
  });
});
