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

//Element HTML qui récupère la balise <div class="container-fluid" id="myContainerCreateExercice"> de la page_espace_stagiaire
let myContainer = document.getElementById("myContainerCreateExercice");

//_____________________________________FONCTIONS POUR L'AFFICHAGE DU TABLEAU D'EXERCICE____________________________

//Au click sur le bouton EXERCICE la fonction load_Exercice est executé.
//Cette fonction vide le contenu de la page espace_stagiaire, et laisse apparaître un bouton CREER,
//à la requete AJAX nous affichons le tableau d'exercice.
function load_Exercice() {
    myContainer.innerHTML = "";
    let rowButtonCreate = ultimateHTMLGenerator("div", "", ["row"], myContainer);
    rowButtonCreate.id="rowButtonCreate";
    let buttonCreate = ultimateHTMLGenerator("button", "Créer", ["btn"], rowButtonCreate);
    buttonCreate.id = "buttonCreate";
    buttonCreate.onclick = function () {
        myContainer.innerHTML = "";
        //fonction qui choisit l'affichage de creation des données
        displayCreationFields(false);
    };
    //Fabrication d'une nouvelle instance de Class et d'une requete Http à envoyer
    var xhr = new XMLHttpRequest();
    //Lancement de la fonction anonyme à chaque changement d'état de la requete http
    xhr.onreadystatechange = function () {
        //Seulement quand l'état de la requete est DONE 
        if (xhr.readyState == XMLHttpRequest.DONE) {
            //on convertis le xhr.reponseText(la reponse du serveur) au format texte, en objet JSON
            myExercices = JSON.parse(xhr.responseText);
            //Verification grâce à un consol.log()
            console.log(myExercices);
            //Appel de la fonction ReadTheme à laquelle on passe la fonction tableauExerciceStagiaire
            ReadTheme(tableauExerciceStagiaire);
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
    //On envoie la requete
    xhr.send();
}

//Cette fonction va nous permettre d'afficher notre "tableau d'exercices", lorsque qu'au Menu createur, on choisira de clicker sur 'EXERCICE'
function tableauExerciceStagiaire() {

    //creation des elements du tableau :

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
            // Je stocke l'index qui est selectionné par l'utilisateur (selection d'une ligne)
            indexExoEnCours = i;
            //J'appel la fonction "ReadExerciceCreateur" en lui passant en parametre l'id selectionné
            ReadExerciceCreateur(myExercices.Exercice[i]._ID);
        })

        //j'hydrate mon tableau avec les données de cet exercice

        let valueColum1 = ultimateHTMLGenerator("td", myExercices.Exercice[i]._NOM, [], rowTable);
        valueColum1.classList = "table-secondary";
        let valueColum2 = ultimateHTMLGenerator("td", myExercices.Exercice[i]._NIVEAU, [], rowTable);
        valueColum2.classList = "table-dark";
        let myThemes = findTheme(myExercices.Exercice[i]._ID_THEME);
        let valueColum3 = ultimateHTMLGenerator("td", myThemes, [], rowTable);
        valueColum3.classList = "table-secondary";
    }
}

//Cette fonction récupère le nom du thème selon l'ID de l'exercice qui lui est lié
function findTheme(id) {
    for (let y = 0; y < myThemes.theme.length; y++) {
        if (myThemes.theme[y]._ID == id) {
            return myThemes.theme[y]._NOM;
        }
    }
}

//_____________________________________FONCTIONS PERMETTANT L'AFFICHAGE DES CHAMPS ET LA CREATION D'EXERCICES_______________________________________________________

//Fonction qui me permet d'afficher des champs vide afin de créer un exercice 
//
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
                //A la fin des 4 secondes la page se vide et la fonction load_Exercice se lance
                //Fonction qui affiche le tableau exercice et le rafraichis
                setTimeout(function(){
                    myContainer.innerHTML = "";
                    load_Exercice();
                }, 4000);
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

//Fonction pour créer de nouvelles proposition de réponses, en passant en parametres la description,et l'id de l'exercice
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

//______________________________FONCTION PERMETTANT L'AFFICHAGE DES CHAMPS REMPLIS POUR UPDATE___________________________

//Cette fonction va vider notre container et laisser place aux champs remplis
// (avec les informations : nom, consigne, reponse attendu, theme, niveau, lien, propositions de réponse)
function ReadExerciceCreateur(id) {
    //Le container se vide et laisse place au champs et selecteur remplis
    //ceux-ci s'affichant grâce à la fonction displayCreationFields qui est appelé dans cette la fonction.
    myContainer.innerHTML = "";
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            myExercice = JSON.parse(xhr.responseText);
            //Appel de la fonction retrieveExercice() en lui passant id (d'exercice) 
            //en paramettre puisque l'on veut récupérer l'id de l'exercice selectionné (id en cours)
            retrieveExercice(id);
            //Appelle de la fonction displeyFields() à laquelle on passe la paramettre true pour choisir le mode UPDATE(affichage des champs remplies)
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

//Fonction qui attend un Booléen en parametre, pour dire si c'est en mode "UPDATE"(boolean TRUE) cela affichera les données pré-enregistrés de l'exercice selectionné ou
// en mode "NOT UPDATE" ou "CREATION" (boolean FALSE) qui affichera Les inputs vide afin de pouvoir les remplir.
function displayCreationFields(isUpdate) {
    //Ligne contenant deux colonnes
    //L'une contient les labels (nom exercice, theme, niveau lien) 
    //L'autre les inputs, select et textarea allant avec chaque input)
    let rowSelect = ultimateHTMLGenerator("div", "", ["row"], myContainer);
    rowSelect.id="rowSelect";
    
    let columnLabelTitle=ultimateHTMLGenerator("div", "", ["col","text-end"], rowSelect);
    let labelTitle = ultimateHTMLGenerator("label", "NOM EXERCICE :", ["text-end","fw-bold","fs-6","bg-secondary"],columnLabelTitle);

    let columnInputTtitle=ultimateHTMLGenerator("div", "", ["col"], rowSelect);
    let inputTitle = ultimateHTMLGenerator("input", "", [], columnInputTtitle);
    inputTitle.type = "text";
    //Si La valeur contenu dans l'input est myTitle
    if (isUpdate) { inputTitle.value = myTitle };
    inputTitle.id = "EXERCICE" + "_NOM";

    let columnLabelTheme=ultimateHTMLGenerator("div", "", ["col","text-end"], rowSelect);
    let labelTheme = ultimateHTMLGenerator("label", "THEME :", ["fw-bold","fs-6","bg-secondary"], columnLabelTheme);
    
    //Creation d'un selecteur qui contient autant de propositions de réponse que de theme
    let columnInputTheme=ultimateHTMLGenerator("div", "", ["col"], rowSelect);
    let selectTheme = ultimateHTMLGenerator("select", "", [], columnInputTheme);
    //J'utilise une boucle for pour parcourir mes themes
    for (c = 0; c < myThemes.theme.length; c++) {
        //Autant d'options que de themes sont créer
        let optionsTheme = ultimateHTMLGenerator("option", myThemes.theme[c]._NOM, [], selectTheme);
        //Le bon id est attribué à l'option
        optionsTheme.value = myThemes.theme[c]._ID;
    }
    //Ici dans le mode Update, le selecteur affiche le theme correspondant à l'exercice selectionné dans le tableau
    if (isUpdate) {
        selectTheme.value = myIdTheme;
        selectTheme.id = "selectTheme";
    }

    let columnLabelLevel=ultimateHTMLGenerator("div", "", ["col","text-end"], rowSelect);
    let labelLevel = ultimateHTMLGenerator("label", "NIVEAU :", ["fw-bold","fs-6","bg-secondary"], columnLabelLevel);
    
    let columnInputLevel=ultimateHTMLGenerator("div", "", ["col"], rowSelect);
    let inputLevel = ultimateHTMLGenerator("input", "", [], columnInputLevel);
    inputLevel.type = "number";
    inputLevel.id = "EXERCICE" + "_NIVEAU";

    //Dans le mode Update, la valeur à l'interieur de mon input est myLevel
    //Qui correspond au niveau attribué à l'exercice selectionné (exercice en cours)
    if (isUpdate) { inputLevel.value = myLevel; }

    let columnLabelLink=ultimateHTMLGenerator("div", "", ["col","text-end"], rowSelect);
    let labelLink = ultimateHTMLGenerator("label", "LIEN :", ["fw-bold","fs-6","bg-secondary"], columnLabelLink);
    
    let columnInputLink=ultimateHTMLGenerator("div", "", ["col"], rowSelect);
    let inputLink = ultimateHTMLGenerator("input", "", [], columnInputLink);
    inputLink.type = "url";
    inputLink.id = "EXERCICE" + "_LIEN";

    //Dans le mode Update, la valeur à l'interieur de mon input est myLink
    //Qui correspond au lien attribué à l'exercice selectionné (exercice en cours)
    if (isUpdate) { inputLink.value = myLink; }

    //Creation d'une ligne contenant 3 colonnes contenant chacune les labels
    let rowLabel = ultimateHTMLGenerator("div", "", ["row"], myContainer);
    rowLabel.id="rowLabel";

    let columnLabel1 = ultimateHTMLGenerator("div", "", ["col-4","text-left"], rowLabel);
    let labelOrder = ultimateHTMLGenerator("label", "ENONCE EXERCICE :", ["fs-6","fw-bold","bg-secondary"], columnLabel1);

    let columnLabel2 = ultimateHTMLGenerator("div", "", ["col-4","text-left"], rowLabel);
    let labelExpectedResponse = ultimateHTMLGenerator("label", "REPONSE ATTENDU :", ["fs-6","fw-bold","bg-secondary"], columnLabel2);

    let columnLabel3 = ultimateHTMLGenerator("div", "", ["col-4","text-left"], rowLabel);
    let labelSuggestion = ultimateHTMLGenerator("label", "PROPOSITIONS REPONSES :", ["fs-6","fw-bold","bg-secondary"], columnLabel3);

    //Creation d'une ligne contenant 3 colonnes contenant chacune les input/textarea correspondant à chaque labels
    let rowInputFields = ultimateHTMLGenerator("div", "", ["row"], myContainer);
    rowInputFields.id="rowInputFields";

    let columnInput1 = ultimateHTMLGenerator("div", "", ["col-4"], rowInputFields);
    let inputOrder;

    //En mode Update le contenu du textarea est instruction
    //instruction correspond à la "consigne de l'exercice" selectionné (exercice en cours)
    if (isUpdate) {
        inputOrder = ultimateHTMLGenerator("textarea", instructions, [], columnInput1);

      //En mode creation le textarea est vide afin de le remplir avec la valeur souhaité  
    } else {
        inputOrder = ultimateHTMLGenerator("textarea", "", [], columnInput1);
    }
    inputOrder.id = "EXERCICE" + "_CONSIGNE";

    let columnInput2 = ultimateHTMLGenerator("div", "", ["col-4"], rowInputFields);
    let inputExpectedResponse;
    //En mode Update le contenu du textarea est correctAnswers
    //correctAnswer correspond à la reponse attendu de l'exercice selectionné (exercice en cours)
    if (isUpdate) {
        inputExpectedResponse = ultimateHTMLGenerator("textarea", correctAnswers, [], columnInput2);
        //En mode creation le textarea est vide afin de pouvoir y rentrer la valeur souhaitée
    } else {
        inputExpectedResponse = ultimateHTMLGenerator("textarea", "", [], columnInput2);
    }
    inputExpectedResponse.id = "EXERCICE" + "_REPONSEATTENDU";

    let columnInput3 = ultimateHTMLGenerator("div", "", ["col-4"], rowInputFields);
    let addButton;
    //En mode Update le bouton d'ajout d'input n'apparait pas
    if (isUpdate) {
        addButton = ultimateHTMLGenerator("button", "+", ["btn", "btn-success", "d-none"], columnInput3);
    //En mode creation le bouton d'ajout d'input est apparant ainsi qu'un input
    } else {
        addButton = ultimateHTMLGenerator("button", "+", ["col", "btn", "btn-success"], columnInput3);
        let inputSuggestion1 = ultimateHTMLGenerator("input", "", [], columnInput3);
        //Creation d'un id unique qui va pouvoir permettre de recuperer la valeur tapé par l'utilisateur dans l'input
        inputSuggestion1.id = "REPONSE" + "_DESCRIPTION" + 1;
    }
    //En mode Update, au click sur le bouton d'ajout,
    //Il est possible d'ajouter des inputs de proposition de réponse en plus de ceux deja existant
    if (isUpdate) {
        addButton.onclick = function () {
            let inputSuggestion1 = ultimateHTMLGenerator("input", "", [], columnInput3);
            //J'attribu un id unique à mon nouvel input de proposition
            inputSuggestion1.id = "inputPropoRep_Create" + compteurInputReponse_Create;
            //J'agremente mon compteurInputReponse_Create de 1 en 1
            compteurInputReponse_Create++;
        };
        //En mode creation au click sur le bouton d'ajout je créer de nouveaux input
        //Et un id unique leur est attribué
    } else {
        addButton.onclick = function () {
            compteurInput++;
            let inputSuggestion1 = ultimateHTMLGenerator("input", "", [], columnInput3);
            inputSuggestion1.id = "REPONSE" + "_DESCRIPTION" + compteurInput;
        }
    }
    //En mode "update" on créer une boucle for
    //elle va parcourrir l'ensemble du tableau de répponse
    //et afficher autant d'input que de propositions de réponse que contient l'exercice
    if (isUpdate) {
        //Creation d'une boucle for pour parcourir le longeur de mon tableau de réponse de l'exercice en cours
        for (j = 0; j < myExercices.Exercice[indexExoEnCours]._REPONSES.length; j++) {
            let inputSuggestion1 = ultimateHTMLGenerator("input", "", [], columnInput3);
            inputSuggestion1.id = "inputPropoRep" + compteurInputReponse;
            //La valeur de mon input correspond à la description dans la table réponse, de mon exercice en cours
            inputSuggestion1.value = myExercices.Exercice[indexExoEnCours]._REPONSES[j]._DESCRIPTION;
            compteurInputReponse++;
        }
        //Creation d'une ligne avec un nom unique, contenant deux colonnnes
        let rowButtonUD = ultimateHTMLGenerator("div", "", ["row"], myContainer);
        rowButtonUD.id = "rowButtonUD";

        //La première colonne contient un bouton MODIFIER 
        //qui au click permet de faire apparaitre le bouton d'ajout (qui permet d'ajouter des input des propositions de réponses)
        //et appel la fonction displayCreationButtons() (qui permettra de mettre à jour l'exercice)
        let column1ButtonUD = ultimateHTMLGenerator("div", "", ["col-6"], rowButtonUD);
        let buttonUpdate = ultimateHTMLGenerator("button", "Modifier", ["btn", "btn-warning"], column1ButtonUD);
        buttonUpdate.id = "buttonUpdate";
        buttonUpdate.onclick = function () {
            addButton.classList.remove("d-none");
            displayCreationButtons(myExercices.Exercice[indexExoEnCours]._ID);
        }
        //La deuxième colonnne contient un bouton supprimer
        //qui au click appel la fonction deleteExercice() (qui permet de supprimer definitivement l'exercice)
        //et fait un retour sur la page d'affichage du tableau
        let column2ButtonUD = ultimateHTMLGenerator("div", "", ["col-6"], rowButtonUD);
        let buttonDelete = ultimateHTMLGenerator("button", "Supprimer", ["btn", "btn-danger"], column2ButtonUD);
        buttonDelete.id = "buttonDelete";
        buttonDelete.onclick = function () { 
            deleteExercice(myExercices.Exercice[indexExoEnCours]._ID); 
            myContainer .innerHTML = "";
            load_Exercice();
        }
        //En mode creation on créer une ligne contenant un bouton VALIDER 
        //qui au click appel la fonction creationExercice() (qui prend en compte la valeur de tous les champs
        //et créer un nouvel exercice et ses propositions de réponse)
    } else {
        let rowButtonV = ultimateHTMLGenerator("div", "", ["row"], myContainer);
        let buttonValidate = ultimateHTMLGenerator("button", "Valider", ["btn", "btn-success"], rowButtonV);
        buttonValidate.id = "buttonValidate";
        buttonValidate.onclick = function () {
            creationExercice(
                document.getElementById("EXERCICE" + "_NOM").value,
                document.getElementById("EXERCICE" + "_CONSIGNE").value,
                document.getElementById("EXERCICE" + "_REPONSEATTENDU").value,
                document.getElementById("EXERCICE" + "_NIVEAU").value,
                document.getElementById("EXERCICE" + "_LIEN").value,
                selectTheme.value
            );
        };
    }

}

//Cette fonction vide la ligne ou se trouve les boutons modifier supprimer et laisse apparaitre le bouton Valider
//Au click sur Valider la fonction updateExercice() est appelé.
function displayCreationButtons(idExercice) {
    document.getElementById("rowButtonUD").innerHTML = "";
    let buttonValidate = ultimateHTMLGenerator("button", "Valider", ["btn", "btn-success"], rowButtonUD);
    buttonValidate.id = "buttonValidate";

    //Au click sur le bouton Valider intervient la partie du CRUD Update
    //Je passe en paramettre de la fonction : toutes les valeurs dont je vais avoir besoin 
    buttonValidate.onclick = function () {
        updateExercice(
            idExercice,
            document.getElementById("EXERCICE" + "_NOM").value,
            document.getElementById("EXERCICE" + "_CONSIGNE").value,
            document.getElementById("EXERCICE" + "_REPONSEATTENDU").value,
            document.getElementById("EXERCICE" + "_NIVEAU").value,
            document.getElementById("EXERCICE" + "_LIEN").value,
            document.getElementById("selectTheme").value);
    };
}
//_______________________________________________METRE A JOUR_______________________________________________

//Cette fonction va mettre à jour l'exercice, les propositions de réponse et en ajouter si besoin
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

    //je parcoure l'ensemble des input de propositions de reponses à créer,
    //je récupére leur valeur et l'id de l'exercice correspondant 
    //afin de créer de nouvelles propositions, grace au web service update_reponse (en + de celles déjà enregistrées)
    for (let i = 1; i < compteurInputReponse_Create; i++) {
        //A chaque fois j'appel la fonction createReponse() en lui passant
        //la valeur de l'id de la proposition de réponse + i et l'id de l'exercice
        createReponse(document.getElementById("inputPropoRep_Create" + i).value, id);
    }
    //parcourre l'ensemble des input de propositions de reponses,
    //et récupére leur valeur et l'id de l'exercice correspondant
    //afin de les mettre à jour grace au web service update_reponse
    //et de créer les propositions précédement créer.
    for (let i = 1; i < compteurInputReponse; i++) {
        //A chaque fois je créer un nouvel id de réponse pour les nouvelles propositions
        let idReponse = myExercices.Exercice[indexExoEnCours]._REPONSES[i - 1]._ID;
        //Et j'appel la fonction updateReponse à laquelle je passe l'idReponse, 
        //la valeur de l'id inputPropoRep (input de proposition de reponse) +i et l'id de l'exercice
        updateReponse(idReponse, document.getElementById("inputPropoRep" + i).value, id);
    }
    //A la fin des 4 secondes la page se vide et la fonction load_Exercice se lance
    setTimeout(function(){
        myContainer.innerHTML = "";
        load_Exercice();
    }, 4000);
}
//_____________________________________________________MISE A JOUR REPONSE

