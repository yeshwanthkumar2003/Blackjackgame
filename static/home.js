let blackjackgame = {
    'you':{'scorespan':'#your-blackjack-result', 'div':'#your-box','score':0},
    'dealer':{'scorespan':'#dealer-blackjack-result', 'div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsmap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'Q':20,'A':[1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isstand':false,
    'turnsover':false,

};
const YOU =blackjackgame['you']
const DEALER =blackjackgame['dealer']

const hitsound=new Audio('static/sounds/swish.m4a');
const winsound=new Audio('static/sounds/cash.mp3');
const lostsound=new Audio('static/sounds/aww.mp3');





document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackhit); 
document.querySelector('#blackjack-Stand-button').addEventListener('click',dealerlogic); //similiar to id selection un css//similiar to id selection un css
document.querySelector('#blackjack-Deal-button').addEventListener('click',blackjackDeal); //similiar to id selection un css//similiar to id selection un css


//addeventlistener replaces onclick function in html

function blackjackhit(){ // POP CARDS FOR BOTH YOU AND DEALER USING FUNCTION

    if(blackjackgame['isstand'] === false){
    let card = randomcard();  //function to pick randomly a card
    console.log(card);     
   showcard(card ,YOU);
   updatescore(card,YOU);
   showscore(YOU);
   console.log(YOU['score']);      //if stand not works then only the hit works
    }
}

function randomcard(){
    let randomcard=Math.floor(Math.random()*13);  //math function for random cards
    return blackjackgame['cards'][randomcard]  //object in an array returns with an array of blackjack game
}



function showcard(card ,activeplayer){  //card used for random card images in all modules
    if (activeplayer['score'] <=21){
    let cardimage =document.createElement('img');
   cardimage.src= `static/images/${card}.png`;
   document.querySelector(activeplayer['div']).appendChild(cardimage);
   hitsound.play();
}
}

function blackjackDeal() {
    if(blackjackgame['turnsover'] === true){

    blackjackgame['isstand'] = false;
    let yourimages = document.querySelector('#your-box').querySelectorAll('img');//select both images and box in flexbox in dealerside in your side
    let dealerimages = document.querySelector('#dealer-box').querySelectorAll('img'); //select both images and box in flexbox in dealerside
     //select both images and box in flexbox
    for (i=0;i<yourimages.length;i++){ //this function remove the cards throughoutly after hit in yourside
        yourimages[i].remove();
    }// yourimages[0].remove(); //this function remove the cards one by one after hit in your side
    
    
    for (i=0;i<dealerimages.length;i++){ //this function remove the cards throughoutly after hit in dealerside
        dealerimages[i].remove();
    }
    YOU['score']=0;
    DEALER['score']=0;

    document.querySelector('#your-blackjack-result').textContent = 0; //function to take score again to zero 
    document.querySelector('#dealer-blackjack-result').textContent = 0; //function to take score again to zero in dealer side

    document.querySelector('#your-blackjack-result').style.color='#ffffff'; // function to coming back to the white color
    document.querySelector('#dealer-blackjack-result').style.color='#ffffff';
    document.querySelector('#blackjack-result').style.color='black';

    blackjackgame['turnsover'] = true;
}
}

//working start on score
function updatescore(card,activeplayer){

if(card ==='A'){
    // if adding 11 keeps below 21,otherwise add 1
    if(activeplayer['score'] + blackjackgame['cardsmap'][card][1] <=21){
         activeplayer['score'] += blackjackgame['cardsmap'][card][1];
    }else{
        activeplayer['score'] += blackjackgame['cardsmap'][card];
    }
} else {
    activeplayer['score'] +=blackjackgame['cardsmap'][card]  //here score is accesed by taking the value at randommap function  -----> It increments the score
  }
}

//frontend incrementation
function showscore(activeplayer){
    if(activeplayer['score'] > 21){  // 21 is the max score
        document.querySelector(activeplayer['scorespan']).textContent ='BUST!';
        document.querySelector(activeplayer['scorespan']).style.color ='red';

    } else {
     document.querySelector(activeplayer['scorespan']).textContent = activeplayer['score'];
    }
}

function dealerlogic(){   
    blackjackgame['isstand'] = true;      //function to the dealer side to show the random cards and to pop up the cards
    let card = randomcard();
    showcard(card,DEALER);
    updatescore(card,DEALER);
    showscore(DEALER);

    if(DEALER['score']>15) { 
        blackjackgame['turnsover'] = true;      //function for automatic popup all cards in dealer side
        let winner = computewinner();
        showresult(winner);
        console.log(blackjackgame['turnsover']);

    }
}



//compute winner and return who just won
//update the wins,draws,losses
function computewinner(){ //the concept here is less than 21 is the winner
    let winner;
    if(YOU['score'] <= 21){
        //condition: higher score than dealer or dealer busts but you are not higher than dealer
        if(YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)){
            blackjackgame['wins']++;
            winner=YOU;
        } else if (YOU['score'] < DEALER['score']) {
            blackjackgame['losses']++;
            winner=DEALER;
            
          } else if(YOU['score'] === DEALER['score']) {
            blackjackgame['draws']++;
            

           
          }

    }
         //condition when user busts but dealer doesnt
           else if(YOU['score'] > 21 && DEALER['score'] <= 21){
            blackjackgame['losses']++;
            winner = DEALER;


            
            //condition when you and dealer busts
           } else if (YOU['score'] > 21 && DEALER['score'] > 21){
            blackjackgame['draws']++;
            
           }
           console.log(blackjackgame);
           return winner;
}

//message on the top
function showresult(winner){
   let message, messagecolor;

    if(blackjackgame['turnsover'] === true){


   if (winner === YOU){
    document.querySelector('#wins').textContent=blackjackgame['wins'];
    message = 'YOU WON';
    messagecolor='green';
    winsound.play();

   }else if ( winner === DEALER){
    document.querySelector('#losses').textContent=blackjackgame['losses'];

    message = 'YOU lost!';
    messagecolor='red';
    lostsound.play();

   }else {
    document.querySelector('#draws').textContent=blackjackgame['draws'];

    message = 'You drew';
    messagecolor='black';
   }

   document.querySelector('#blackjack-result').textContent = message;
   document.querySelector('#blackjack-result').style.color = messagecolor;

}
}
function myFunction() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
  
    // Add the "show" class to DIV
    x.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }


