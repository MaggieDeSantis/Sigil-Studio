const canvas = document.getElementById("sigilCanvas");
const ctx = canvas.getContext("2d");

const centerX = 250;
const centerY = 250;
const radius = 100;
const numberOfPoints= 12;

const alphabet = [
    "A", "B", "C", "D", "E", "F",
    "G", "H", "I", "J", "K", "L",
    "M", "N", "O", "P", "Q", "R",
    "S", "T", "U", "V", "W", "X",
    "Y", "Z"
]

const button = document.getElementById("generateBtn");
const colorPicker = document.getElementById("colorPicker");
const randomBtn = document.getElementById("randomBtn");
const downloadButton = document.getElementById("downloadBtn");
const removeDuplicateCheckbox = document.getElementById("removeDuplicates");


button.addEventListener("click", function () {

    const word = document.getElementById("wordInput").value;
    const selectedColor = colorPicker.value;
    const removeDuplicates = removeDuplicateCheckbox.checked;

    drawCircle(word, selectedColor, removeDuplicates);
});

function drawCircle(word, selectedColor, removeDuplicates){

    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    drawOuterCircle();
    drawCenterPoint();

    const generatedPoints = generatePoints();

    drawSigil(generatedPoints, word, selectedColor, removeDuplicates);
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

function generatePoints() {
    const generatedPoints = [];

        for (let i = 0; i < numberOfPoints; i++) {
        const angle = (Math.PI * 2 / numberOfPoints) * i - Math.PI / 2;
        const pointX = centerX + Math.cos(angle) * radius;
        const pointY = centerY + Math.sin(angle) * radius;

        generatedPoints.push([pointX, pointY]);
        ctx.beginPath();
        ctx.arc(pointX, pointY, 5, 0, Math.PI * 2);
        ctx.fill();
        }
    return generatedPoints;

}

function drawSigil(generatedPoints, word, selectedColor, removeDuplicates) {
    const sigilPath = [];

    for (const letter of word) {
        const upperLetter = letter.toUpperCase();        
        const letterPosition = alphabet.indexOf(upperLetter);

        if (letterPosition === -1) {
            continue;
        }
        
        const pointIndex = letterPosition % numberOfPoints;

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

function generateRandomWord() {

    const randomWords = [
        "ROMANCE", "HEALTH", "ABUNDANCE", "JOY", "LOVE",
        "CHAKRA", "POWER", "SHADOW", "STORMS", "CROWS",
    ];

    const randomIndex = Math.floor(Math.random() * randomWords.length);
    const randomWord = randomWords[randomIndex];

    document.getElementById("wordInput").value = randomWord;

    const selectedColor = colorPicker.value;

    drawCircle(randomWord, selectedColor);

}

downloadButton.addEventListener("click", function (){
    downloadSigil();
});

function downloadSigil() {

    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
   
    link.href = image;
    link.download = "sigil.png";
    link.click();

}