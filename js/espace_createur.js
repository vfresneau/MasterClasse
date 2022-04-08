//_______________________________________DECLARATION DES VARIABLE DONT NOUS AURONT BESOIN ______________________________________________
let myExercices = {};
let myThemes;
let compteurInput = 1;
let compteurInputReponse = 1;
let compteurInputReponse_Create = 1;
let myExercice = {};
let tableAnswers = [];
let myAnswer = [];
let myIdTheme;
let myThemeString;
let indexExoEnCours = 0;

//Element HTML qui récupère la balise <div class="container-fluid" id="myContainerCreateExercice">
let myContainer = document.getElementById("myContainerCreateExercice");

//_____________________________________FONCTIONS POUR L'AFFICHAGE DU TABLEAU D'EXERCICE____________________________

//Au click sur le bouton EXERCICE la fonction load_Exercice est executé.
//Cette fonction vide le contenu de la page, elle laisse apparaître un bouton CREER,
//et grâce à la requete AJAX nous affichons le tableau d'exercice.
function load_Exercice() {
    document.getElementById("myContainerCreateExercice").innerHTML = "";
    let rowButtonCreate = ultimateHTMLGenerator("div", "", ["row"], myContainer);
    rowButtonCreate.id="rowButtonCreate";
    let buttonCreate = ultimateHTMLGenerator("button", "Créer", ["btn"], rowButtonCreate);
    buttonCreate.id = "buttonCreate";
    buttonCreate.onclick = function () {
        document.getElementById("myContainerCreateExercice").innerHTML = "";
        displayCreationFields(false);
    };

    //Fabrication d'une nouvelle instance de Class et d'une requete Http à envoyer
    var xhr = new XMLHttpRequest();
    //Lancement de la fonction anonyme à chaque changement d'état de la requete http
    xhr.onreadystatechange = function () {
        //Seulement quand l'état de la requete est DONE 
        if (xhr.readyState == XMLHttpRequest.DONE) {
            //Ici on parse (transformation de la response envoyé par le serveur en JSON)
            myExercices = JSON.parse(xhr.responseText);
            //Verification grâce à un consol.log()
            console.log(myExercices);
            //Appel de la fonction ReadTheme à laquelle on passe la fonction tableau_exercice_stagiaire
            ReadTheme(tableau_exercice_stagiaire);
        }
    }
    //POST= methode utilisée par le protocole http, adresse du web service utilisé, ma requete est asynchrone
    xhr.open('POST', 'http://141.94.223.96/Chloe/MasterClasse/php/webservice/ws_read_exercice.php', true);
    //ecrire dans l'entete de la requete http, la facon dont vont etre envoyés les parametres de la requete
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //On attend du JSON en retour de la requet http
    xhr.setRequestHeader('Accept', 'application/json');
    //On definie le token d'authorisation de la requet http
    xhr.setRequestHeader('Authorization', 'Bearer ' + getCookie('jwt'));
    //Envois des paramètres sous forme de chaine de caractères et non du JSON (ici nous n'envoyons rien)
    xhr.send();
}

//Cette fonction va nous permettre d'afficher notre tableau d'exercices
function tableau_exercice_stagiaire() {

    let TableExercice = ultimateHTMLGenerator("table", "", ["table", "table-hover", "autorisation", "my-auto", "text-center", "mx-auto", "table-responsive-md"], myContainer);
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

    for (let i = 0; i < myExercices.Exercice.length; i++) {
        let rowTable = ultimateHTMLGenerator("tr", "", [], bodyTable);
        rowTable.addEventListener("click", function () {
            // Je stocke l'index qui est en cours d'affichage
            indexExoEnCours = i;
            //J'appel la fonction ReadExerciceCreateur et on lui passe en parametre l'id à fabriquer
            ReadExerciceCreateur(myExercices.Exercice[i]._ID);
        })

        let valueColum1 = ultimateHTMLGenerator("td", myExercices.Exercice[i]._NOM, [], rowTable);
        valueColum1.classList = "table-secondary";
        let valueColum2 = ultimateHTMLGenerator("td", myExercices.Exercice[i]._NIVEAU, [], rowTable);
        valueColum2.classList = "table-dark";
        let myThemes = findTheme(myExercices.Exercice[i]._ID_THEME);
        let valueColum3 = ultimateHTMLGenerator("td", myThemes, [], rowTable);
        valueColum3.classList = "table-secondary";
    }
}

//Cette fonction récupère le nom du thème selon l'ID de l'exercice qui correspond à un thème
function findTheme(id) {
    for (let y = 0; y < myThemes.theme.length; y++) {
        if (myThemes.theme[y]._ID == id) {
            return myThemes.theme[y]._NOM;
        }
    }
}

//_____________________________________FONCTIONS PERMETTANT L'AFFICHAGE DES CHAMPS ET LA CREATION D'EXERCICES_______________________________________________________

//Fonction qui me permet d'afficher des champs vide afin de créer un exercice 
function ReadTheme(maFonctionAAppeler) {
    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            myThemes = JSON.parse(xhr.responseText);
            console.log(myThemes);
            maFonctionAAppeler();
        }
    }
    xhr.open('POST', 'http://141.94.223.96/Chloe/MasterClasse/php/webservice/ws_read_theme.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + getCookie('jwt'));
    xhr.send();
}

//Cette fonction va créer l'exercice: 
//on lui passe tous les parametres que l'on veux envoyer à notre web service ws_create_exercice.
function creationExercice(nom, consigne, reponseattendu, niveau, lien, theme) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            // Si la réponse n'est pas un nombre on ne fait rien
            if (isNaN(xhr.responseText)) {
                //Si jamais la requette à planté et qu'elle renvoi "erreur404" ce n'est pas un nombre mais une chaine de caractere
            }
            //Si non si c'est un nombre 
            else {
                for (let i = 1; i <= compteurInput; i++) {
                    //On recupère la valeur des inputs tapé par l'utilisateur 
                    let descri = document.getElementById("REPONSE" + "_DESCRIPTION" + i).value;
                    //Et on passe en paramettre de la fonction createReponse(), la variable descri + l'id de l'exercice 
                    //(ici le xhrresponseText renvois vers le web service displayCreation et donc récupère l'id de l'exercicé créer)
                    createReponse(descri, xhr.responseText);
                }
            }
        }
    }
    xhr.open('POST', 'http://141.94.223.96/Chloe/MasterClasse/php/webservice/ws_create_exercice.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + getCookie('jwt'));
    xhr.send("nom=" + nom
        + "&consigne=" + consigne
        + "&reponseAttendu=" + reponseattendu
        + "&niveau=" + niveau
        + "&lien=" + lien
        + "&id_theme=" + theme
        + "&valide=" + 0);
}

//Cette fonction est une requete AJAX, elle créer et envoi les nouvelles propositions de réponses lié à l'id d'un exercice
//Elle à pour paramettre la description de la proposition de réponse et l'id correspondant à l'exercice
function createReponse(descri, id_exo) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
        }
    }
    xhr.open('POST', 'http://141.94.223.96/Chloe/MasterClasse/php/webservice/ws_create_reponse.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + getCookie('jwt'));
    xhr.send("description=" + descri
    + "&id_exercice=" + id_exo);
}

//______________________________FONCTION PERMETTANT L'AFFICHAGE DES CHAMPS REMPLIS POUR UPDATE DELETE___________________________

//Cette fonction va vider notre container et laisser place aux champs remplis
// avec les information (nom, consigne, reponse attendu, theme, niveau, lien, propositions de réponse)
function ReadExerciceCreateur(id) {
    //Le container qui a pour id myContainerCreateExercice se vide et laisse place au champs et selecteur replis
    //ceux-ci s'affichant grâce à la fonction displayCreationFields qui est appelé dans cette la fonction.
    document.getElementById("myContainerCreateExercice").innerHTML = "";
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            myExercice = JSON.parse(xhr.responseText);
            //Appel de la fonction retrieveExercice() en lui passant id (d'exercice) 
            //en paramettre puisque l'on veut récupérer l'id de l'exercice selectionné (id en cours)
            retrieveExercice(id);
            //Appelle de la fonction displeyFields() à laquelle on passe la paramettre true
            displayCreationFields(true);
        }
    }
    xhr.open('POST', 'http://141.94.223.96/Chloe/MasterClasse/php/webservice/ws_read_exercice.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + getCookie('jwt'));
    xhr.send();
}

