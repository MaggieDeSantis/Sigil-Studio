const canvas = document.getElementById("sigilCanvas");
const ctx = canvas.getContext("2d");

const centerX = 250;
const centerY = 250;
const radius = 100;
const numberOfPoints= 12;

const button = document.getElementById("generateBtn");


button.addEventListener("click", drawCircle);

function drawCircle(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

//create circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 100, 0, Math.PI * 2);
    ctx.lineWidth = 4;
    ctx.stroke();

//center
    ctx.beginPath();
    ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
    ctx.fill();

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
    
        ctx.beginPath();

        ctx.moveTo(
            generatedPoints[0][0],
            generatedPoints[0][1]
        );

        ctx.lineTo(
            generatedPoints[3][0],
            generatedPoints[3][1]
        );

        ctx.lineWidth = 3;
        ctx.stroke();
}

