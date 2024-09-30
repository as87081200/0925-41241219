const themeBtn = document.getElementById('themeBtn');
const gameBoard = document.getElementById('gameBoard');
const restartBtn = document.getElementById('restartBtn');
const themeLabel = document.getElementById('themeLabel');

let theme = 1;
const totalPairs = 8;
let flippedCards = [];
let matchedPairs = 0;

// 設置兩個主題的圖像
const imagesTheme1 = [
    'images/theme1/img1.jpg', 'images/theme1/img2.jpg', 'images/theme1/img3.jpg', 'images/theme1/img4.jpg',
    'images/theme1/img5.jpg', 'images/theme1/img6.jpg', 'images/theme1/img7.jpg', 'images/theme1/img8.jpg'
];

const imagesTheme2 = [
    'images/theme2/img1.jpg', 'images/theme2/img2.jpg', 'images/theme2/img3.jpg', 'images/theme2/img4.jpg',
    'images/theme2/img5.jpg', 'images/theme2/img6.jpg', 'images/theme2/img7.jpg', 'images/theme2/img8.jpg'
];

let currentImages = [...imagesTheme1, ...imagesTheme1];  // 每張圖片放兩次

// 洗牌函數
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCard(image) {
    const card = document.createElement('div');
    card.classList.add('card');
    
    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');
    
    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    
    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardBack.style.backgroundImage = `url(${image})`;
    
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    
    card.addEventListener('click', () => flipCard(card));
    
    return card;
}

function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        flippedCards.push(card);
        
        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const img1 = card1.querySelector('.card-back').style.backgroundImage;
    const img2 = card2.querySelector('.card-back').style.backgroundImage;
    
    if (img1 === img2) {
        matchedPairs++;
        if (matchedPairs === totalPairs) {
            alert('恭喜，你贏了！');
            restartBtn.classList.remove('hidden');  // 顯示再玩一次按鈕
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }
    flippedCards = [];
}

// 初始化遊戲板
function initGame() {
    gameBoard.innerHTML = '';  // 清除現有卡牌
    restartBtn.classList.add('hidden');  // 隱藏再玩一次按鈕
    currentImages = [...(theme === 1 ? imagesTheme1 : imagesTheme2), ...(theme === 1 ? imagesTheme1 : imagesTheme2)];
    shuffle(currentImages);
    currentImages.forEach(image => {
        const card = createCard(image);
        gameBoard.appendChild(card);
    });
    flippedCards = [];
    matchedPairs = 0;
    updateThemeLabel();  // 更新主題標籤
}

// 切換主題
themeBtn.addEventListener('click', () => {
    theme = theme === 1 ? 2 : 1;
    document.body.classList.toggle('theme2');
    initGame();  // 重新初始化遊戲，使用新的主題
});

// 再玩一次按鈕事件
restartBtn.addEventListener('click', () => {
    initGame();
});

// 更新主題標籤
function updateThemeLabel() {
    if (theme === 1) {
        themeLabel.textContent = '主題：卡通';
    } else {
        themeLabel.textContent = '主題：食物';
    }
}

// 初始化第一次遊戲
initGame();
