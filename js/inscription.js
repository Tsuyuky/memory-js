// Dépendances (imports)
import { validateEmail, validatePassword, validateNom } from "./modules/validators.js";
import { saveUser } from "./modules/storage.js";

const mdpInput = document.getElementById('mdp');
const strengthIndicator = document.getElementById('mdp-strength');

mdpInput.addEventListener('input', () => {
    const mdp = mdpInput.value;
    const strength = getPasswordStrength(mdp);

    strengthIndicator.textContent = `Force du mot de passe: ${strength.text}`;
    strengthIndicator.className = `strength ${strength.class}`;
});

function getPasswordStrength(mdp) {
    const longueur = mdp.length;
    const hasNumber = /\d/.test(mdp);
    const hasSymbol = /[^\w\s]/.test(mdp);

    if (longueur > 9 && hasNumber && hasSymbol) {
        return { text: 'Fort', class: 'strong' };
    } else if (longueur >= 6 && (hasNumber || hasSymbol)) {
        return { text: 'Moyen', class: 'medium' };
    } else {
        return { text: 'Faible', class: 'weak' };
    }
}

// Target
const $form = document.getElementById('contactForm');

// Listener
$form.addEventListener('submit', (event) => {
    // Variables de gestion
    const errors = [];
    const user = {};
    // Block auto
    event.preventDefault();
    // Select inputs
    const $inputs = event.target.querySelectorAll('input');

    // Parcours
    $inputs.forEach(input => {
        switch (input.id) {
            case "mail":
                if (!validateEmail(input.value)) errors.push([input.id, "L'email n'est pas valide"]);
                else user.mail = input.value;
                break;
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
    });

    // Check Final
    if (errors.length > 0) {
        // Insertion des erreurs
        errors.forEach(error => {
            const $displayErrorTarget = document.getElementById(`erreur-${error[0]}`);
            $displayErrorTarget.innerHTML = error[1];
        });
    } else {
        // Sauvegarde
        saveUser(user);
        document.getElementById('message-succes').textContent = "Utilisateur sauvegardé avec succès";
    }
});