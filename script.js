const canvas = document.getElementById("sigilCanvas");
const ctx = canvas.getContext("2d");

const centerX = 250;
const centerY = 250;

const button = document.getElementById("generateBtn");

const points = [
    [centerX, centerY - 100], // top 
    [centerX + 100, centerY], // right
    [centerX, centerY + 100], // bottom
    [centerX - 100, centerY], // left
]

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

//other points
    for (const point of points) {
        ctx.beginPath(); 
        ctx.arc(point[0], point[1], 5, 0, Math.PI * 2);
        ctx.fill();

    }
}

