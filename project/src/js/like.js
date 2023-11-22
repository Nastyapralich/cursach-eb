//избранное
const likeC = document.querySelector('.like-container');

function showLikesFromLocalStorage() { 

likeC.innerHTML = '';
const likes = localStorage.getItem('likes');
if(likes){
    const likeItems = JSON.parse(likes);

    likeItems.forEach(element => {
        const likeItem = document.createElement('div');
        likeItem.className = 'like-item';
        likeItem.id = element.id;


        likeItem.innerHTML = `
        <div class="like-title">${element.title}</div>
        <div class="like-type">${element.type}</div>
        <span class="like-price">${element.price}</span>
        `
        // const likeTitle = document.createElement('span');
        // likeTitle.className = 'like-title';
        // likeTitle.innerHTML = `${element.title}`;
        
        // likeItem.append(likeTitle);
       
        likeC.append(likeItem);
       
    });
}
 }

 showLikesFromLocalStorage();