//
//Fonction mise a jour qui passe en paramettre (idReponse, description, idExercice)
function updateReponse(idReponse, description, idExercice) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
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

//__________________________________________________Fonction HTML Element Generator_______________________________________

function ultimateHTMLGenerator(typeElement, contenu, tableauClassCss, destinationElement) {  //on créer un élement html donné en paramètre (1er paramètre)                      
    
    let ultimateElement = document.createElement(typeElement); //on attribut du contenu (paramètre 2) à l'element html précedement fabriqué                                                   
    ultimateElement.textContent = contenu;                    //on souhaite ajouter plusieurs class CSS à l'element html précedement créé

    for (let i = 0; i < tableauClassCss.length; i++) {       //on ajoute la class css contenu dans le tableau de class css (3ème paramètre)
        ultimateElement.classList.add(tableauClassCss[i]);  //on ajoute une classList à la variable ultimateElement
    }
    destinationElement.appendChild(ultimateElement);      //on fait apparaitre l'élement dans celui passé en 4ème paramètre
    return ultimateElement;                               //Force la sortie de la boucle FOR
}
//____________________________________________________________LIENS DES BOUTTONS COURS ET EXAMENS________________________________________________________________________________//

function loadExamens(){
    window.location.href="https://apcpedagogie.com/examen-4-en-html-css-et-js/";
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


//______________________________________________LIEN VERS CONTACT (FOOTER)_________________________________

//Recupération de l'id du lien de contact pour y ajouter la fonction onclick afin d'afficher l'alerte de contact
let myLinkContact = document.getElementById("link_contact");
myLinkContact.onclick = function () { alert("Téléphone : 02.47.39.24.01" + "\n" + "Mail : formation.dev@mail.fr"); };


//_____________________________________________________Fonctions COOKIE____________________________________________________________

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

//______________________________________________________________________________________________________________

//fonction qui renvoie la valeur d'un cookie ??
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

//Fonction qui définis un nouveau cookie ??
function eraseCookie(name) {
    //creation d'un cookie d'expiration qui appatient à une page 
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


//pour décoder le token
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};
