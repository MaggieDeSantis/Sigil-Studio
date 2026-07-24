const canvas = document.getElementById("sigilCanvas");
const ctx = canvas.getContext("2d");

const centerX = 250;
const centerY = 250;

const button = document.getElementById("generateBtn");

button.addEventListener("click", drawCircle);

function drawCircle(){

    ctx.clearRect(0,0,canvas.width,canvas.height);
//create circle
    ctx.beginPath();
    ctx.arc(250, 250, 100, 0, Math.PI * 2);
    ctx.lineWidth = 4;
    ctx.stroke();

//top point
    ctx.beginPath(),
    ctx.arc(centerX, centerY - 100, 5, 0, Math.PI * 2);
    ctx.fill();

//center
    ctx.beginPath();
    ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
    ctx.fill();

//bottom point
    ctx.beginPath();
    ctx.arc(centerX, centerY + 100, 5, 0, Math.PI * 2);
    ctx.fill();

// left point 
    ctx.beginPath();
    ctx.arc(centerX - 100, centerY, 5, 0, Math.PI * 2);
    ctx.fill();

//right point 

    ctx.beginPath();
    ctx.arc(centerX + 100, centerY, 5, 0, Math.PI * 2);
    ctx.fill();

}

