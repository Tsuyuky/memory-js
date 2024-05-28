const cards = document.querySelectorAll('.memory-card')

let siCarteFlip = false
let lockBoard = false;
let premiereCarte, deuxiemeCarte;

function flipCard(){
    if (lockBoard) return;
    if(this === premiereCarte) return;
    this.classList.toggle('flip');

    if(!siCarteFlip){
        //premier clic
        siCarteFlip = true;
        premiereCarte = this;
    } else {
        //deuxieme clic
        siCarteFlip = false;
        deuxiemeCarte = this;

    // On regarde si les cartes sont les mêmes
        if (premiereCarte.dataset.framework === deuxiemeCarte.dataset.framework){
             //si c'est les mêmes
            premiereCarte.removeEventListener('click', flipCard);
            deuxiemeCarte.removeEventListener('click', flipCard);
        } else {
            //si elles ne sont pas pareil
            lockBoard = true

            setTimeout(() => {
            premiereCarte.classList.remove('flip');
            deuxiemeCarte.classList.remove('flip');

            lockBoard = false;
            },2000)
        }
    }
}

(function melanger (){
    cards.forEach(card => {let aleaPos = Math.floor(Math.random()*12);
        card.style.order = aleaPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard))