import { getUsers } from './modules/storage.js'; // On exporte le getUsers

const $loginForm = document.getElementById('container'); // On récupère les données dans le container

$loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // on stock la value de mail et mdp
    const email = event.target.mail.value;
    const password = event.target.mdp.value;
    // On regarde les utilisateurs enregistrer
    const users = getUsers();
    const user = users.find(user => user.mail === email && user.mdp === password);
    //si les élements récupérer sont bon, on se connecte
    if (user) {
        document.getElementById('message-succes').textContent = "Connexion réussie !";
        // Redirigez vers le tableau de bord ou une autre page
        window.location.href = "../profil.html";
    } else {
        //Si ce n'est pas bon, on affiche une erreur
        const $emailError = document.getElementById('erreur-mail');
        const $passwordError = document.getElementById('erreur-motdepasse');

        $emailError.textContent = '';
        $passwordError.textContent = '';
        //si e-mail pas bon
        if (!users.some(user => user.mail === email)) {
            $emailError.textContent = "Adresse e-mail non trouvée";
        } else {
            //si mdp pas bon
            $passwordError.textContent = "Mot de passe incorrect";
        }
    }
});