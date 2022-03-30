//________________________________________DECLARATION VARIABLES_______________________________________________________
let myExercice = {};
let whiteBlockTitle;
let tableAnswers = [];
let myAnswer = [];
let myIdTheme;
let Pics;
let myThemeString;
let ColumButton;
let indexExoEnCours=0;

// container c'est la div qui contient l'exercice
let container = document.createElement("div");
container.classList.add("container-fluid");
document.body.appendChild(container);

//DECLARATION DES VARIABLES OBJETS//
let myExercices = {};
let myThemes = {};

// cont c'est la div qui contient la liste des exercices
let cont = document.createElement("div");
cont.classList.add("container-fluid");
document.body.appendChild(cont);

//Recupération de l'id du lien de contact pour y ajouter la fonction onclick afin d'afficher l'alerte de contact
let myLinkContact = document.getElementById("link_contact");
myLinkContact.onclick = function() {
    alert("Téléphone : 02.47.39.24.01" + "\n" + "Mail : formation.dev@mail.fr");
};

function tableau_exercice_stagiaire() {

    //on efface l'exercice
    cont.innerHTML = "";

    //creation d'un tableau boostraps ! //

    //creation d'un element html table dans le container//
    let TableExercice = ultimateHTMLGenerator("table", "", ["table", "table-hover", "autorisation", "my-auto", "text-center", "mx-auto", "table-responsive-md"], cont);
    //creation de l'element thead dans la variable tableau //
    let headTable = ultimateHTMLGenerator("thead", "", [], TableExercice);
    //creation d'un element html "tr" dans la variable TheadTableau // 
    let headRow = ultimateHTMLGenerator("tr", "", [], headTable);
    //creation d'un element html "th" dans la variable TrThead // 
    let columHead1 = ultimateHTMLGenerator("th", "EXERCICES", ["col-3"], headRow);
    columHead1.scope = "col";
    //creation d'un element html "th" dans la variable TrThead // 
    let columHead2 = ultimateHTMLGenerator("th", "NIVEAU", ["col-3"], headRow);
    columHead2.scope = "col";
    //creation d'un element html "th" dans la variable TrThead // 
    let columHead3 = ultimateHTMLGenerator("th", "THEMES", ["col-3"], headRow);
    columHead3.scope = "col";
    //creation d'un element html "tbody" dans la variable Tableau // 
    let bodyTable = ultimateHTMLGenerator("tbody", "", [], TableExercice);
    bodyTable.scope = "row";

    //Pour tous les exercices je créer une ligne dans le tableau //
    for (let i = 0; i < myExercices.Exercice.length; i++) {
        //creation d'un element html "th" dans la variable Tableau // 

        //creation d'un element html "tr" dans la variable tableau // 
        let rowTable = ultimateHTMLGenerator("tr", "", [], bodyTable);
        rowTable.addEventListener("click", function() {
            // je stocke quel index est en cours d'affichage y // TODO COMPRENDRE
            indexExoEnCours = i;
            // on appel la fonction read exercice qui va charger l'exercice sur la page --> on lui passe l'id à fabriquer
            ReadExerciceStagiaire(myExercices.Exercice[i]._ID);
        })
        //creation d'un element html "td" dans la variable th_row et affichage des noms des exercices// 
        let valueColum1 = ultimateHTMLGenerator("td", myExercices.Exercice[i]._NOM, [], rowTable);
        valueColum1.classList = "table-secondary";
        //creation d'un element html "td" dans la variable th_row et affichage des niveau// 
        let valueColum2 = ultimateHTMLGenerator("td", myExercices.Exercice[i]._NIVEAU, [], rowTable);
        valueColum2.classList = "table-dark";
        //creation d'un element html "td" dans la variable th_row et affichage des themes// 
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

//fonction qui récupère les exercices et qui passe les autres fonctions de la page //
function load_Exercice() {
    //
    cont.innerHTML = "";
    // container alpha c'est la div qui contiens les vignette exercice/cours/examen (viens du html)
    document.getElementById("container_ALPHA").innerHTML = "";
    // on fait un xml httprequest -> envoie une demande à un webservice
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        // quand on reçois une réponse "fini" du notre requete
        if (xhr.readyState == XMLHttpRequest.DONE) {
            myExercices = JSON.parse(xhr.responseText);
            console.log(myExercices);
            load_Theme();
        }
    }
    //ici  l'adresse url du web service
    xhr.open('POST', 'http://141.94.223.96/Vincent/MasterClasse/php/webservice/ws_read_exercice.php', true);
    // toujours la même chose
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
     //je definie que j'attend du json en retour de la requet http
     xhr.setRequestHeader('Accept', 'application/json');
     //je definie le token d'authorisation de la requet http
     xhr.setRequestHeader('Authorization','Bearer ' +getCookie('jwt'));
     // on oublie pas d'envoyer les paramètres sous forme de chaine de caractères et non du json
    xhr.send();
}

//fonction pour afficher les themes //
function load_Theme() {
    // on fait un xml httprequest -> envoie une demande à un webservice
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        // quand on reçois une réponse "fini" du notre requete
        if (xhr.readyState == XMLHttpRequest.DONE) {
            myThemes = JSON.parse(xhr.responseText);
            console.log(myThemes);
            tableau_exercice_stagiaire();
        }
    }
    //ici  l'adresse url du web service
    xhr.open('POST', 'http://141.94.223.96/Vincent/MasterClasse/php/webservice/ws_read_theme.php', true);
    // toujours la même chose
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // on oublie pas d'envoyer les paramètres sous forme de chaine de caractères et non du json
     //je definie que j'attend du json en retour de la requet http
     xhr.setRequestHeader('Accept', 'application/json');
     //je definie le token d'authorisation de la requet http
     xhr.setRequestHeader('Authorization','Bearer ' +getCookie('jwt'));
     // on oublie pas d'envoyer les paramètres sous forme de chaine de caractères et non du json
    xhr.send();
}

