const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const cat = document.getElementById('cat');
const catContainer = document.getElementById('catContainer');
const question = document.querySelector('.question');
const questionPage = document.getElementById('questionPage');
const successPage = document.getElementById('successPage');

const noTexts = [
    "НЕТ",
    "ТЫ СЕРЬЕЗНО?",
    "РЕАЛЬНО??",
    "УВЕРЕНА В ЭТОМ?",
    "Я ОЧЕНЬ расстроен...",
    "Ладно, хорошо, ОСТАНОВИСЬ...",
    "Мне действительно будет грустно...",
    "Ульяна, пожалуйста...",
    "Я сейчас буду плакать...",
    "..."
];
let noClickCount = 0;

const initialYesWidth = 78;
const initialYesHeight = 54;
const initialNoWidth = 120;
const initialNoHeight = 60;
const initialCatWidth = 250;

const yesWidthStep = 80;
const yesHeightStep = 70;
const yesFontStep = 0.8;

const noWidthStep = 12;
const noHeightStep = 6;
const catWidthStep = 28;

let currentYesWidth = initialYesWidth;
let currentYesHeight = initialYesHeight;
let currentYesFont = 2.4;
let currentNoWidth = initialNoWidth;
let currentNoHeight = initialNoHeight;
let currentCatWidth = initialCatWidth;

const maxYesWidth = window.innerWidth + 40;
const maxYesHeight = window.innerHeight + 100;

function updateSizes() {
    yesBtn.style.width = currentYesWidth + 'px';
    yesBtn.style.height = currentYesHeight + 'px';
    yesBtn.style.fontSize = currentYesFont + 'rem';
    yesBtn.style.lineHeight = currentYesHeight + 'px';
    
    noBtn.style.width = 'auto';
    noBtn.style.height = 'auto';
    noBtn.style.fontSize = Math.max(0.6, currentNoWidth / 50) + 'rem';
    noBtn.style.padding = '5px 10px';
    
    cat.style.width = currentCatWidth + 'px';
    
}

noBtn.addEventListener('click', () => {
    noClickCount++;
    
    if (noClickCount < noTexts.length) {
        noBtn.textContent = noTexts[noClickCount];
    }
    
    currentYesWidth = Math.min(currentYesWidth + yesWidthStep, maxYesWidth);
    currentYesHeight = Math.min(currentYesHeight + yesHeightStep, maxYesHeight);
    currentYesFont = Math.min(currentYesFont + yesFontStep, 8);
    
    currentNoWidth = Math.max(0, currentNoWidth - noWidthStep);
    currentNoHeight = Math.max(0, currentNoHeight - noHeightStep);
    
    currentCatWidth = Math.max(0, currentCatWidth - catWidthStep);
    
    updateSizes();
});

yesBtn.addEventListener('click', () => {
    questionPage.style.opacity = '0';
    setTimeout(() => {
        questionPage.style.display = 'none';
        successPage.style.display = 'flex';
        createConfetti();
    }, 500);
});

function createConfetti() {
    const colors = ['#ff6b6b', '#f9ca24', '#6c5ce7', '#a29bfe', '#fd79a8', '#00b894'];
    
    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = (Math.random() * 10 + 5) + 'px';
            confetti.style.height = (Math.random() * 10 + 5) + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-20px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            confetti.style.zIndex = '9999';
            confetti.style.pointerEvents = 'none';
            
            document.body.appendChild(confetti);
            
            const duration = Math.random() * 3000 + 2000;
            const rotation = Math.random() * 720 - 360;
            confetti.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight + 50}px) rotate(${rotation}deg)`, opacity: 0 }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => confetti.remove();
        }, i * 50);
    }
}

updateSizes();