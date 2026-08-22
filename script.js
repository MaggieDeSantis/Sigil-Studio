//main canvas
const canvas = document.getElementById("sigilCanvas");
const ctx = canvas.getContext("2d");

const centerX = 175;
const centerY = 175;
const radius = 100;

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
const inspirationPrompt = document.getElementById("inspirationPrompt");
const downloadButton = document.getElementById("downloadBtn");
const clearButton = document.getElementById("clearBtn")
//main settings 
const removeDuplicateCheckbox = document.getElementById("removeDuplicates");
const removeVowelsCheckbox = document.getElementById("removeVowels");
const pointCountSelect = document.getElementById("pointCount");
const closeShapeCheckbox = document.getElementById("closeShape");
const showCircleCheckbox = document.getElementById("showCircle");
const circleColorPicker = document.getElementById("circleColorPicker");

//right side main 
const historyList = document.getElementById("historyList");
const favoritesList = document.getElementById("favoritesList");

//Generate sigil button
button.addEventListener("click", function () {

    const word = document.getElementById("wordInput").value;
    const selectedColor = colorPicker.value;
    const removeDuplicates = removeDuplicateCheckbox.checked;
    const removeVowels = removeVowelsCheckbox.checked;
    const selectedPointCount = Number(pointCountSelect.value);
    const closeShape = closeShapeCheckbox.checked;
    const showCircle = showCircleCheckbox.checked;
    const circleColor = circleColorPicker.value;

    drawCircle(word, selectedColor, removeDuplicates, removeVowels, selectedPointCount, closeShape, showCircle, circleColor);

    addToHistory(word, selectedColor, removeDuplicates, removeVowels, selectedPointCount, closeShape, showCircle, circleColor);
});