//fonction globale pour fabriquer un element html,lui appliquer du css et l'afficher //
function ultimateHTMLGenerator(typeElement, contenu, tableauClassCss, destinationElement) {
    var ultimateElement = document.createElement(typeElement);
    ultimateElement.textContent = contenu;
    for (var i = 0; i < tableauClassCss.length; i++) {
        ultimateElement.classList.add(tableauClassCss[i]);
    }
    // on fait apparaitre l'element dans celui passé en 4ème paramètre
    destinationElement.appendChild(ultimateElement);
    return ultimateElement;
}


//___________________________________________WEBSERVICE POUR LIRE LES EXERCICES_______________________________
function ReadExerciceStagiaire(id) {
     // on vide la liste des exercice et l'exercice
    container.innerHTML = "";
    cont.innerHTML = "";
    // on fait un xml httprequest -> envoie une demande à un webservice
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        // quand on reçois une réponse "fini" du notre requete
        if (xhr.readyState == XMLHttpRequest.DONE) {
            myExercice = JSON.parse(xhr.responseText);
            //verification si je reçois bien mon webService //
            console.log(myExercice);
            //appelle la fonction "retrieveExercice" et lui passe la variable id//
            retrieveExercice(id);
            //appelle la fonction 
            ReadTheme(function(myXHR) {
                myThemes = JSON.parse(myXHR.responseText);
                //verification si je reçois bien mon webService //
                console.log(myThemes);
                Retrieve_Id_Themes(myIdTheme);
                myBlock();
            });
        }
    }
    //ici  l'adresse url du web service
    xhr.open('POST', 'http://141.94.223.96/Vincent/MasterClasse/php/webservice/ws_read_exercice.php', true);
    // toujours la même chose
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //je definie que j'attend du json en retour de la requet http
    xhr.setRequestHeader('Accept', 'application/json');
    //je definie le token d'authorisation de la requet http
    xhr.setRequestHeader('Authorization','Bearer ' +getCookie('jwt'));
    // on oublie pas d'envoyer les paramètres sous forme de chaine de caractères et non du json
    console.log(getCookie('jwt'));
    xhr.send();
}

//fonction appelé a la reponse du serveur //
function ReadTheme(functioncallback) {
    // on fait un xml httprequest -> envoie une demande à un webservice
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        // quand on reçois une réponse "fini" du notre requete
        if (xhr.readyState == XMLHttpRequest.DONE) {
            functioncallback(xhr);

        }
    }
    //ici  l'adresse url du web service
    xhr.open('POST', 'http://141.94.223.96/Vincent/MasterClasse/php/webservice/ws_read_theme.php', true);
    // toujours la même chose
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // on oublie pas d'envoyer les paramètres sous forme de chaine de caractères et non du json
     //je definie que j'attend du json en retour de la requet http
     xhr.setRequestHeader('Accept', 'application/json');
     //je definie le token d'authorisation de la requet http
     xhr.setRequestHeader('Authorization','Bearer ' +getCookie('jwt'));
     // on oublie pas d'envoyer les paramètres sous forme de chaine de caractères et non du json
    xhr.send();
}


//fonction pour retrouver l'Id de l'exercice correspondant, passer en parametre dans la fonction gotoExercice -> "main.js"//
function retrieveExercice(idExercice) {
    // on vide la liste de réponse, pour permettre d'avoir les nouvelles réponses
    myAnswer = [];
    for (let y = 0; y < myExercice.Exercice.length; y++) {
        //Si l'idExercice transmis est identique à celui d'un exercice du tableau Exercice : //
        if (myExercice.Exercice[y]._ID == idExercice) {
            //alors je créer une variable pour mettre les elements dont j'ai besoin //
            myTitle = myExercice.Exercice[y]._NOM;
            myIdTheme = myExercice.Exercice[y]._ID_THEME;
            instructions = myExercice.Exercice[y]._CONSIGNE;
            myLevel = myExercice.Exercice[y]._NIVEAU;
            tableAnswers = myExercice.Exercice[y]._REPONSES;
            correctAnswers = myExercice.Exercice[y]._REPONSEATTENDU;
        }
    }
    //pour tous les elements du tableau REPONSES, je selectionne toutes les descriptions //
    for (let x = 0; x < tableAnswers.length; x++) {
        myAnswer.push(tableAnswers[x]._DESCRIPTION);
    }

    //Envoie dans le tableau myAnswer le tableau de reponse //
    myAnswer.push(correctAnswers);
    //chnage rl'ordre d'apparition des bonnes reponses //
    const array1= myAnswer
    const reversed = array1.reverse();
    console.log(reversed);

}


//retrouve le theme en fonction de l'exercice en cours //
function Retrieve_Id_Themes(myIdTheme) {
    for (let i = 0; i < myThemes.theme.length; i++) {
        //Si l'idExercice transmis est identique à celui d'un exercice du tableau Exercice : //
        if (myThemes.theme[i]._ID == myIdTheme) {
            //je créer une variable pour mettre les elements dont j'ai besoin //
            myThemeString = myThemes.theme[i]._NOM;
            break;
        }
    }
}