//Cette fonction permet de retrouver l'Id de l'exercice correspondant, passer en parametre dans la fonction ReadExerciceCreateur
//et de remplir les champs avec les informations correspondants à l'id de l'exercice en cours (exercice selectionné)
function retrieveExercice(idExercice) {
    
    myAnswer = [];
    for (let y = 0; y < myExercice.Exercice.length; y++) {
        //Si l'idExercice transmis (parametre) est identique à l'id d'un exercice du tableau EXERCICE
        if (myExercice.Exercice[y]._ID == idExercice) {
            //Alors je créer une variable pour mettre les informations dont j'ai besoin
            myTitle = myExercice.Exercice[y]._NOM;
            myIdTheme = myExercice.Exercice[y]._ID_THEME;
            instructions = myExercice.Exercice[y]._CONSIGNE;
            myLevel = myExercice.Exercice[y]._NIVEAU;
            tableAnswers = myExercice.Exercice[y]._REPONSES;
            correctAnswers = myExercice.Exercice[y]._REPONSEATTENDU;
            myLink = myExercice.Exercice[y]._LIEN;
        }
    }
    //Pour tous les elements du tableau REPONSES
    for (let x = 0; x < tableAnswers.length; x++) {
        //J'envois ma description en cours dans mon tableau de réponse
        myAnswer.push(tableAnswers[x]._DESCRIPTION);
    }

    //Envoie dans le tableau myAnswer le tableau de réponses
    myAnswer.push(correctAnswers);
}


