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


button.addEventListener("click", function () {
    const word = document.getElementById("wordInput").value;
    
    console.log(word);

    drawCircle(word);
});

function drawCircle(word){

    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    drawOuterCircle();
    drawCenterPoint();

    const generatedPoints = generatePoints();

    drawSigil(generatedPoints, word);
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

function drawSigil(generatedPoints, word) {
    const sigilPath = [];

    for (const letter of word) {
        
        const upperLetter = letter.toUpperCase();
        
        const letterPosition = alphabet.indexOf(upperLetter);
        
        sigilPath.push(letterPosition);
    }

    ctx.beginPath();
    
    ctx.moveTo(
        generatedPoints[sigilPath[0]][0],
        generatedPoints[sigilPath[0]][1]
    );

    for (let i = 1; i <sigilPath.length; i++){
        const pointIndex = sigilPath[i];

        ctx.lineTo(
            generatedPoints[pointIndex][0],
            generatedPoints[pointIndex][1]
        );

    }

    ctx.lineWidth = 3;
    ctx.stroke();
}