//J'utilise une fonction pour afficher mon block contenant l'exercice.
function myBlock(){
    container.innerHTML = "";
    //Je créer une ligne qui contiendra tout mon exercice
    let whiteBlock = ultimateHTMLGenerator("div","",["row","bg-light"],container);
    whiteBlock.id="blockBlanc";
    //Mon block exercice est composé d'un titre de niveau 4
    let TitleExercice = ultimateHTMLGenerator("h4",myTitle,[],whiteBlock);
    TitleExercice.id="TitleExercice";
    //Des colonnes et lignes pour y mettre mes contenus (paragraphe, theme, consigne)//
    let columExercice=ultimateHTMLGenerator("div","",["col-12"],whiteBlock);
    let LineInstructions =ultimateHTMLGenerator("div","",["row"],columExercice);
    LineInstructions.id="LineInstructions";
    //creation de paragraphe pour mettre le theme et le niveau de l'exercice //
    let paragraph1_theme_level =ultimateHTMLGenerator("p","THEME : " +myThemeString+"\n"+"NIVEAU : "+ myLevel,["text-light","d-flex","justify-content-center"],LineInstructions);
    let paragrap2_instructions =ultimateHTMLGenerator("p",instructions,["text-light"],LineInstructions);

    let ColumExercice=ultimateHTMLGenerator("div","",["col-12"],whiteBlock);
    ColumExercice.id="ColumExercice";

    //Culum of button //
    ColumButton=ultimateHTMLGenerator("div","",["col-6"],whiteBlock);
    ColumButton.id="ColumButton";
    //I create a button for go to the next exercice //
    let NextButton=ultimateHTMLGenerator("button","Exercice suivant",["btn"],ColumButton);
    NextButton.id="NextButton1";
    NextButton.onclick = function() {
 // TODO COMPRENDRE
        retrieveExercice(myExercice.Exercice[indexExoEnCours+1]._ID);
        indexExoEnCours++;
        //--> affiche l'exercice
        ReadTheme(function(myXHR) {
            myThemes = JSON.parse(myXHR.responseText);
            //verification si je reçois bien mon webService //
            Retrieve_Id_Themes(myIdTheme);
            myBlock();
        });
    }

    //Colum of Congratulation //
    let ColumCongratulation=ultimateHTMLGenerator("div","",["col-6"],whiteBlock);
    //Create a picture for good answer ! //
    Pics=ultimateHTMLGenerator("img","",[],ColumCongratulation);
    Pics.src="../image/goodjob.jfif";
    Pics.id="Picsgoodjob";

    //create a paragraph for the correction //
    let ParaCorrection=ultimateHTMLGenerator("p","La réponse attendue était :"+"\n"+correctAnswers,[],whiteBlock);
    ParaCorrection.id="ID_ParaCorrection";

 //J'utilise une boucle for pour y faire apparaitre les proposition de réponse
    for(j=0; j<myAnswer.length;j++){
    //create a inputGroup 
    let inputGroup =ultimateHTMLGenerator("div","",["form-check"],ColumExercice);

    //Create a input type checkbox //
    let InputCheckbox =ultimateHTMLGenerator("input","",["form-check-input", "mt-0"],inputGroup);
    InputCheckbox.type = "checkbox";

    //create a id for the checkbox //
    InputCheckbox.id = j+"checkboxId";
    // on ajoute le même nom pour chaque balise input --> pour toutes les récups plus tard
    InputCheckbox.name = "checkboxId";
    InputCheckbox.addEventListener("click", function(){verificator(InputCheckbox.id,LabelCheckbox.id)});

    //create a id for the Label //
    let LabelCheckbox =ultimateHTMLGenerator("label",myAnswer[j],["form-check-label"],inputGroup);
    LabelCheckbox.id = j+"LabelId";
    }
}


//fonction qui verifie si l'on as la bonne réponse ou non // 
function verificator (checkboxId,LabelId){
    // on selectionne toutes balises avec le name "checkboxId"
    // https://stackoverflow.com/questions/386281/how-to-implement-select-all-check-box-in-html
    checkboxes = document.getElementsByName('checkboxId');
    // pour chaque element trouvé, on disabled (désactive) la checkbox
    for(var i=0, n=checkboxes.length;i<n;i++) {
      checkboxes[i].disabled = true;
    }

    //si cette ligne est cochée //
    if (document.getElementById(checkboxId).checked === true && document.getElementById(LabelId).textContent == correctAnswers)  {
    //verification dans la console de la recuperation que ce sont bien les memes id //
    console.log(checkboxId,LabelId);
   //afficher good-job // 
    document.getElementById("Picsgoodjob").style.visibility ="visible";
    document.getElementById("ColumButton").style.visibility ="visible";

}
    //Sinon affiche la REPONSE ATTENDU //
    else(document.getElementById("ID_ParaCorrection").style.visibility ="visible");
    document.getElementById("ColumButton").style.visibility ="visible";
}

function connexion(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState==XMLHttpRequest.DONE){
            console.log(xhr.responseText)
            if (xhr.responseText!= 0){
                setCookie("jwt",xhr.responseText,1);
                window.location.href = "../html/espace_stagiaire.html";
            }else{alert("mauvais login mot de pass")}
        }
    }
    xhr.open("POST","http://141.94.223.96/Vincent/MasterClasse/php/webservice/ws_connexion.php",true);
    
    /*l'entete de htpp j'envoi les donnés a l'url*/
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    xhr.send("mail="+document.getElementById("email").value+"&mdp="+document.getElementById("mdp").value);
}


//COOKIE
//_________________________________________________________________________
// Fonction permettant de remplir un cookie, 
// source https://stackoverflow.com/questions/14573223/set-cookie-and-get-cookie-with-javascript
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

//_________________________________________________________________________
// Fonction permettant de récupérer un cookie par son nom
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

//_________________________________________________________________________
// Fonction permettant de supprimer un cookie
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
