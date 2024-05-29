const cards = document.querySelectorAll('.memory-card') // on sélectionne toutes les cartes

let siCarteFlip = false
let lockBoard = false;
let premiereCarte, deuxiemeCarte;

function flipCard(){ // fonction qui permet de savoir si les cartes sont les mêmes
    if (lockBoard) return;
    if(this === premiereCarte) return; // Si on appuye 2 fois sur la même image, cela ne fait rien.
    this.classList.add('flip'); // rajoute un .flip à a classe de memory-card, cela permet de déclencher ce qui retourne les cartes grâve au css

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
             //si c'est les mêmes, on enlève le fait de pouvoir cliquer dessus pour les laisser visibles
            premiereCarte.removeEventListener('click', flipCard); 
            deuxiemeCarte.removeEventListener('click', flipCard);
            resetBoard();
        } else {
            //si elles ne sont pas pareil
            lockBoard = true

            // On met un setTimeout, pour pouvoir mettre une durée pour la réinitialisation des cartes si elles ne sont pas les mêmes
            setTimeout(() => {
            premiereCarte.classList.remove('flip');
            deuxiemeCarte.classList.remove('flip');

            resetBoard();
            },2000)
        }
    }
}

// La fonction mélanger prend la priorité sur tout le reste avec les parenthèses, quand on lance le site, cette fonction se fera en premier
function melanger (){
    cards.forEach(card => {let aleaPos = Math.floor(Math.random()*12);
    card.style.order = aleaPos; 
    });
};

// Pour chaque carte, on ajoute la possibilité de cliquer dessus
cards.forEach(card => card.addEventListener('click', flipCard))

const resetBoard = () => {
    [siCarteFlip, lockBoard] = [false, false]; // Réinitialise les variables de suivi du jeu
    [premiereCarte, deuxiemeCarte] = [null, null]; // Réinitialise les cartes retournées 
};

// Mélangez les cartes dès que la page se charge
window.addEventListener('load', () => {
    melanger();
});

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
    cards.forEach(card => card.classList.remove('flip'));
    resetBoard();
    cards.forEach(card => card.addEventListener('click', flipCard))
    melanger();
    }
});
