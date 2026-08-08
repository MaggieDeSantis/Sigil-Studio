//main canvas
const canvas = document.getElementById("sigilCanvas");
const ctx = canvas.getContext("2d");

const centerX = 250;
const centerY = 250;
const radius = 100;
const numberOfPoints= 12;

//letters for points
const alphabet = [
    "A", "B", "C", "D", "E", "F",
    "G", "H", "I", "J", "K", "L",
    "M", "N", "O", "P", "Q", "R",
    "S", "T", "U", "V", "W", "X",
    "Y", "Z"
]

//main selections
const button = document.getElementById("generateBtn");
const colorPicker = document.getElementById("colorPicker");
const randomBtn = document.getElementById("randomBtn");
const downloadButton = document.getElementById("downloadBtn");

//main settings 
const removeDuplicateCheckbox = document.getElementById("removeDuplicates");
const pointCountSelect = document.getElementById("pointCount");
const closeShapeCheckbox = document.getElementById("closeShape");
const showCircleCheckbox = document.getElementById("showCircle");

//right side main 
const historyList = document.getElementById("historyList");

//Generate sigil button
button.addEventListener("click", function () {

    const word = document.getElementById("wordInput").value;
    const selectedColor = colorPicker.value;
    const removeDuplicates = removeDuplicateCheckbox.checked;
    const selectedPointCount = Number(pointCountSelect.value);
    const closeShape = closeShapeCheckbox.checked;
    const showCircle = showCircleCheckbox.checked;

    drawCircle(word, selectedColor, removeDuplicates, selectedPointCount, closeShape, showCircle);

    addToHistory(word, selectedColor, removeDuplicates, selectedPointCount, closeShape, showCircle);
});

//Draw circle codes
function drawCircle(word, selectedColor, removeDuplicates, selectedPointCount, closeShape, showCircle){

    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    if (showCircle) {
        drawOuterCircle();
    }

    drawCenterPoint();

    const generatedPoints = generatePoints(selectedPointCount);

    drawSigil(generatedPoints, word, selectedColor, removeDuplicates, selectedPointCount, closeShape);
    }

function drawOuterCircle() {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.lineWidth = 4;
    ctx.stroke();
}

function drawCenterPoint() {
    ctx.beginPath();
    ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
    ctx.fill();
}

function generatePoints(selectedPointCount) {
    const generatedPoints = [];

        for (let i = 0; i < selectedPointCount; i++) {
        const angle = (Math.PI * 2 / selectedPointCount) * i - Math.PI / 2;
        const pointX = centerX + Math.cos(angle) * radius;
        const pointY = centerY + Math.sin(angle) * radius;

        generatedPoints.push([pointX, pointY]);
        ctx.beginPath();
        ctx.arc(pointX, pointY, 5, 0, Math.PI * 2);
        ctx.fill();
        }
    return generatedPoints;

}
//Draw sigil itself code
function drawSigil(generatedPoints, word, selectedColor, removeDuplicates, selectedPointCount, closeShape) {
    const sigilPath = [];

    for (const letter of word) {
        const upperLetter = letter.toUpperCase();        
        const letterPosition = alphabet.indexOf(upperLetter);

        if (letterPosition === -1) {
            continue;
        }

        const pointIndex = letterPosition % selectedPointCount;

        if (removeDuplicates) {
            if(!sigilPath.includes(pointIndex)) {
                sigilPath.push(pointIndex);
            }
        } else {
            sigilPath.push(pointIndex);
        }
    }

    if (sigilPath.length < 2) {
        return;
    }


    ctx.beginPath();

    ctx.strokeStyle = selectedColor;
    
    ctx.moveTo(
        generatedPoints[sigilPath[0]][0],
        generatedPoints[sigilPath[0]][1]
    );

    for (let i = 1; i < sigilPath.length; i++){
        const pointIndex = sigilPath[i];

        ctx.lineTo(
            generatedPoints[pointIndex][0],
            generatedPoints[pointIndex][1]
        );

    }

    if (closeShape) {
        ctx.lineTo(
            generatedPoints[sigilPath[0]][0],
            generatedPoints[sigilPath[0]][1]
        );
    }

    ctx.moveTo(centerX, centerY);

    ctx.lineTo(
        generatedPoints[sigilPath[0]][0],
        generatedPoints[sigilPath[0]][1]
    );

    ctx.lineWidth = 3;
    ctx.stroke();
}

randomBtn.addEventListener("click", function () {
    generateRandomWord();
});

//generates a random word or phrase
function generateRandomWord() {

    const randomWords = [
        "ROMANCE", "HEALTH", "ABUNDANCE", "JOY", "LOVE",
        "CHAKRA", "POWER", "SHADOW", "STORMS", "CROWS",
    ];

    const randomIndex = Math.floor(Math.random() * randomWords.length);
    const randomWord = randomWords[randomIndex];

    document.getElementById("wordInput").value = randomWord;

    const selectedColor = colorPicker.value;
    const removeDuplicates = removeDuplicateCheckbox.checked;
    const selectedPointCount = Number(pointCountSelect.value);
    const closeShape = closeShapeCheckbox.checked;
    const showCircle = showCircleCheckbox.checked;

    drawCircle(randomWord, selectedColor, removeDuplicates, selectedPointCount, closeShape, showCircle);

    addToHistory(randomWord, selectedColor, removeDuplicates, selectedPointCount, closeShape, showCircle);
}

downloadButton.addEventListener("click", function (){
    downloadSigil();
});

//option to download sigil 
function downloadSigil() {

    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
   
    link.href = image;
    link.download = "sigil.png";
    link.click();

}

//right side

//add to history
function addToHistory(word, selectedColor, removeDuplicates, selectedPointCount, closeShape, showCircle) {
    const  historyItems = historyList.querySelectorAll("li");
    
    for ( const item of historyItems) {
        if (
            item.dataset.word === word &&
            item.dataset.color === selectedColor &&
            item.dataset.removeDuplicates === String(removeDuplicates) &&
            item.dataset.pointCount === String(selectedPointCount) &&
            item.dataset.closeShape === String(closeShape) &&
            item.dataset.showCircle === String(showCircle)
        ) {
            item.remove()
        }
    }

    const listItem = document.createElement("li");

    listItem.dataset.word = word;
    listItem.dataset.color = selectedColor;
    listItem.dataset.removeDuplicates = removeDuplicates;
    listItem.dataset.pointCount = selectedPointCount;
    listItem.dataset.closeShape = closeShape; 
    listItem.dataset.showCircle = showCircle;

    listItem.textContent = word;

    listItem.addEventListener("click", function () {
        document.getElementById("wordInput").value = word;
        colorPicker.value = selectedColor;
        removeDuplicateCheckbox.checked = removeDuplicates;
        pointCountSelect.value = selectedPointCount;
        closeShapeCheckbox.checked = closeShape;
        showCircleCheckbox.checked = showCircle;

        drawCircle(word, selectedColor, removeDuplicates, selectedPointCount, closeShape, showCircle)

    });

    historyList.prepend(listItem);

    if (historyList.children.length > 10) {
        historyList.removeChild(historyList.lastElementChild);
    }

}