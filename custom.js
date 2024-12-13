const container = document.getElementById('game-container');
var game = document.querySelector(".game");
var basket = document.querySelector(".basket");
var fruits = document.querySelector(".fruits");
var basketLeft = parseInt(window.getComputedStyle(basket).getPropertyValue("left"));
var basketBottom = parseInt(window.getComputedStyle(basket).getPropertyValue("bottom"));
const scoreDisplay= document.querySelector ('.score');
var score = 0;

function moveBasketLeft(){
    if (basketLeft > 0) {
        basketLeft -= 20;
        basket.style.left = basketLeft + 'px';
    }
}

function moveBasketRight(){
    if (basketLeft < 620) {
        basketLeft += 20; 
        basket.style.left = basketLeft + 'px';
    }
}

function control(e){
    if (e.key == "ArrowLeft") {
        moveBasketLeft();
    }
    if (e.key == "ArrowRight") {
        moveBasketRight();
    }
}

function endGame() {
    gameOver= true;
    const popup= document.getElementById('game-over-popup');
    const overlay= document.getElementById('overlay');
    const finalScore= document.getElementById('final-score');
    
  
    finalScore.textContent= score;
    popup.style.display= 'block';
    overlay.style.display= 'block';
    
    fruits.forEach((fruit) => fruit.remove());
    
    fruits = [];
  }
  
  document.getElementById('restart-button').addEventListener('click', () => {
    gameOver= false ;
     score= 0;
    dropSpeed= 5;
    scoreDisplay.textContent = `Your Score: ${score}`;
    
    const popup=document.getElementById('game-over-popup');
    const overlay= document.getElementById('overlay');
    popup.style.display= 'none';
    overlay.style.display= 'none';
  });

function generateFruits(){
    var fruitBottom = 470;
    var fruitLeft = Math.floor(Math.random() * 620);
    var fruit = document.createElement('div');
    fruit.setAttribute("class", "fruit");
    fruits.appendChild(fruit);
    fruit.style.left = fruitLeft + 'px';
    function fallDownFruit(){
        if (fruitBottom < basketBottom + 50 && fruitBottom  > basketBottom && fruitLeft > basketLeft - 30 && fruitLeft < basketLeft + 80) {
            fruits.removeChild(fruit);
            clearInterval(fallInterval);
            score++;
        }
        if (fruitBottom < basketBottom) {
            alert("Game Over! Your score is:"+score);
            clearInterval(fallInterval);
            clearTimeout(fruitTimeout);
            location.reload();
        }
        fruitBottom -= 5;
        fruit.style.bottom = fruitBottom + 'px';
        fruit.style.left = fruitLeft + 'px';
        
    }
    var fallInterval = setInterval(fallDownFruit, 20);
    var fruitTimeout = setTimeout(generateFruits, 2000);
    
}
generateFruits()

document.addEventListener("keydown", control);

