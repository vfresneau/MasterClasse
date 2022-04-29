//________________________________________DECLARATION VARIABLES_______________________________________________________
let myExercices = {};
let myThemes = {};
let whiteBlockTitle;
let tableAnswers = [];
let myAnswer = [];
let myIdTheme;
let Pics;
let myThemeString;
let ColumButton;
let indexExoEnCours = 0;
let admin;

//Récupère et lie l'element html de la page "espace stagaire" pour afficher le contenu de cette page
let container = document.getElementById("container_espace_stagiaire");

//________________________________________________LIEN FOOTER______________________________________________________________________________________//

//Si ce n'est pas la page connexion, j'applique le onclick (car pas footer sur cette page)
//évite un erreur dan sla console //
if (window.location.href.indexOf("connexion")==-1){
//Recupération de l'id du lien de contact pour y ajouter la fonction onclick afin d'afficher l'alerte de contact
let myLinkContact = document.getElementById("link_contact");
myLinkContact.onclick = function () {
    alert("Téléphone : 02.47.39.24.01" + "\n" + "Mail : formation.dev@mail.fr");
};}

//________________________________________________LIEN DECONNECTION______________________________________________________________________________________//

//fonction qui lors du clic sur le logo deconnecter, efface les cookies de l'utilisateur et renvoi à l'accueil.
//le lien est attribué sur la page espace_stagiaire
function clearAndRedirect(link) {
    eraseCookie();
    document.location = link;
}

//____________________________________________________________FONCTION PRINCIPAL________________________________________________________________________________//

//Fonction qui affiche le tableau d'exercice,et qui permet d'en selectionné un.
function tableau_exercice_stagiaire() {
    container.innerHTML = "";
    let TableExercice = ultimateHTMLGenerator("table", "", ["table", "table-hover", "autorisation", "my-auto", "text-center", "mx-auto", "table-responsive-md"], container);
    let headTable = ultimateHTMLGenerator("thead", "", [], TableExercice);
    let headRow = ultimateHTMLGenerator("tr", "", [], headTable);

    let columHead1 = ultimateHTMLGenerator("th", "EXERCICES", ["col-3"], headRow);
    columHead1.id="columHead1";
    columHead1.scope = "col";

    let columHead2 = ultimateHTMLGenerator("th", "NIVEAU", ["col-3"], headRow);
    columHead2.id="columHead2";
    columHead2.scope = "col";

    let columHead3 = ultimateHTMLGenerator("th", "THEMES", ["col-3"], headRow);
    columHead3.id="columHead3";
    columHead3.scope = "col";

    let bodyTable = ultimateHTMLGenerator("tbody", "", [], TableExercice);
    bodyTable.scope = "row";

    //on parcours notre tableau d'objects Exercice //
    for (let i = 0; i < myExercices.Exercice.length; i++) {
        let rowTable = ultimateHTMLGenerator("tr", "", [], bodyTable);
        //Lors d'un click sur une ligne du tableau on selectionne l'exercice et on l'affiche dans une autre page
        rowTable.addEventListener("click", function () {
            //on stocke "i" dans une variable //
            indexExoEnCours = i;
            //on passe en parametre dans la fonction, l'ID de l'exercice selectionné
            retrieveExercice(myExercices.Exercice[i]._ID);
        })
        //on affiche le "nom" de l'exercice dans la ligne du tableau
        let valueColum1 = ultimateHTMLGenerator("td", myExercices.Exercice[i]._NOM, [], rowTable);
        valueColum1.classList = "table-secondary";

        //on affiche le "niveau" de l'exercice dans la ligne du tableau
        let valueColum2 = ultimateHTMLGenerator("td", myExercices.Exercice[i]._NIVEAU, [], rowTable);
        valueColum2.classList = "table-dark";

        //on affiche le "themes" de l'exercice dans la ligne du tableau
        let myThemes = findTheme(myExercices.Exercice[i]._ID_THEME);
        let valueColum3 = ultimateHTMLGenerator("td", myThemes, [], rowTable);
        valueColum3.classList = "table-secondary";
    }
}

//fonction pour récupérer le nom du themes selon l'ID de l'exercice qui correspond à un theme //
function findTheme(id) {
    for (let y = 0; y < myThemes.theme.length; y++) {
        if (myThemes.theme[y]._ID == id) {
            return myThemes.theme[y]._NOM;
        }
    }
}
//______________________________________________________________________WEBSERVICE POUR AFFICHER LE TABLEAU D'EXERCICE___________________________________________________________________________________//

