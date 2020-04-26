
let dogs = [
    {
        name: "corgi",
        src: "assets/corgi.png"
    }, {
        name: "bark",
        src: "assets/bark.png"
    }, {
        name: "pilot",
        src: "assets/pilot.png"
    }, {
        name: "poodle",
        src: "assets/poodle.png"
    }, {
        name: "einstein",
        src: "assets/einstein.png"
    }, {
        name: "hulahoop",
        src: "assets/hulahoop.png"
    }, {
        name: "bulldog",
        src: "assets/french_bulldog_cane.png"
    }, {
        name: "lapdog",
        src: "assets/old_lapdog.png"
    }, {
        name: "fitness",
        src: "assets/fitness.png"
    }, {
        name: "russel",
        src: "assets/russel.png"
    }, {
        name: "ball",
        src: "assets/ball.png"
    }, {
        name: "barbell",
        src: "assets/barbell.png"
    }, {
        name: "birthday",
        src: "assets/birthday.png"
    }, {
        name: "bows",
        src: "assets/bows.png"
    }, {
        name: "boxer",
        src: "assets/boxer.png"
    }, {
        name: "business_hound",
        src: "assets/business_hound.png"
    }, {
        name: "chihuahua_bone",
        src: "assets/chihuahua_bone.png"
    }, {
        name: "cocktail",
        src: "assets/cocktail.png"
    }, {
        name: "pug",
        src: "assets/pug.png"
    }, {
        name: "sharpei",
        src: "assets/sharpei.png"
    },{
        name: "haski",
        src: "assets/haski.png"
    }, {
        name: "stbernard",
        src: "assets/stbernard.png"
    },{
        name: "sleeping",
        src: "assets/sleeping_bulldog.png"
    }, {
        name: "rich",
        src: "assets/rich.png"
    }, {
        name: "dachshund",
        src: "assets/dachshund.png"
    }, {
        name: "dalmatian",
        src: "assets/dalmatian.png"
    }, {
        name: "labrador",
        src: "assets/labrador.png"
    }
]; 

//add simple flip animation
//improve game end announcement

//2.
let cards = document.querySelectorAll(".card");

let card1 = null;

let card2 = null;

let matched = 0;

let currentCard;


//score

let clicks = 0;

let scoreDisplay = document.querySelector("#score");


//3.
//4.


let img = document.querySelectorAll("img");

for(let card of cards){
    card.addEventListener("click", cardClick);
}


function shuffle(){

     let newDogs = [];
     let dogArr = [...dogs];
     let temp;
     
 
     while(newDogs.length !== 20){
         let randomIndex = Math.floor(Math.random() * dogArr.length);
         temp = dogArr[randomIndex]; 
 
         if (!newDogs.includes(temp)){
             newDogs.push(dogArr[randomIndex], dogArr[randomIndex]);
         }
     }
 
 
     function shuffleDogs(dogArray) {
         
         for (let i = dogArray.length - 1; i > 0; i--) {
             let j = Math.floor(Math.random() * (i + 1));
             let k = dogArray[i];
             dogArray[i] = dogArray[j];
             dogArray[j] = k;
         }
         return dogArray;
     }
 
     let shuffledDogs = shuffleDogs(newDogs);
 
     for(let i = 0; i<img.length; i++){
         img[i].setAttribute("src", shuffledDogs[i].src)
     } 
}
   
for(let card of cards){
    card.children[0].classList.add("hide");
}

shuffle();

//5.
let newGameButton = document.querySelector("#new-game");
newGameButton.addEventListener("click", function(){
    clicks = 0;
    scoreDisplay.innerText = "0";
    shuffle();
    
    for(let card of cards){
        card.children[0].classList.add("hide");
        card.children[0].classList.remove("open");
    }
});


//6.
function cardClick(e){
    
    currentCard = e.target.children[0] || e.target;

    if(!card1 || !card2){

       currentCard.classList.add("open");
       currentCard.classList.remove("hide");
          
       
       card1 = card1 || currentCard;

    //    card2 = currentCard === card1 ? null : currentCard;
      
       if (currentCard === card1) {
        card2 = null;
       }
       else {
        card2 = currentCard;
       }
    }

    if(card1 && card2){
        let dog1 = card1.src;
        let dog2 = card2.src;

        if(dog1===dog2){
            matched += 2;
            card1.removeEventListener("click", cardClick);
            card2.removeEventListener("click", cardClick);
            card1 = null;
            card2 = null;
        } else {
            setTimeout(function(){
                if(card1){
                    card1.classList.remove("open");
                    card1.classList.add("hide");
                }
                 

                if(card2){
                    card2.classList.remove("open");
                    card2.classList.add("hide");
                }
                
                card1 = null;
                card2 = null;
            }, 1000);
    }

    

        if(matched === cards.length){
            endGame();
        }
    }
    
    clicks++;
    scoreDisplay.innerText = " " + clicks;        
    }



//9. score keeper

let bestScore = localStorage.getItem("best-score");
let bestScoreDisplay = document.querySelector("#best-score");

//7. startGame

if (bestScore) {
    bestScoreDisplay.innerText = bestScore;
}
else {
    bestScoreDisplay.innerText = 0;
}

//8. shuffle
function randomImage(min, max){
    let random = Math.floor(Math.random() * (max - min + 1));

    let imgSrc = dogs[random].src;

    return imgSrc;
}

//11.
function endGame(){
    setTimeout(function(){
        alert( "It's a match! Your score is " + clicks);
        matched = 0;
        localStorage.setItem("best-score", clicks);
        bestScoreDisplay.innerText = clicks;
    }, 
    500);
}
