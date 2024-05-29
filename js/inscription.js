// Dépendances (imports)
import { validateEmail, validatePassword, validateNom } from "./modules/validators.js";
import { saveUser, getUsers } from "./modules/storage.js";

// On recupère les éléments 'mdp' et 'mdp-strenght'
const mdpInput = document.getElementById('mdp');
const strengthIndicator = document.getElementById('mdp-strength');

mdpInput.addEventListener('input', () => {
    const mdp = mdpInput.value;
    const strength = getPasswordStrength(mdp);

    strengthIndicator.textContent = `Force du mot de passe: ${strength.text}`;
    strengthIndicator.className = `strength ${strength.class}`;
});

// On défini une fonction avec 3 constantes
function getPasswordStrength(mdp) {
    const longueur = mdp.length; // On défini une constantes qui prendra la longueur du mdp
    const hasNumber = /\d/.test(mdp); // On défini une fonction qui regarde si mdp a un nombre
    const hasSymbol = /[^\w\s]/.test(mdp); // on défini une fonction qui regarde si mdp à un symbole spécial

    if (longueur > 9 && hasNumber && hasSymbol) {
        return { text: 'Fort', class: 'strong' };
    } else if (longueur >= 6 && (hasNumber || hasSymbol)) {
        return { text: 'Moyen', class: 'medium' };
    } else {
        return { text: 'Faible', class: 'weak' };
    }
}

// Target
const $form = document.getElementById('container');

    // Parcours
    $form.addEventListener('submit', (event) => {
        event.preventDefault();
        const errors = [];
        const user = {};
        const users = getUsers(); // Récupérez les utilisateurs existants
        const $inputs = event.target.querySelectorAll('input');
    
        let existingEmail; // Déclaration de la variable en dehors du switch
    
        $inputs.forEach(input => {
            if (input.id === "mail") {
                existingEmail = users && users.find(u => u.mail === input.value); // Vérifiez si l'e-mail est déjà utilisé
                if (existingEmail) {
                    errors.push([input.id, "Cette adresse e-mail est déjà utilisée"]);
                } else if (!validateEmail(input.value)) {
                    errors.push([input.id, "L'email n'est pas valide"]);
                } else {
                    user.mail = input.value;
                }
            } else {
                switch (input.id) {
                    // Gestion des autres champs
                    case "mdp":
                        if (!validatePassword(input.value)) errors.push([input.id, "Le mot de passe n'est pas valide"]);
                        else user.mdp = input.value;
                        break;
                    case "nom":
                        if (!validateNom(input.value)) errors.push([input.id, "Le nom n'est pas valide"]);
                        else user.nom = input.value;
                        break;
                    case "verifmdp":
                        if (input.value !== user.mdp) errors.push([input.id, "La vérification du mot de passe ne correspond pas"]);
                        else user.verifmdp = input.value;
                        break;
                    default:
                        break;
                }
            }
        });
    
        // Check Final
        if (errors.length > 0) {
            // Insertion des erreurs
            errors.forEach(error => {
                const $displayErrorTarget = document.getElementById(`erreur-${error[0]}`);
                $displayErrorTarget.innerHTML = error[1];
            });
        } else {
            // Sauvegarde uniquement si aucune erreur n'est présente
            saveUser(user);
            document.getElementById('message-succes').textContent = "Utilisateur sauvegardé avec succès";
            // Redirigez l'utilisateur vers la page de tableau de bord
            window.location.href = "../connecter.html";
    }
})