const cardImages = [
    'img1.png', 'img2.png', 'img3.png', 'img4.png',
    'img5.png', 'img6.png', 'img7.png', 'img8.png'
];

let cardsArray = [...cardImages, ...cardImages];
let firstCard = null;
let secondCard = null;
let lockboard = false;

function shuffle(array){
    array.sort(() => Math.random() - 0.5)
}

function createBoard(){
    const memoryGame = document.getElementById("memoryGame");
    memoryGame.innerHTML = '';
    shuffle(cardsArray);
    cardsArray.forEach(image => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;
        card.innerHTML = `
        <div class="front"></div>
        div class="back" style="backgroud-image: url(${image});"></div>
        `;
        card.addEventListener("click", flipCard);
            memoryGame.appendChild(card);
        
    })
}

function flipCard(){
if(lockboard) return;
if(this === firstCard) return;

this.classList.add("flipped");
if(!firstCard){
    firstCard = this;
    return;
}

secondCard = this;
checkForMatch();
}

function checkForMatch(){
    const isMatch = firstCard.dataset.image === secondCard.dataset.image;
    isMatch? disableCards() : unflipCards();
}

function disableCards(){
    firstCard.removeEventListener('click',flipCard);
    secondCard.removeEventListener('click',flipCard);
    resetBoard();
}

function unflipCards(){
lockboard = true;
setTimeout(()=>{
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
}, 1500)
}

function resetBoard(){
    [firstCard,secondCard,lockboard] = [null, null, false];
}

document.getElementById("newGame").addEventListener("click",createBoard);
createBoard();