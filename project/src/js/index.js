fetch("https://654f905b358230d8f0cd7d1d.mockapi.io/gamestore")
.then((resonse)=>{return resonse.json()})
.then((data) => {
    data.forEach(element => createItem(element.img, element.title, element.type, element.price)
    )})


const catalogList = document.querySelector('.catalog-list')
function createItem(img, title, type, price){
const catalogItem = document.createElement('div');
catalogItem.className = 'catalog-item'
catalogItem.innerHTML = `
<div class="catalog-item-img">
<img src="${img}" alt="#">
</div>
<div class="catalog-item-text">
<span class="item-title">${title}</span>
<span class="item-type">${type}</span>
<span class="item-price">${price}$</span>
</div>
<button class="addToCart">Add to Cart</button>`

catalogList.append(catalogItem);
}