//Au click sur le bouton EXERCICE la fonction load_Exercice est executé.
//Cette fonction vide le contenu de la page, et grâce à la requete AJAX nous affichons le tableau d'exercice.
function load_Exercice() {
    //efface le container avant d'afficher la page
    container.innerHTML = "";
    //On créer une intance de l'objet XMLHttpRequest qui envoie une demande à un webservice
    var xhr = new XMLHttpRequest();
    //lancement de la fonction anonyme exécuté lors du changement de statue de la requetHTTP
    xhr.onreadystatechange = function () {
       //si la réponse à la requette est:terminée
        if (xhr.readyState == XMLHttpRequest.DONE) {
            //on convertis le xhr.reponseText(la reponse du serveur) au format texte, en objet JSON
            myExercices = JSON.parse(xhr.responseText);
            //verification visuel de notre variable dans notre console
            console.log(myExercices);
            //apelle la fonction load_Theme
            load_Theme();
        }
    }
    // methode utilisée par le protocole http, à l'aquelle on envoie 3 paramètres :methode POST,adresse du web service utilisé, ma requete est asynchrone
    xhr.open('POST', 'http://141.94.223.96/Vincent/MasterClasse/php/webservice/ws_read_exercice.php', true);
    //type de contenu utile pour l'envoie de parametre dans send
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //je definie que j'attend du json en retour de la requet http
    xhr.setRequestHeader('Accept', 'application/json');
    //je definie le token d'authorisation de la requette http
    xhr.setRequestHeader('Authorization', 'Bearer ' + getCookie('jwt'));
    //on envoie la requette
    xhr.send();
}

//___________________________________________WEBSERVICE POUR AFFICHER LES THEMES_______________________________

//fonction pour afficher les themes //
function load_Theme() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            myThemes = JSON.parse(xhr.responseText);
            console.log(myThemes);
            //Affiche la page avec toutes ces données incluant les themes//
            tableau_exercice_stagiaire();
        }
    }
    xhr.open('POST', 'http://141.94.223.96/Vincent/MasterClasse/php/webservice/ws_read_theme.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + getCookie('jwt'));
    xhr.send();
}

//___________________________________________WEBSERVICE POUR LIRE LES THEMES_______________________________

//fonction qui retrouve le theme et le lit //
function readTheme() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            myThemes = JSON.parse(xhr.responseText);
            //verification si je reçois bien mon webService //
            Retrieve_Id_Themes(myIdTheme);
            //et j'affiche le resulat dans le resulat dans la page
            myBlock();
        }
    }
    xhr.open('POST', 'http://141.94.223.96/Vincent/MasterClasse/php/webservice/ws_read_theme.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + getCookie('jwt'));
    xhr.send();
}

//Cette fonction permet de remplir les champs avec les informations correspondants à l'exercice selectionné,
//l'id étant passé en paramètre lors du clic.
function retrieveExercice(idExercice) {
    // on vide la liste de réponse, pour permettre d'avoir les nouvelles réponses
    myAnswer = [];
    for (let y = 0; y < myExercices.Exercice.length; y++) {
        //Si l'idExercice transmis est identique à celui d'un exercice du tableau Exercice : //
        if (myExercices.Exercice[y]._ID == idExercice) {
            //alors je créer une variable pour mettre les elements dont j'ai besoin //
            myTitle = myExercices.Exercice[y]._NOM;
            myIdTheme = myExercices.Exercice[y]._ID_THEME;
            instructions = myExercices.Exercice[y]._CONSIGNE;
            myLevel = myExercices.Exercice[y]._NIVEAU;
            tableAnswers = myExercices.Exercice[y]._REPONSES;
            correctAnswers = myExercices.Exercice[y]._REPONSEATTENDU;
        }
    }
    //pour tous les elements du tableau REPONSES, j'ajoute au tableau des reponses "tableAnswer" toutes les descriptions //
    for (let x = 0; x < tableAnswers.length; x++) {
        myAnswer.push(tableAnswers[x]._DESCRIPTION);
    }
    //Envoie dans le tableau myAnswer le tableau de reponse //
    myAnswer.push(correctAnswers);
    //changer l'ordre d'apparition des bonnes reponses //
    shuffle(myAnswer);
    readTheme();
}

//fonction qui permet de mettre un ordre aléatoire pour les reponses dans son tableau answer
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    // Tant qu'il reste des éléments à brasser...
    while (currentIndex != 0) {
        // Choisissez un élément restant
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // Et échangez-le avec l'élément actuel.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
    return array;
}

//retrouve le NOM du theme en fonction de l'exercice en cours //
function Retrieve_Id_Themes(myIdTheme) {
    for (let i = 0; i < myThemes.theme.length; i++) {
        //Si l'idExercice transmis est identique à celui d'un exercice du tableau Exercice : //
        if (myThemes.theme[i]._ID == myIdTheme) {
            //je créer une variable pour mettre les elements dont j'ai besoin //
            myThemeString = myThemes.theme[i]._NOM;
            //stop la boucle
            break;
        }
    }
}

//Fonction pour afficher mon block contenant "l'exercice à débuter" , pour le stagiaire.
function myBlock() {
    //Efface le conteneur avant l'affichage de la page
    container.innerHTML = "";

    //creation d'un block blanc de presentation
    let whiteBlock = ultimateHTMLGenerator("div", "", ["row", "bg-light"], container);
    whiteBlock.id = "blockBlanc";

    //creation d'un titre H4
    let TitleExercice = ultimateHTMLGenerator("h4", myTitle, [], whiteBlock);
    TitleExercice.id = "TitleExercice";

    //Des colonnes et lignes pour y mettre mes insctructions (paragraphe, theme, consigne)//
    let columInstructions = ultimateHTMLGenerator("div", "", ["col-12"], whiteBlock);
    let LineInstructions = ultimateHTMLGenerator("div", "", ["row"], columInstructions);
    LineInstructions.id = "LineInstructions";

    //creation de paragraphe pour mettre le theme et le niveau de l'exercice //
    let paragraph1_theme_level = ultimateHTMLGenerator("p", "THEME : " + myThemeString + "\n" + "NIVEAU : " + myLevel, ["text-light", "d-flex", "justify-content-center"], LineInstructions);
    let paragrap2_instructions = ultimateHTMLGenerator("p", instructions, ["text-light"], LineInstructions);

    let ColumExercice = ultimateHTMLGenerator("div", "", ["col-12"], whiteBlock);
    ColumExercice.id = "ColumExercice";

    //Culum of button //
    ColumButton = ultimateHTMLGenerator("div", "", ["col-6"], whiteBlock);
    ColumButton.id = "ColumButton";

    //I create a button for go to the next exercice //
    let NextButton = ultimateHTMLGenerator("button", "Exercice suivant", ["btn"], ColumButton);
    // j'attribu un id unique au bouton exercice suivant
    NextButton.id = "NextButton1";
    NextButton.onclick = function () {
        //On incrémente  de +1 à "indexExoEnCours" (variable qui stocke l'emplacement de l'exercice)
        indexExoEnCours++;
        //Lors du click je charge l'exercice suivant
        retrieveExercice(myExercices.Exercice[indexExoEnCours]._ID);
        //--> affiche les themes //
        readTheme();
    }
    //Colum of Congratulation //
    let ColumCongratulation = ultimateHTMLGenerator("div", "", ["col-6"], whiteBlock);

    //Create a picture for good answer ! //
    Pics = ultimateHTMLGenerator("img", "", [], ColumCongratulation);
    Pics.src = "../image/goodjob.jfif";
    Pics.id = "Picsgoodjob";

    //create a paragraph for the correction //
    let ParaCorrection = ultimateHTMLGenerator("p", "La réponse attendue était :" + "\n" + correctAnswers, [], whiteBlock);
    ParaCorrection.id = "ID_ParaCorrection";

    //J'utilise une boucle for pour y faire apparaitre les proposition de réponse
    for (j = 0; j < myAnswer.length; j++) {
        //create a inputGroup 
        let inputGroup = ultimateHTMLGenerator("div", "", ["form-check"], ColumExercice);

        //Create a input type checkbox //
        let InputCheckbox = ultimateHTMLGenerator("input", "", ["form-check-input", "mt-0"], inputGroup);
        InputCheckbox.type = "checkbox";

        //create a id for the checkbox //
        InputCheckbox.id = j + "checkboxId";
        // on ajoute le même nom pour chaque balise input --> pour toutes les récups plus tard
        InputCheckbox.name = "checkboxId";
        InputCheckbox.addEventListener("click", function () { verificator(InputCheckbox.id, LabelCheckbox.id) });

        //create a id for the Label //
        let LabelCheckbox = ultimateHTMLGenerator("label", myAnswer[j], ["form-check-label"], inputGroup);
        LabelCheckbox.id = j + "LabelId";
    }
}

