const canvas = document.getElementById("sigilCanvas");
const ctx = canvas.getContext("2d");

const button = document.getElementById("generateBtn");

button.addEventListener("click", drawLine);

function drawLine(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.beginPath();

    ctx.moveTo(100,100);

    ctx.lineTo(400,400);

    ctx.lineWidth = 4;

    ctx.stroke();

}