//Cette fonction à deux modes (d'ou le esle et le if)
//Elle utilise la même structure pour les deux modes, seul la valeur des champs changent selon le mode
//En mode creation les champs sont vide afin de pouvoir les remplir
//Et pour modifier/supprimer les champs sont remplis avec les informations de l'exercice selectionné
function displayCreationFields(modeCreation) {

    //Creation de ma ligne qui va contenir les input, select et label
    let rowSelect = ultimateHTMLGenerator("div", "", ["row"], myContainer);
    rowSelect.id="rowSelect";

    let columnLabelTitle=ultimateHTMLGenerator("div", "", ["col","text-end"], rowSelect);
    let columnInputTtitle=ultimateHTMLGenerator("div", "", ["col"], rowSelect);

    //Creation d'un label pour le titre de l'exerccice
    let labelTitle = ultimateHTMLGenerator("label", "NOM EXERCICE :", ["text-end","fw-bold","fs-6","bg-secondary"],columnLabelTitle);
    //Creation d'un input en rapport avec le label du titre de l'exercice
    let inputTitle = ultimateHTMLGenerator("input", "", [], columnInputTtitle);
    //L'input est de type text
    inputTitle.type = "text";
    //La valeur contenu dans l'input est myTtitle
    if (modeCreation) { inputTitle.value = myTitle };
    //Le créer un id à mon input
    inputTitle.id = "EXERCICE" + "_NOM";

    let columnLabelTheme=ultimateHTMLGenerator("div", "", ["col","text-end"], rowSelect);
    let columnInputTheme=ultimateHTMLGenerator("div", "", ["col"], rowSelect);

    //Creation d'un label pour le theme de l'exercice
    let labelTheme = ultimateHTMLGenerator("label", "THEME :", ["fw-bold","fs-6","bg-secondary"], columnLabelTheme);
    //Creation de mon selecteur de theme pour afficher le theme en cours de l'exercice selectionné
    let selectTheme = ultimateHTMLGenerator("select", "", [], columnInputTheme);
    //Pour cela j'utilise une boucle for pour parcourir mes themes
    for (c = 0; c < myThemes.theme.length; c++) {
        //Cela créer le bon nombre d'option avec l'id theme pour pouvoir choisir un theme dans le selecteur
        let optionsTheme = ultimateHTMLGenerator("option", myThemes.theme[c]._NOM, [], selectTheme);
        optionsTheme.value = myThemes.theme[c]._ID;

    }
    if (modeCreation) {
        //Ici dans le selecteur s'affiche le theme correspondant à l'exercice selectionné dans le tableau
        selectTheme.value = myIdTheme;
        //J'attribu un id à mon selcteur 
        selectTheme.id = "selectTheme";
    }

    let columnLabelLevel=ultimateHTMLGenerator("div", "", ["col","text-end"], rowSelect);
    let columnInputLevel=ultimateHTMLGenerator("div", "", ["col"], rowSelect);

    //Creation d'un label pour le niveau de l'exercice
    let labelLevel = ultimateHTMLGenerator("label", "NIVEAU :", ["fw-bold","fs-6","bg-secondary"], columnLabelLevel);
    //Creation d'un input en rapport avec le label du niveau de l'exercice
    let inputLevel = ultimateHTMLGenerator("input", "", [], columnInputLevel);
    //Linput est de type number
    inputLevel.type = "number";
    //La valeur à l'interieur de mon input est myLevel
    if (modeCreation) { inputLevel.value = myLevel; }
    //J'attribu un id à mon input 
    inputLevel.id = "EXERCICE" + "_NIVEAU";

    let columnLabelLink=ultimateHTMLGenerator("div", "", ["col","text-end"], rowSelect);
    let columnInputLink=ultimateHTMLGenerator("div", "", ["col"], rowSelect);

    //Creation d'un label pour le lien de mon exercice
    let labelLink = ultimateHTMLGenerator("label", "LIEN :", ["fw-bold","fs-6","bg-secondary"], columnLabelLink);
    //Creation de l'input en rapport avec le label lien de l'exercice
    let inputLink = ultimateHTMLGenerator("input", "", [], columnInputLink);
    //L'input est de type url (adresse)
    inputLink.type = "url";
    //La valeur à l'interieur de mon input est myLink
    if (modeCreation) { inputLink.value = myLink; }
    //J'attribu un id à mon input
    inputLink.id = "EXERCICE" + "_LIEN";

    //Creation d'une ligne contenant 3 colonnes
    let rowLabel = ultimateHTMLGenerator("div", "", ["row"], myContainer);
    rowLabel.id="rowLabel";
    //Colonne dans la ligne contenant le label de consigne de l'exercice
    let columnLabel1 = ultimateHTMLGenerator("div", "", ["col-4","text-left"], rowLabel);
    let labelOrder = ultimateHTMLGenerator("label", "ENONCE EXERCICE :", ["fs-6","fw-bold","bg-secondary"], columnLabel1);

    //Colonne dans la ligne contenant le label de la réponse attendu
    let columnLabel2 = ultimateHTMLGenerator("div", "", ["col-4","text-left"], rowLabel);
    let labelExpectedResponse = ultimateHTMLGenerator("label", "REPONSE ATTENDU :", ["fs-6","fw-bold","bg-secondary"], columnLabel2);

    //Colonne dans la ligne contenant le label de proposition de réponse
    let columnLabel3 = ultimateHTMLGenerator("div", "", ["col-4","text-left"], rowLabel);
    let labelSuggestion = ultimateHTMLGenerator("label", "PROPOSITIONS REPONSES :", ["fs-6","fw-bold","bg-secondary"], columnLabel3);

    //Creation d'une ligne qui va contenir les champs (input/textarea)
    let rowInputFields = ultimateHTMLGenerator("div", "", ["row"], myContainer);
    rowInputFields.id="rowInputFields";

    //Colonne contenant l'input de la consigne
    let columnInput1 = ultimateHTMLGenerator("div", "", ["col-4"], rowInputFields);
    let inputOrder;
    if (modeCreation) {
        inputOrder = ultimateHTMLGenerator("textarea", instructions, [], columnInput1);

    } else {
        inputOrder = ultimateHTMLGenerator("textarea", "", [], columnInput1);

    }
    //J'attribu un id à mon input de consigne
    inputOrder.id = "EXERCICE" + "_CONSIGNE";

    //Colonne contenant l'input de la reponse attendu
    let columnInput2 = ultimateHTMLGenerator("div", "", ["col-4"], rowInputFields);
    let inputExpectedResponse;
    if (modeCreation) {
        inputExpectedResponse = ultimateHTMLGenerator("textarea", correctAnswers, [], columnInput2);

    } else {
        inputExpectedResponse = ultimateHTMLGenerator("textarea", "", [], columnInput2);
    }
    //J'attribu un id à mon input de reponse attendu
    inputExpectedResponse.id = "EXERCICE" + "_REPONSEATTENDU";

    //Colonne contenant le bouton d'ajout et l'input de propositions de réponses
    let columnInput3 = ultimateHTMLGenerator("div", "", ["col-4"], rowInputFields);
    let addButton;
    if (modeCreation) {
        addButton = ultimateHTMLGenerator("button", "+", ["btn", "btn-success", "d-none"], columnInput3);

    } else {
        addButton = ultimateHTMLGenerator("button", "+", ["col", "btn", "btn-success"], columnInput3);
        let inputSuggestion1 = ultimateHTMLGenerator("input", "", [], columnInput3);
        //Creation de l'id qui va pouvoir permettre de recuperer la valeur tapé par l'utilisateur
        inputSuggestion1.id = "REPONSE" + "_DESCRIPTION" + 1;
    }

    if (modeCreation) {
        addButton.onclick = function () {
            let inputSuggestion1 = ultimateHTMLGenerator("input", "", [], columnInput3);
            //J'attribu un id à mon input de proposition
            inputSuggestion1.id = "inputPropoRep_Create" + compteurInputReponse_Create;
            //J'agremente mon compteurInputReponse_Create de 1 en 1
            compteurInputReponse_Create++;
        };
    } else {
        //Ajout d'un evenement onclick au bouton 
        addButton.onclick = function () {
            //Variable déclaré précédement qui sert à créer un id unique lors de chaque creation d'input
            compteurInput++;
            let inputSuggestion1 = ultimateHTMLGenerator("input", "", [], columnInput3);
            inputSuggestion1.id = "REPONSE" + "_DESCRIPTION" + compteurInput;
        }
    }

    if (modeCreation) {
        //Creation d'une boucle for pour parcourir le longeur de mon tableau de réponse de l'exercice en cours
        for (j = 0; j < myExercices.Exercice[indexExoEnCours]._REPONSES.length; j++) {
            //Un input se créer
            let inputSuggestion1 = ultimateHTMLGenerator("input", "", [], columnInput3);
            //Il a pour id unique inputPropoRep accompagné de 1, 2, 3 ou 4... qui correspond au compteur
            inputSuggestion1.id = "inputPropoRep" + compteurInputReponse;
            //Alors la valeur de mon input correspond à la description dans la table réponse, de mon exercice en cours
            inputSuggestion1.value = myExercices.Exercice[indexExoEnCours]._REPONSES[j]._DESCRIPTION;
            //J'agremente mon compteurInputReponse de 1 en 1 pour avoir un id unique pour chaque input
            compteurInputReponse++;
        }

        //Creation d'une ligne contenant les boutons update et delete dans deux colonnes
        let rowButtonUD = ultimateHTMLGenerator("div", "", ["row"], myContainer);
        //J'attribu un id à mon bouton
        rowButtonUD.id = "rowButtonUD";

        //1ere colonne
        let column1ButtonUD = ultimateHTMLGenerator("div", "", ["col-6"], rowButtonUD);
        //Bouton update
        let buttonUpdate = ultimateHTMLGenerator("button", "Modifier", ["btn", "btn-warning"], column1ButtonUD);
        buttonUpdate.id = "buttonUpdate";
        //Au click sur le bouton update, la fonction displayCreationButtons est appelé
        buttonUpdate.onclick = function () {
            addButton.classList.remove("d-none");
            displayCreationButtons(myExercices.Exercice[indexExoEnCours]._ID);
        }

        //2eme colonne
        let column2ButtonUD = ultimateHTMLGenerator("div", "", ["col-6"], rowButtonUD);
        //Bouton delete
        let buttonDelete = ultimateHTMLGenerator("button", "Supprimer", ["btn", "btn-danger"], column2ButtonUD);
        buttonDelete.id = "buttonDelete";
        //Au click sur le bouton delete intervient la partie du CRUD Delete
        buttonDelete.onclick = function () { 
            deleteExercice(myExercices.Exercice[indexExoEnCours]._ID); 
            /*document.getElementById("myContainerCreateExercice").innerHTML = "";
            tableau_exercice_stagiaire();*/
        }
    } else {
        //Creation d'une ligne contenant le bouton Valider
        let rowButtonV = ultimateHTMLGenerator("div", "", ["row"], myContainer);
        let buttonValidate = ultimateHTMLGenerator("button", "Valider", ["btn", "btn-success"], rowButtonV);
        //Creation d'un id pour le bouton
        buttonValidate.id = "buttonValidate";
        //Liaison du bouton à l'evenement onclick qui appel la fonction creationExercice
        // on lui passe en paramettre la valeur des id de chaque input ainsi que la valeur du selecteur
        buttonValidate.onclick = function () {
            creationExercice(
                document.getElementById("EXERCICE" + "_NOM").value,
                document.getElementById("EXERCICE" + "_CONSIGNE").value,
                document.getElementById("EXERCICE" + "_REPONSEATTENDU").value,
                document.getElementById("EXERCICE" + "_NIVEAU").value,
                document.getElementById("EXERCICE" + "_LIEN").value,
                selectTheme.value
            );
            /*document.getElementById("myContainerCreateExercice").innerHTML = "";
            tableau_exercice_stagiaire();*/

        };
    }

}