//fonction qui verifie si l'on as la bonne réponse ou non // 
function verificator(checkboxId, LabelId) {
    // on selectionne toutes balises avec le name "checkboxId"
    checkboxes = document.getElementsByName('checkboxId');
    // pour chaque element trouvé, on disabled (désactive) la checkbox
    for (var i = 0, n = checkboxes.length; i < n; i++) {
        checkboxes[i].disabled = true;
    }
    //si cette ligne est cochée et que c'est de la bonne//
    if (document.getElementById(checkboxId).checked === true && document.getElementById(LabelId).textContent == correctAnswers) {
        //verification dans la console de la recuperation que ce sont bien les memes id //
        console.log(checkboxId, LabelId);
        //afficher good-job // 
        document.getElementById("Picsgoodjob").style.visibility = "visible";
        document.getElementById("ColumButton").style.visibility = "visible";
    }
    //Sinon affiche la REPONSE ATTENDU //
    else (document.getElementById("ID_ParaCorrection").style.visibility = "visible");
    document.getElementById("ColumButton").style.visibility = "visible";
}

//Fonction qui permet se logguer en mode securisé au profil stagiaire ou celui de Createur, et qui crer un cookie afin de passer d'une page à l'autre en étant connecté
function connexion() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log(xhr.responseText)
            if (xhr.responseText != 0) {
                //Grace a la fonction setCookie() on génère un cookie avec un nom, la reponse du Ws qui permet de generer un jwt, et un nombre de jours de validité (1)
                setCookie("jwt", xhr.responseText, 1);
                //resulat décodé du payload du jwt (récupère la charge utile du jwt)
                console.log(parseJwt(xhr.responseText));
                //resulat décodé du payload ou jwt suivi du 0 ou 1 qui permet de savoir si admin ou pas
                admin = parseJwt(xhr.responseText).admin;
                if (admin == 1) {
                    window.location.href = "../html/espace_createur.html";
                } else {
                    window.location.href = "../html/espace_stagiaire.html";
                }
            } else { alert("mauvais login mot de pass") }
        }
    }
    xhr.open("POST", "http://141.94.223.96/Vincent/MasterClasse/php/webservice/ws_connexion.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("mail=" + document.getElementById("email").value + "&mdp=" + document.getElementById("mdp").value);
}

//____________________________________________________________LIENS DES BOUTTONS COURS ET EXAMENS________________________________________________________________________________//

//Lors de la fonction onclick j'affiche les examens 
function loadExamens(){
    window.location.href="https://apcpedagogie.com/examen-en-html-css-javascript-php-et-mysql-01/";
}
//Lors de la fonction onclick j'affiche les cours de HTML
function loadHtml(){
    window.location.href = 'https://www.w3schools.com/html/default.asp';
}
//Lors de la fonction onclick j'affiche les cours de CSS
function loadCss(){
    window.location.href = 'https://www.w3schools.com/css/default.asp';
}
//Lors de la fonction onclick j'affiche les cours de JS
function loadJs(){
    window.location.href = 'https://www.w3schools.com/js/default.asp';
}
//Lors de la fonction onclick j'affiche les cours SQL
function loadSql(){
    window.location.href = 'https://www.w3schools.com/sql/default.asp';
}
//Lors de la fonction onclick j'affiche les cours de PHP
function loadPhp(){
    window.location.href = 'https://www.w3schools.com/php/default.asp';
}



//_____________________________________Fonction HTML Element Generator_______________________________________

function ultimateHTMLGenerator(typeElement, contenu, tableauClassCss, destinationElement) {                       
    //on créer un élement html donné en paramètre (1er paramètre) 
    let ultimateElement = document.createElement(typeElement);
    //on attribut du contenu (paramètre 2) à l'element html précedemment fabriqué                                                   
    ultimateElement.textContent = contenu;                    //on souhaite ajouter plusieurs class CSS à l'element html précedement créé
    //on ajoute une classList à la variable ultimateElement
    //et on ajoute la class css contenu dans le tableau de class css (3ème paramètre)
    for (let i = 0; i < tableauClassCss.length; i++) {       
        ultimateElement.classList.add(tableauClassCss[i]);  
    }
    //on fait apparaitre l'élement dans celui passé en 4ème paramètre
    destinationElement.appendChild(ultimateElement);  
    //Force la sortie de la boucle FOR
    return ultimateElement;                              
}

//____________________________________________________________//FONCTIONS POUR LES COOKIES//_________________________________________________________________________//

//Fonction creation d'un cookie en passant en paremetre un nom, une valeur,le nmbre de jour
function setCookie(name, value, days) {
    var expires = "";
    //si les jours ont bien été définis
    if (days) {
        //on creer un object date stockant la date actuelle
        var date = new Date();
        //on definit la date d'expiration du cookie
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        //on met la date au bon format pour un cookie
        expires = "; expires=" + date.toUTCString();
    }
    //creation du cookie
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Fonction permettant de récupérer un cookie par son nom
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

//_________________________________________________________________________
// Fonction permettant de supprimer un cookie
function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

//____________________________________________________________//FONCTIONS LE JWT//_________________________________________________________________________//


//Recupère la charge utile (notre payload) du token
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};