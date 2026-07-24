const canvas = document.getElementById("sigilCanvas");
const ctx = canvas.getContext("2d");

const button = document.getElementById("generateBtn");

button.addEventListener("click", drawCircle);

function drawCircle(){

    ctx.clearRect(0,0,canvas.width,canvas.height);
//create circle
    ctx.beginPath();
    ctx.arc(250, 250, 100, 0, Math.PI * 2);
    ctx.lineWidth = 4;

    ctx.stroke();

//center
    ctx.beginPath();
    ctx.arc(250, 250, 3, 0, Math.PI * 2);
    ctx.fill();
}