//Cette fonction vide la ligne ou se trouve les boutons Update Delete et laisse apparaitre le bouton Valider
//Au click sur Valider la fonction updateExercice() est appelé.
function displayCreationButtons(idExercice) {
    document.getElementById("rowButtonUD").innerHTML = "";
    let buttonValidate = ultimateHTMLGenerator("button", "Valider", ["btn", "btn-success"], rowButtonUD);
    buttonValidate.id = "buttonValidate";

    //Au click sur le bouton Valider intervient la partie du CRUD Update
    //Je passe en paramettre de la fonction toutes les valeurs dont je vais avoir besoin  
    buttonValidate.onclick = function () {
        updateExercice(
            idExercice,
            document.getElementById("EXERCICE" + "_NOM").value,
            document.getElementById("EXERCICE" + "_CONSIGNE").value,
            document.getElementById("EXERCICE" + "_REPONSEATTENDU").value,
            document.getElementById("EXERCICE" + "_NIVEAU").value,
            document.getElementById("EXERCICE" + "_LIEN").value,
            document.getElementById("selectTheme").value);
            /*document.getElementById("myContainerCreateExercice").innerHTML = "";
            tableau_exercice_stagiaire();*/

    };
}
//_______________________________________________METRE A JOUR_______________________________________________
//Cette fonction va mettre à jour l'exercice, les propositions de réponse et en ajouter si c'est ce qui a été fait
function updateExercice(id, nom, consigne, reponseattendu, niveau, lien, theme) {
    console.log(consigne);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.responseText) {
            }
        }
    }
    xhr.open('POST', 'http://141.94.223.96/Chloe/MasterClasse/php/webservice/ws_update_exercice.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + getCookie('jwt'));
    xhr.send("id=" + id
        + "&nom=" + nom
        + "&consigne=" + consigne
        + "&reponseAttendu=" + reponseattendu
        + "&niveau=" + niveau
        + "&lien=" + lien
        + "&id_theme=" + theme
        + "&valide=" + 0);

    //Creation d'une boucle for qui nous permet de parcourrir l'ensemble des input de propositions de reponses à créer,
    //de récupérer leur valeur et l'id de l'exercice correspondant 
    //afin de créer de nouvelles propositions de grace au web service update_reponse (en + de celles déjà enregistrées)
    for (let i = 1; i < compteurInputReponse_Create; i++) {
        //A chaque fois j'appel la fonction createReponse() en lui passant
        //la valeur de l'id de la proposition de réponse + i et l'id de l'exercice
        createReponse(document.getElementById("inputPropoRep_Create" + i).value, id);
    }
    //Creation d'une boucle for qui nous permet de parcourrir l'ensemble des input de propositions de reponses,
    //et de récupérer leur valeur et l'id de l'exercice correspondant
    //afin de les mettre à jour grace au web service update_reponse
    //et de créer les propositions précédement créer
    for (let i = 1; i < compteurInputReponse; i++) {
        //A chaque fois je créer un nouvel id de réponse pour les nouvelles propositions
        let idReponse = myExercices.Exercice[indexExoEnCours]._REPONSES[i - 1]._ID;
        //Et j'appel la fonction updateReponse à laquelle je passe l'idReponse, 
        //la valeur de l'id inputPropoRep (input de proposition de reponse) +i et l'id de l'exercice
        updateReponse(idReponse, document.getElementById("inputPropoRep" + i).value, id);
    }
}
//_____________________________________________________MISE A JOUR REPONSE
//Cette fonction met à jour les réponses grâce au webservice ws_update_reponse, 
//je lui passe 3 paramettre (idReponse, description, idExercice)
function updateReponse(idReponse, description, idExercice) {
    //On fait un xmlHttprequest -> envoie une demande à un webservice
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        //Quand on reçois une réponse "fini" de notre requete
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.responseText) {
            }
        }
    }
    xhr.open('POST', 'http://141.94.223.96/Chloe/MasterClasse/php/webservice/ws_update_reponse.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + getCookie('jwt'));
    xhr.send("id=" + idReponse
        + "&description=" + description
        + "&id_exercice=" + idExercice
    );
}

