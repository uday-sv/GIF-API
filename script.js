// Note: Please do not use this API key

const apiKey = 'dHrnvbAOhaoXExLhPXCsepXQSlL2FVjG';
const gifUrl = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=fun&rating=g`;

const letterPatterns = {
    A: [[0,1,1,1,0],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1]],
    B: [[1,1,1,1,0],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,0,1],[1,1,1,1,0]],
    C: [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,0],[1,0,0,0,1],[0,1,1,1,0]],
    D: [[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0]],
    E: [[1,1,1,1,1],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,1,1,1,1]],
    F: [[1,1,1,1,1],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0]],
    G: [[0,1,1,1,0],[1,0,0,0,1],[1,0,1,1,1],[1,0,0,0,1],[0,1,1,1,0]],
    H: [[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1]],
    I: [[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[1,1,1,1,1]],
    J: [[0,0,0,0,1],[0,0,0,0,1],[0,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
    K: [[1,0,0,0,1],[1,0,0,1,0],[1,1,1,0,0],[1,0,0,1,0],[1,0,0,0,1]],
    L: [[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],
    M: [[1,0,0,0,1],[1,1,0,1,1],[1,0,1,0,1],[1,0,0,0,1],[1,0,0,0,1]],
    N: [[1,0,0,0,1],[1,1,0,0,1],[1,0,1,0,1],[1,0,0,1,1],[1,0,0,0,1]],
    O: [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
    P: [[1,1,1,1,0],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0]],
    Q: [[0,1,1,1,0],[1,0,0,0,1],[1,0,1,0,1],[1,0,0,1,0],[0,1,1,0,1]],
    R: [[1,1,1,1,0],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,1,0],[1,0,0,0,1]],
    S: [[0,1,1,1,0],[1,0,0,0,0],[0,1,1,1,0],[0,0,0,0,1],[0,1,1,1,0]],
    T: [[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
    U: [[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
    V: [[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0]],
    W: [[1,0,0,0,1],[1,0,0,0,1],[1,0,1,0,1],[1,1,0,1,1],[1,0,0,0,1]],
    X: [[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,1,0,1,0],[1,0,0,0,1]],
    Y: [[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
    Z: [[1,1,1,1,1],[0,0,0,1,0],[0,0,1,0,0],[0,1,0,0,0],[1,1,1,1,1]]
};

function getRandomColor() {
    const pastelColors = ['#FFB3BA', '#BAFFC9', '#BAE1FF', '#FFFFBA', '#FFDFBA'];
    return pastelColors[Math.floor(Math.random() * pastelColors.length)];
}

function setRandomBackgroundColor() {
    document.body.style.backgroundColor = getRandomColor();
}

async function getRandomGif() {
    const response = await fetch(gifUrl);
    const data = await response.json();
    return data.data.images.fixed_height_small.url;
}

function isLetter(str) {
    return /^[A-Za-z]+$/.test(str);
}

async function createLetters() {
    const wordInput = document.getElementById('wordInput');
    const word = wordInput.value.toUpperCase();

    if (!isLetter(word)) {
        alert('Please enter only letters.');
        wordInput.value = '';
        return;
    }

    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';
    setRandomBackgroundColor();

    for (let letter of word) {
        if (letter in letterPatterns) {
            const letterDiv = document.createElement('div');
            letterDiv.className = 'letter';
            const pattern = letterPatterns[letter];
            const gifUrl = await getRandomGif();

            for (let row of pattern) {
                const rowDiv = document.createElement('div');
                rowDiv.style.display = 'flex';
                for (let cell of row) {
                    const cellDiv = document.createElement('div');
                    cellDiv.style.width = '20px';
                    cellDiv.style.height = '20px';
                    if (cell === 1) {
                        const img = document.createElement('img');
                        img.src = gifUrl;
                        img.style.width = '100%';
                        img.style.height = '100%';
                        img.style.objectFit = 'cover';
                        cellDiv.appendChild(img);
                    }
                    rowDiv.appendChild(cellDiv);
                }
                letterDiv.appendChild(rowDiv);
            }
            outputDiv.appendChild(letterDiv);
        }
    }
}

setRandomBackgroundColor();
