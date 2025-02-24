money = 10;
setInterval(() => {
    document.getElementById("moneyText").textContent = `${money}`;
},10);

function addBox() {
    if (money < 10) return;
    money -= 10;
    const creationButtonStuff = document.getElementById('addBtn');
    creationButtonStuff.className = 'fadeOut';
    setTimeout(() => {
        creationButtonStuff.remove();
        const div = document.createElement('div');
        let total = document.getElementById('boxes').childElementCount;
        div.id = `box${total-1}`;
        div.className = 'box fadeIn';
        let colours = [Math.floor(Math.random() * 128), Math.floor(Math.random() * 128), Math.floor(Math.random() * 128)]
        let randColour = `rgb(${colours[0]}, ${colours[1]}, ${colours[2]})`
        let darkerColour = `rgb(${colours[0] + 40}, ${colours[1] + 40}, ${colours[2] + 40})`
        div.style.backgroundColor = randColour;
        div.setAttribute('power', 1);
        div.setAttribute('speed', 1);
        div.setAttribute('auto', false);
        const loadingBar = document.createElement('div');
        loadingBar.className = 'loadingBar';
        loadingBar.style.backgroundColor = darkerColour;
        loadingBar.addEventListener('animationend', () => {
            money += parseInt(div.getAttribute('power'));
            loadingBar.style.animation = 'none';
            if (div.getAttribute('auto') == 'true') {
                loadingBar.offsetHeight;
                loadingBar.style.animation = `load ${2/(parseFloat(div.getAttribute('speed')))}s linear forwards`;
            }
        });
        const loadingBarBackground = document.createElement('div');
        loadingBarBackground.className = 'loadingBarBkg';
        loadingBarBackground.style.backgroundColor = darkerColour;
        loadingBarBackground.style.opacity = '0.5';
        loadingBar.appendChild(loadingBarBackground);
        div.appendChild(loadingBar);
        div.addEventListener('click', () => {
            if (div.getAttribute('auto') == 'true') return;
            loadingBar.offsetHeight;
            loadingBar.style.animation = `load ${2/(parseFloat(div.getAttribute('speed')))}s linear forwards`;
        });
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'buttonContainer';
        const strengthBtn = document.createElement('button');
        strengthBtn.textContent = '💪';
        strengthBtn.className = 'upgradeBtn';
        strengthBtn.onclick = () => {
            if (money >= 10) {
                money -= 10;
                div.setAttribute('power', parseInt(div.getAttribute('power')) + 1);
                strengthCount.textContent = parseInt(strengthCount.textContent) + 1;
            }
        };
        buttonContainer.appendChild(strengthBtn);
        const strengthCount = document.createElement('div');
        strengthCount.className = 'upgradeCount';
        strengthCount.textContent = '0';
        strengthBtn.appendChild(strengthCount);
        const speedBtn = document.createElement('button');
        speedBtn.textContent = '⚡';
        speedBtn.className = 'upgradeBtn';
        speedBtn.onclick = () => {
            if (money >= 10) {
                money -= 10;
                div.setAttribute('speed', (parseFloat(div.getAttribute('speed')) + 0.5));
                speedCount.textContent = parseInt(speedCount.textContent) + 1;
            }
        };
        buttonContainer.appendChild(speedBtn);
        const speedCount = document.createElement('div');
        speedCount.className = 'upgradeCount';
        speedCount.textContent = '0';
        speedBtn.appendChild(speedCount);
        const autoBtn = document.createElement('button');
        autoBtn.textContent = '🤖';
        autoBtn.className = 'upgradeBtn';
        autoBtn.onclick = () => {
            if (money >= 50) {
                money -= 50;
                div.setAttribute('auto', true);
                autoBtn.textContent = '✅';
                loadingBar.offsetHeight;
                loadingBar.style.animation = `load ${2/(parseFloat(div.getAttribute('speed')))}s linear forwards`;
            }
        };
        buttonContainer.appendChild(autoBtn);
        div.appendChild(buttonContainer);
        document.getElementById('boxes').appendChild(div);
        const addBtn = document.createElement('button');
        addBtn.id = 'addBtn';
        addBtn.textContent = '+';
        addBtn.onclick = addBox;
        document.getElementById('boxes').appendChild(addBtn);
    }, 200);
}

let isDown = false;
let startY;
let scrollTop;
let velocity = 0;
let lastY;
let momentumInterval;

const boxes = document.getElementById('boxes');

boxes.addEventListener('mousedown', (e) => {
    isDown = true;
    startY = e.pageY - boxes.offsetTop;
    scrollTop = boxes.scrollTop;
    lastY = e.pageY;
    clearInterval(momentumInterval);
});

boxes.addEventListener('mouseleave', () => {
    isDown = false;
    applyMomentum();
});

boxes.addEventListener('mouseup', () => {
    isDown = false;
    applyMomentum();
});

boxes.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const y = e.pageY - boxes.offsetTop;
    const walk = (y - startY);
    boxes.scrollTop = scrollTop - walk;
    velocity = e.pageY - lastY;
    lastY = e.pageY;
});

function applyMomentum() {
    momentumInterval = setInterval(() => {
        if (Math.abs(velocity) < 1) {
            clearInterval(momentumInterval);
            return;
        }
        boxes.scrollTop -= velocity;
        velocity *= 0.95; // Damping factor
    }, 16);
}