//_____________________________________________________________SUPPRIMER______________________________________________________
//Cette fonction permet de supprimer l'id de notre exercice selectionné (id en cours)
//et donc de supprimer tout le contenu de l'exercice
function deleteExercice(IdExoEnCours) {
    console.log(IdExoEnCours);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
        }
    }
    xhr.open('POST', 'http://141.94.223.96/Chloe/MasterClasse/php/webservice/ws_delete_exercice.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + getCookie('jwt'));
    xhr.send("id=" + IdExoEnCours);
}

//__________________________________________________HTML Element Generator generic function_______________________________________

//FAIRE UN COPIER COLLER DE CE QUE L'ON A INSCRIT DANS L'AUTRE FONCTION EN ESPACE STAGIAIRE
function ultimateHTMLGenerator(typeElement, contenu, tableauClassCss, destinationElement) {  //on créer un élement html donné en paramètre (1er paramètre)                      

    let ultimateElement = document.createElement(typeElement); //on attribut du contenu (paramètre 2) à l'element html précedement fabriqué                                                   
    ultimateElement.textContent = contenu;                    //on souhaite ajouter plusieurs class CSS à l'element html précedement créé

    for (let i = 0; i < tableauClassCss.length; i++) {             //on ajoute la class css contenu dans le tableau de class css (3ème paramètre)
        ultimateElement.classList.add(tableauClassCss[i]);  //on ajoute une classList à la variable ultimateElement
    }

    destinationElement.appendChild(ultimateElement);      //on fait apparaitre l'élement dans celui passé en 4ème paramètre
    return ultimateElement;
}



//______________________________________________LIEN VERS CONTACT (FOOTER)_________________________________
//Recupération de l'id du lien de contact pour y ajouter la fonction onclick afin d'afficher l'alerte de contact
let myLinkContact = document.getElementById("link_contact");
myLinkContact.onclick = function () { alert("Téléphone : 02.47.39.24.01" + "\n" + "Mail : formation.dev@mail.fr"); };


//_____________________________________________________COOKIE____________________________________________________________
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

//______________________________________________________________________________________________________________
//
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

//______________________________________________________________________________________________________________________
//
function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

//pour décoder le token sous quel forme ?
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};