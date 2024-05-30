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

//On regardes les différents utilisateurs pour voir l'aresse email enregistré
function userExists(email) {
    const users = getUsers();// Récupérez les utilisateurs existants
    return users.some(user => user.mail === email);
}
//On regardes les différents utilisateurs pour voir le nom d'enregistré
function nameExists(nom) {
    const users = getUsers();
    return users.some(user => user.nom === nom);
}

    // Parcours
    $form.addEventListener('submit', (event) => {
        event.preventDefault();
        //Variables de gestion
        const errors = [];
        const user = {};
        //Sélectionner les inputs
        const $inputs = event.target.querySelectorAll('input');
        
        $inputs.forEach(input => {
            switch (input.id) {
            case "mail":
                //Si validateEmail est incorrecte, cela veut dire que l'email n'est pas bien écrit
                if (!validateEmail(input.value)) {
                    errors.push([input.id, "L'email n'est pas valide"]);
                    //Si le nom de l'email est déjà utilisé pour un autre compte, on ne peut pas crée de compte
                } else if (userExists(input.value)) {
                    errors.push([input.id, "Cet email est déjà utilisé"]);
                } else {
                    user.mail = input.value;
                }
                break;
                    // Gestion des autres champs
                    case "mdp":
                        if (!validatePassword(input.value)) errors.push([input.id, "Le mot de passe n'est pas valide"]);
                        else user.mdp = input.value;
                        break;
                    case "nom":
                        //Si validateNom est incorrecte, cela veut dire que le nom ne correspond pas au condition
                        if (!validateNom(input.value)) {
                            errors.push([input.id, "Le nom n'est pas valide"]);
                            //Si le nom de le nom est déjà utilisé pour un autre compte, on ne peut pas crée de compte
                        } else if (nameExists(input.value)) {
                            errors.push([input.id, "Ce nom est déjà utilisé"]);
                        } else {
                            user.nom = input.value;
                        }
                        break;
                    case "verifmdp":
                        // Si les mots de passe ne sont pas les mêmes, on ne peut pas crée de compte
                        if (input.value !== user.mdp) errors.push([input.id, "La vérification du mot de passe ne correspond pas"]);
                        else user.verifmdp = input.value;
                        break;
                    default:
                        break;
                }
            }
        );
    
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