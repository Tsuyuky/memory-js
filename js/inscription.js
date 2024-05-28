const mdpInput = document.getElementById('mdp'); // On sélectionne mdp
        const strengthIndicator = document.getElementById('mdp-strength');

        mdpInput.addEventListener('input', () => {
            const mdp = mdpInput.value;
            const strength = getPasswordStrength(mdp);

            strengthIndicator.textContent = `Force du mot de passe: ${strength.text}`;
            strengthIndicator.className = `strength ${strength.class}`;
        });

        function getPasswordStrength(mdp) {
            //On stock dans une constante la longueur du mdp
            const longueur = mdp.length;
            //On stock dans une constante les caractères des nombres
            const hasNumber = /[0-9]/.test(mdp);
            //On stock dans une constante les caractères spéciaux
            const hasSymbol = /[^\w\s]/.test(mdp);

            //Condition pour savoir la force du mot de passe
            if (longueur > 9 && hasNumber && hasSymbol) {
                return { text: 'Fort', class: 'strong' };
            } else if (longueur >= 6 && (hasNumber || hasSymbol)) {
                return { text: 'Moyen', class: 'medium' };
            } else if (longueur < 6) {
                return { text: 'Faible', class: 'weak' };
            } else {
                return { text: 'Faible', class: 'weak' };
            }
        }