//Draw circle codes
function drawCircle(word, selectedColor, removeDuplicates, removeVowels, selectedPointCount, closeShape, showCircle, circleColor){

    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    if (showCircle) {
        ctx.strokeStyle = circleColor;
        drawOuterCircle();
    }

    const generatedPoints = generatePoints(selectedPointCount);

    drawSigil(generatedPoints, word, selectedColor, removeDuplicates, removeVowels, selectedPointCount, closeShape, showCircle, circleColor);
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
        }
    return generatedPoints;

}
//Draw sigil itself code
function drawSigil(generatedPoints, word, selectedColor, removeDuplicates, removeVowels, selectedPointCount, closeShape, showCircle, circleColor) {
    const sigilPath = [];

    for (const letter of word) {
        const upperLetter = letter.toUpperCase();
        
        if (removeVowels && "AEIOU".includes(upperLetter)) {
            continue;
        }         

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

    animateSigil(generatedPoints, sigilPath, selectedColor, closeShape);
}

function animateSigil(generatedPoints, sigilPath, selectedColor, closeShape) {
    let currentIndex = 1;

    ctx.beginPath();
    ctx.strokeStyle = selectedColor;

    ctx.moveTo(
        generatedPoints[sigilPath[0]][0],
        generatedPoints[sigilPath[0]][1]
    );

    function drawNextLine() {
        if (currentIndex >= sigilPath.length) {

            if (closeShape) {
                currentIndex = sigilPath.length;

                const startPoint = generatedPoints[sigilPath[sigilPath.length - 1]];
                const endPoint = generatedPoints[sigilPath[0]];

                let progress = 0;

                function drawClosingLine() {

                    progress += 0.03;

                    const currentX = startPoint[0] + (endPoint[0] - startPoint[0]) * progress;
                    const currentY = startPoint[1] + (endPoint[1] - startPoint[1]) * progress;

                    ctx.beginPath();
                    ctx.moveTo(startPoint[0], startPoint[1]);
                    ctx.lineTo(currentX, currentY);
                    ctx.stroke();

                    if (progress < 1) {
                        requestAnimationFrame(drawClosingLine);
                    }
                  
                }
                 drawClosingLine();
            }

            return;
        }

        const pointIndex = sigilPath[currentIndex];
        
        const startPoint = generatedPoints[sigilPath[currentIndex - 1]];
        const endPoint = generatedPoints[pointIndex];

        let progress = 0;

        function drawLine() {
            
            progress += 0.03;

            const currentX = startPoint[0] + (endPoint[0] - startPoint[0]) * progress;
            const currentY = startPoint[1] + (endPoint[1] - startPoint[1]) * progress;

            ctx.beginPath();

            ctx.moveTo(
                startPoint[0],
                startPoint[1]
            );

            ctx.lineTo(currentX, currentY);
            ctx.stroke();

            if (progress < 1) {
                requestAnimationFrame(drawLine);
            } else {
                currentIndex++;
                drawNextLine();
            }
        }
        drawLine();
    }

    drawNextLine();
}


clearButton.addEventListener("click", function(){

    ctx.clearRect(0,0, canvas.width, canvas.height);
    document.getElementById("wordInput").value = "";
})


//generates a random inspiration prompt
const inspirationPrompts = [
    "What would you like to welcome?",
    "What would you like to strengthen?",
    "What would you like to grow?",
    "What deserves more of your attention?",
    "What would you like to protect?",
    "What would you like to make easier?",
    "What would you like to carry forward?",
    "What would you like to create?",
    "What quality would help you today?",
    "What would you like to change?",
    "What would you like to preserve?",
    "What word feels important right now?"
];
let lastPromptIndex = -1;

randomBtn.addEventListener("click", function () {
    let randomIndex;
    
    do {
        randomIndex = Math.floor(
            Math.random() * inspirationPrompts.length
        );
    } while (randomIndex === lastPromptIndex);

    lastPromptIndex = randomIndex;

    inspirationPrompt.textContent = inspirationPrompts[randomIndex];
});
downloadButton.addEventListener("click", function (){
    downloadSigil();
});

//option to download sigil 
function downloadSigil() {

    const image = canvas.toDataURL("image/png");
    const word = document.getElementById("wordInput").value;
    const fileName = word ? word.replaceAll(" ", "-") : "sigil";
    const link = document.createElement("a");
   
    link.href = image;
    link.download = word ? fileName + "-sigil.png" : "sigil.png";
    link.click();

}

//right side

//add to history
function addToHistory(word, selectedColor, removeDuplicates, removeVowels, selectedPointCount, closeShape, showCircle, circleColor) {
    const  historyItems = historyList.querySelectorAll("li");
    
    for ( const item of historyItems) {
        if (
            item.dataset.word === word &&
            item.dataset.color === selectedColor &&
            item.dataset.removeDuplicates === String(removeDuplicates) &&
            item.dataset.removeVowels === String (removeVowels) &&
            item.dataset.pointCount === String(selectedPointCount) &&
            item.dataset.closeShape === String(closeShape) &&
            item.dataset.showCircle === String(showCircle) &&
            item.dataset.circleColor === String(circleColor)
        ) {
            item.remove();
        }
    }

    const listItem = document.createElement("li");

    listItem.dataset.word = word;
    listItem.dataset.color = selectedColor;
    listItem.dataset.removeDuplicates = removeDuplicates;
    listItem.dataset.removeVowels = removeVowels; 
    listItem.dataset.pointCount = selectedPointCount;
    listItem.dataset.closeShape = closeShape; 
    listItem.dataset.showCircle = showCircle;
    listItem.dataset.circleColor = circleColor;

    listItem.textContent = word;
//favorite button 
    const favoriteButton  = document.createElement("button");
    
    favoriteButton.textContent = "☆";
    favoriteButton.classList.add("favorite-button");

    listItem.appendChild(favoriteButton);
    favoriteButton.addEventListener("click", function(event) {
        event.stopPropagation();
        addToFavorites (word, selectedColor, removeDuplicates, removeVowels, selectedPointCount, closeShape, showCircle, circleColor)
    });

    listItem.addEventListener("click", function () {
        document.getElementById("wordInput").value = word;
        colorPicker.value = selectedColor;
        removeDuplicateCheckbox.checked = removeDuplicates;
        removeVowelsCheckbox.checked = removeVowels;
        pointCountSelect.value = selectedPointCount;
        closeShapeCheckbox.checked = closeShape;
        showCircleCheckbox.checked = showCircle;
        circleColorPicker.value = circleColor;

        drawCircle(word, selectedColor, removeDuplicates, removeVowels, selectedPointCount, closeShape, showCircle, circleColor)

    });

    historyList.prepend(listItem);

    if (historyList.children.length > 10) {
        historyList.removeChild(historyList.lastElementChild);
    }
}
function addToFavorites(word, selectedColor, removeDuplicates, removeVowels, selectedPointCount, closeShape, showCircle, circleColor) {

    const favoriteItems = favoritesList.querySelectorAll("li");

    for (const item of favoriteItems) {
        if (
            item.dataset.word === word &&
            item.dataset.color === selectedColor &&
            item.dataset.removeDuplicates === String(removeDuplicates) &&
            item.dataset.removeVowels === String(removeVowels) &&
            item.dataset.pointCount === String(selectedPointCount) &&
            item.dataset.closeShape === String(closeShape) &&
            item.dataset.showCircle === String(showCircle) &&
            item.dataset.circleColor === String(circleColor)
        ) {
            return;
        }
    }

    const favoriteItem = document.createElement("li");

    favoriteItem.dataset.word = word;
    favoriteItem.dataset.color = selectedColor;
    favoriteItem.dataset.removeDuplicates = removeDuplicates;
    favoriteItem.dataset.removeVowels = removeVowels;
    favoriteItem.dataset.pointCount = selectedPointCount;
    favoriteItem.dataset.closeShape = closeShape;
    favoriteItem.dataset.showCircle = showCircle;
    favoriteItem.dataset.circleColor = circleColor;
    favoriteItem.textContent =  word;

    const removeFavoriteButton = document.createElement("button");

    removeFavoriteButton.textContent ="×";
    removeFavoriteButton.classList.add("remove-favorite");

    favoriteItem.appendChild(removeFavoriteButton);

    removeFavoriteButton.addEventListener("click", function (event){
        event.stopImmediatePropagation();

        favoriteItem.remove();

        saveFavorites();
    });

    favoriteItem.addEventListener("click", function() {
        document.getElementById("wordInput").value = word;

        colorPicker.value = selectedColor;
        removeDuplicateCheckbox.checked = removeDuplicates;
        removeVowelsCheckbox.checked = removeVowels;
        pointCountSelect.value = selectedPointCount;
        closeShapeCheckbox.checked = closeShape;
        showCircleCheckbox.checked = showCircle;
        circleColorPicker.value = circleColor;
        
        drawCircle(word, selectedColor, removeDuplicates, removeVowels, selectedPointCount, closeShape, showCircle, circleColor);
    });

    favoritesList.prepend(favoriteItem);
    
    saveFavorites();
}

function saveFavorites() {

    const favorites = [];
    const favoriteItems = favoritesList.querySelectorAll("li");

    for (const item of favoriteItems) {
        favorites.push({
            word: item.dataset.word,
            color: item.dataset.color,
            removeDuplicates: item.dataset.removeDuplicates,
            removeVowels: item.dataset.removeVowels,
            pointCount: item.dataset.pointCount,
            closeShape: item.dataset.closeShape,
            showCircle: item.dataset.showCircle,
            circleColor: item.dataset.circleColor
        });
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
}

function loadFavorites() {

    const savedFavorites = localStorage.getItem("favorites");

    if (!savedFavorites) {
        return;
    }

    const favorites = JSON.parse(savedFavorites);

    for (const favorite of favorites) {
        addToFavorites(
            favorite.word,
            favorite.color,
            favorite.removeDuplicates === "true",
            favorite.removeVowels === "true",
            Number(favorite.pointCount),
            favorite.closeShape === "true",
            favorite.showCircle === "true",
            favorite.circleColor
        );
    }
}

loadFavorites();
