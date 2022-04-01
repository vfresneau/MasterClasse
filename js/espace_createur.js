//__________________________________________DECLARATION DE VARIABLES_______________________________
let myExercices={};
let myThemes;
let compteurInput=1;
let compteurInputReponse=1;
let compteurInputReponse_Create=1;
let myExercice = {};
let tableAnswers = [];
let myAnswer = [];
let myIdTheme;
let myThemeString;
let indexExoEnCours=0;

//myContainer est egale à l'id du container présent en HTML qui au onclick est remplacé
//par le contenu de la fonction load_Exercice
let myContainer=document.getElementById("myContainerCreateExercice");

//_____________________________________FONCTIONS POUR AFFICHER LE TABLEAU D'EXERCICE____________________________

// Au click (coté HTML) la fonction load_Exercice est executé
//Cette fonction créer un bouton et permet de recupérer grâce à la requete AJAX les exercices (ws_read_exercice.php)
function load_Exercice() {

    //Le container qui a pour id myContainerCreateExercice se vide et laisse place au bouton Créer et au tableau d'exercices
    //celui-ci s'affichant grâce à la fonction tableau_exercice_stagiaire qui est appelé dans la fonction load_Theme.
    document.getElementById("myContainerCreateExercice").innerHTML = "";
    //Je créer un bouton lié à la fonction ReadTheme.
    let rowButtonCreate=ultimateHTMLGenerator("div","",["row"],myContainer); 
    let buttonCreate= ultimateHTMLGenerator("button","Créer",["col","btn","btn-success"],rowButtonCreate);
    buttonCreate.id="buttonCreate";
    buttonCreate.onclick =function() {ReadTheme(); };

    //On fait un xmlHttprequest -> envoie une demande à un webservice
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        //Quand on reçois une réponse "fini" de notre requete
        if (xhr.readyState == XMLHttpRequest.DONE) {
            //On parse notre JSON (converti JSON en chaine de caractère)
            myExercices = JSON.parse(xhr.responseText);
            //Je fais un consol.log afin de vérifier que tout passe et fonctionne
            console.log(myExercices);
            //La fonction ReadTheme est appelé
            load_Theme();
        }
    }
    //Ici  je fais un POST de l'adresse url du web service ws_read_exercice.php
    xhr.open('POST', 'http://141.94.223.96/Chloe/MasterClasse/php/webservice/ws_read_exercice.php', true);
    //Ici il se passe toujours la même chose
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      //je definie que j'attend du json en retour de la requet http
    xhr.setRequestHeader('Accept', 'application/json');
      //je definie le token d'authorisation de la requet http
    xhr.setRequestHeader('Authorization','Bearer ' +getCookie('jwt'));
    //On oublie pas d'envoyer les paramètres sous forme de chaine de caractères et non du JSON (ici nous n'envoyons rien)
    xhr.send();
}

//Cette fonction va nous servir à afficher les thèmes (PHP, HTML, SQL, CSS, JS)
function load_Theme() {
    //On fait un xmlHttprequest -> envoie une demande à un webservice
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        //Quand on reçois une réponse "fini" de notre requete
        if (xhr.readyState == XMLHttpRequest.DONE) {
            //On parse notre JSON (converti JSON en chaine de caractère)
            myThemes = JSON.parse(xhr.responseText);
            //Je fais un consol.log afin de vérifier que tout passe et fonctionne
            console.log(myThemes);
            //Enfin j'appelle ma fonction tableau_exercice_stagiaire.
            tableau_exercice_stagiaire();
        }
    }
    //Ici  je fais un POST de l'adresse url du web service ws_read_exercice.php
    xhr.open('POST', 'http://141.94.223.96/Chloe/MasterClasse/php/webservice/ws_read_theme.php', true);
    //Ici il se passe toujours la même chose
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //On oublie pas d'envoyer les paramètres sous forme de chaine de caractères et non du JSON (ici nous n'envoyons rien)
      //je definie que j'attend du json en retour de la requet http
    xhr.setRequestHeader('Accept', 'application/json');
      //je definie le token d'authorisation de la requet http
    xhr.setRequestHeader('Authorization','Bearer ' +getCookie('jwt'));
    //On oublie pas d'envoyer les paramètres sous forme de chaine de caractères et non du JSON (ici nous n'envoyons rien)
    xhr.send();
}

//Cette fonction va nous permettre d'afficher notre tableau d'exercices
function tableau_exercice_stagiaire() {

    //Creation d'un element html table dans le container//
    let TableExercice = ultimateHTMLGenerator("table", "", ["table", "table-hover", "autorisation", "my-auto", "text-center", "mx-auto", "table-responsive-md"],myContainer);
    //Creation de l'element thead dans la variable tableau //
    let headTable = ultimateHTMLGenerator("thead", "", [], TableExercice);
    //Creation d'un element html "tr" dans la variable TheadTableau 
    let headRow = ultimateHTMLGenerator("tr", "", [], headTable);
    //Creation d'un element html "th" dans la variable TrThead  
    let columHead1 = ultimateHTMLGenerator("th", "EXERCICES", ["col-3"], headRow);
    //Scope portion de code dans laquelle une variable peut exister et maintenir une valeur qui lui aura été préalablement affectée
    columHead1.scope = "col";
    //Creation d'un element html "th" dans la variable TrThead 
    let columHead2 = ultimateHTMLGenerator("th", "NIVEAU", ["col-3"], headRow);
    columHead2.scope = "col";
    //Creation d'un element html "th" dans la variable TrThead 
    let columHead3 = ultimateHTMLGenerator("th", "THEMES", ["col-3"], headRow);
    columHead3.scope = "col";
    //Creation d'un element html "tbody" dans la variable Tableau 
    let bodyTable = ultimateHTMLGenerator("tbody", "", [], TableExercice);
    bodyTable.scope = "row";

    //Pour tous les exercices je créer une ligne (ici en bootstrap "tr") dans le tableau 
    for (let i = 0; i < myExercices.Exercice.length; i++) {
        //Creation d'un element html "tr" dans la variable tableau 
        let rowTable = ultimateHTMLGenerator("tr", "", [], bodyTable);
        rowTable.addEventListener("click", function() {
            // Je stocke l'index qui est en cours d'affichage
            indexExoEnCours = i;
            //J'appel la fonction ReadExerciceCreateur et on lui passe en parametre l'id à fabriquer
            ReadExerciceCreateur(myExercices.Exercice[i]._ID);
        })

        //Creation d'un element html "td" dans la variable th_row et affichage des noms des exercices 
        let valueColum1 = ultimateHTMLGenerator("td", myExercices.Exercice[i]._NOM, [], rowTable);
        valueColum1.classList = "table-secondary";
        //Creation d'un element html "td" dans la variable th_row et affichage des niveau
        let valueColum2 = ultimateHTMLGenerator("td", myExercices.Exercice[i]._NIVEAU, [], rowTable);
        valueColum2.classList = "table-dark";
        //Creation d'un element html "td" dans la variable th_row et affichage des themes
        let myThemes = findTheme(myExercices.Exercice[i]._ID_THEME);
        let valueColum3 = ultimateHTMLGenerator("td", myThemes, [], rowTable);
        valueColum3.classList = "table-secondary";
    }
}

//Cette fonction récupère le nom du thème selon l'ID de l'exercice qui correspond à un thème //
function findTheme(id) {
    for (let y = 0; y < myThemes.theme.length; y++) {
        if (myThemes.theme[y]._ID == id) {
            return myThemes.theme[y]._NOM;
        }
    }
}

//_____________________________________FONCTIONS PERMETTANT L'AFFICHAGE DES CHAMPS ET LA CREATION D'EXERCICES_______________________________________________________

//Fonction qui me permet d'afficher des champs vide afin de créer un exercice
function ReadTheme() {
    //On vide le container qui contient les boutons (EXERCICES, COURS et  EXAMEN)
    //pour y placer ce qui est contenu dans la fonction displayCreation
    document.getElementById("myContainerCreateExercice").innerHTML = "";

    //On fait un xmlHttprequest -> envoie une demande à un webservice
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        //Quand on reçois une réponse "fini" de notre requete
        if (xhr.readyState == XMLHttpRequest.DONE) {
            //On parse notre JSON (converti JSON en chaine de caractère)
            myThemes= JSON.parse(xhr.responseText);
            //Je fais un consol.log afin de vérifier que tout passe et fonctionne
            console.log(myThemes);
            //Enfin j'appel ma fonction displayCreation
         displayCreation();
        }
    }
    //Ici  je fais un POST de l'adresse url du web service ws_read_exercice.php
    xhr.open('POST', 'http://141.94.223.96/Chloe/MasterClasse/php/webservice/ws_read_theme.php', true);
    //Ici il se passe toujours la même chose
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //On oublie pas d'envoyer les paramètres sous forme de chaine de caractères et non du JSON (ici nous n'envoyons rien)
      //je definie que j'attend du json en retour de la requet http
    xhr.setRequestHeader('Accept', 'application/json');
      //je definie le token d'authorisation de la requet http
    xhr.setRequestHeader('Authorization','Bearer ' +getCookie('jwt'));
    //On oublie pas d'envoyer les paramètres sous forme de chaine de caractères et non du JSON (ici nous n'envoyons rien)
    xhr.send();
}

//Cette fonction permet d'afficher tous les champs à remplir, seecteur et bouton. Lié au bouton bleu CREER
function displayCreation(){ 

    //Creation de la ligne qui va contenir les input, select et label
    let rowSelect=ultimateHTMLGenerator("div","",["row"],myContainer);
   
    //Creation de mon label pour le titre
    let labelTitle=ultimateHTMLGenerator("label","NOM EXERCICE",[],rowSelect);
    //Creation de mon input qui va avec le label titre
    let inputTitle=ultimateHTMLGenerator("input","",[],rowSelect);
    //Je spécifie que le type de mon input est du texte
    inputTitle.type="text";
    //Je donne un id à mon inputTitle
    inputTitle.id="EXERCICE"+"_NOM";

    
    let labelTheme=ultimateHTMLGenerator("label","THEME",[],rowSelect);
    //Creation de mon selecteur de theme
    let selectTheme=ultimateHTMLGenerator("select","",[],rowSelect);
    //Creation d'une boucle for pour proposer autant d'options qu'il y a de thèmes dans la base de données
    for(c=0; c<myThemes.theme.length;c++){
        let optionsTheme=ultimateHTMLGenerator("option",myThemes.theme[c]._NOM,[],selectTheme);
        //optionsTheme.id=myThemes.theme[c]._ID;
        //La valeur inscrite dans mon option est l'id de mon thème
        optionsTheme.value=myThemes.theme[c]._ID;
    }
    
    //Je reitère l'opération pour créer des labels et inputs
    let labelLevel=ultimateHTMLGenerator("label","NIVEAU",[],rowSelect);
    let inputLevel=ultimateHTMLGenerator("input","",[],rowSelect);
    inputLevel.type="number";
    inputLevel.id="EXERCICE"+"_NIVEAU";

    let labelLink=ultimateHTMLGenerator("label","LIEN",[],rowSelect);
    let inputLink=ultimateHTMLGenerator("input","",[],rowSelect);
    inputLink.type="url";
    inputLink.id="EXERCICE"+"_LIEN";

    //Creation d'une ligne qui va contenir mes colonnes
    let rowLabel = ultimateHTMLGenerator("div","",["row"],myContainer);
    //Creation de labels "Consigne", "Reponse attendu" et "Propositions de réponses" dans des colonnes différentes (mise en page)
    let columnLabel1=ultimateHTMLGenerator("div","",["col-4"],rowLabel);
    let labelOrder=ultimateHTMLGenerator("label","ENONCE EXERCICE",[],columnLabel1);

    let columnLabel2=ultimateHTMLGenerator("div","",["col-4"],rowLabel);
    let labelExpectedResponse=ultimateHTMLGenerator("label","REPONSE ATTENDU",[],columnLabel2);

    let columnLabel3=ultimateHTMLGenerator("div","",["col-4"],rowLabel);
    let labelSuggestion=ultimateHTMLGenerator("label","PROPOSITIONS REPONSES",[],columnLabel3);

    //Creation d'une ligne où se trouve les 3 colonnes contenant les inputs et textarea correspondant aux lables
    let rowInputFields = ultimateHTMLGenerator("div","",["row"],myContainer);

    //Creation de la colonne qui contient le textarea en rapport avec le label de la consigne de l'exercice
    let columnInput1=ultimateHTMLGenerator("div","",["col-4"],rowInputFields);
    let inputOrder=ultimateHTMLGenerator("textarea","",[],columnInput1);
    //Je donne un id à mon input
    inputOrder.id="EXERCICE"+"_CONSIGNE";

    //Creation de la colonne qui contient le textarea en rapport avec le label de la reponse attendue de l'exercice
    let columnInput2=ultimateHTMLGenerator("div","",["col-4"],rowInputFields);
    let inputExpectedResponse=ultimateHTMLGenerator("textarea","",[],columnInput2);
    //Je donne un id à mon input
    inputExpectedResponse.id="EXERCICE"+"_REPONSEATTENDU";

    //Creation de la colonne qui contient le bouton d'ajout d'input et l'input en rapport avec le label de propositions de réponses à l'exercice
    let columnInput3=ultimateHTMLGenerator("div","",["col-4"],rowInputFields);
    let addButton= ultimateHTMLGenerator("button","+",["col","btn","btn-success"],columnInput3);
    let inputSuggestion1=ultimateHTMLGenerator("input","",[],columnInput3);
    //Creation de l'id qui va pouvoir permettre de recuperer la valeur tapé par l'utilisateur
    inputSuggestion1.id="REPONSE"+"_DESCRIPTION"+1;

    //Ajout d'un evenement onclick au bouton 
    addButton.onclick = function(){
        //Variable déclaré précédement qui sert à créer un id unique lors de chaque creation d'input
        compteurInput++;
        let inputSuggestion1=ultimateHTMLGenerator("input","",[],columnInput3);
        inputSuggestion1.id="REPONSE"+"_DESCRIPTION"+compteurInput;
    }
    
    //Creation d'une ligne contenant le bouton Valider
    let rowButtonV=ultimateHTMLGenerator("div","",["row"],myContainer); 
    let buttonValidate= ultimateHTMLGenerator("button","Valider",["col","btn","btn-success"],rowButtonV);
    //Creation d'un id pour le bouton
    buttonValidate.id="buttonValidate";
    //Liaison du bouton à l'evenement onclick qui appel la fonction creationExercice
    // on lui passe en paramettre la valeur des id de chaque input ainsi que la valeur du selecteur
    buttonValidate.onclick = function(){creationExercice(
        document.getElementById("EXERCICE"+"_NOM").value,
        document.getElementById("EXERCICE"+"_CONSIGNE").value,
        document.getElementById("EXERCICE"+"_REPONSEATTENDU").value,
        document.getElementById("EXERCICE"+"_NIVEAU").value,
        document.getElementById("EXERCICE"+"_LIEN").value,
        selectTheme.value
        );
    };
}

//Cette fonction va créer l'exercice 
function creationExercice(nom,consigne,reponseattendu,niveau,lien,theme){

    //On fait un xmlHttprequest -> envoie une demande à un webservice
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        //Quand on reçois une réponse "fini" de notre requete
        if (xhr.readyState == XMLHttpRequest.DONE) {
            //Si la réponse n'est pas un nombre 
            //si jamais la requette à planté et quelle renvoi erreur404 c'est pas un nombre mais une chaine de caractere
            if(isNaN(xrh.responseText)){
                // Alors si ce n'est pas un nombre on ne fait rien
            }
            //Si non si c'est un nompbre 
            else{
                //On parcours la boucle for
                for(let i=1; i<=compteurInput;i++){
                    //On recupère la valeur des inputs tapé par l'utilisateur 
                    let descri = document.getElementById("REPONSE"+"_DESCRIPTION"+i).value;
                    //Et on passe en paramettre la variable descri + l'id de l'exercice 
                    //(ici le xhrresponseText renvois vers le web service displayCreation et donc récupère l'id de l'exercicé créer)
                    createReponse(descri, xhr.responseText);
                }
            }
        }
    }
    //Ici  je fais un POST de l'adresse url du web service ws displayCreation.php
    xhr.open('POST', 'http://141.94.223.96/Chloe/MasterClasse/php/webservice/ws displayCreation.php', true);
    //Ici il se passe toujours la même chose
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //On oublie pas d'envoyer les paramètres sous forme de chaine de caractères et non du JSON (ici on envois tout ce qui est passé en parametre de la fonction)
      //je definie que j'attend du json en retour de la requet http
    xhr.setRequestHeader('Accept', 'application/json');
      //je definie le token d'authorisation de la requet http
    xhr.setRequestHeader('Authorization','Bearer ' +getCookie('jwt'));
    //On oublie pas d'envoyer les paramètres sous forme de chaine de caractères et non du JSON (ici nous n'envoyons rien)
    xhr.send("nom="+nom
    +"&consigne="+consigne
    +"&reponseAttendu="+reponseattendu
    +"&niveau="+niveau
    +"&lien="+lien
    +"&id_theme="+theme
    +"&valide="+0);
}

//Cette fonction est une requete AJAX pour créer les propositions de réponses lié à l'id d'un exercice
//Elle à pour paramettre la description de la proposition de réponse et l'id correspondant à l'exercice
function createReponse(descri, id_exo){
    //On fait un xmlHttprequest -> envoie une demande à un webservice
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        //Quand on reçois une réponse "fini" de notre requete
        if(xhr.readyState == XMLHttpRequest.DONE){
        } 
    }
    //Ici  je fais un POST de l'adresse url du web service ws_create_reponse.php
    xhr.open('POST', 'http://141.94.223.96/Chloe/MasterClasse/php/webservice/ws_create_reponse.php', true);
    //Ici il se passe toujours la même chose
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //On oublie pas d'envoyer les paramètres sous forme de chaine de caractères et non du JSON (ici on envois tout ce qui est passé en parametre de la fonction)
      //je definie que j'attend du json en retour de la requet http
    xhr.setRequestHeader('Accept', 'application/json');
      //je definie le token d'authorisation de la requet http
    xhr.setRequestHeader('Authorization','Bearer ' +getCookie('jwt'));
    //On oublie pas d'envoyer les paramètres sous forme de chaine de caractères et non du JSON (ici nous n'envoyons rien)
    xhr.send("description="+descri
    +"&id_exercice="+id_exo);
}

//______________________________FONCTION PERMETTANT L'AFFICHAGE DES CHAMPS REMPLI POUR UPDATE DELETE___________________________

//Cette fonction à pour paramettre un id
function ReadExerciceCreateur(id) {
    //Le container qui a pour id myContainerCreateExercice se vide et laisse place au champs et selecteur replis
    //ceux-ci s'affichant grâce à la fonction displayCreationFields qui est appelé dans cette la fonction.
    document.getElementById("myContainerCreateExercice").innerHTML = "";
    //On fait un xmlHttprequest -> envoie une demande à un webservice
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        //Quand on reçois une réponse "fini" de notre requete
        if (xhr.readyState == XMLHttpRequest.DONE) {
            //On parse notre JSON (converti JSON en chaine de caractère)
            myExercice = JSON.parse(xhr.responseText);
            //On appel de fonction retrieveExercice en lui passant id (d'exercice) en paramettre puisque l'on veut récupérer l'exercice
            retrieveExercice(id);
            //Ensuite on appel la fonction readTheme et on lui passe une fonction
            readTheme(function() {
                //Cette fonction va parser notre JSON (converti JSON en chaine de caractère)
                myThemes = JSON.parse(myXHR.responseText);
                //Et ensuite appeller la fonction Retrieve_Id_Themes a laquelle on a passé myIdTheme (id du theme)
                Retrieve_Id_Themes(myIdTheme);
            });
            //Appelle de la fonction displeyFields
            displayCreationFields();
        }
    }
    //Ici  je fais un POST de l'adresse url du web service ws_read_exercice.php
    xhr.open('POST', 'http://141.94.223.96/Chloe/MasterClasse/php/webservice/ws_read_exercice.php', true);
    //Ici il se passe toujours la même chose
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //On oublie pas d'envoyer les paramètres sous forme de chaine de caractères et non du JSON (ici nous n'envoyons rien)
      //je definie que j'attend du json en retour de la requet http
    xhr.setRequestHeader('Accept', 'application/json');
      //je definie le token d'authorisation de la requet http
    xhr.setRequestHeader('Authorization','Bearer ' +getCookie('jwt'));
    //On oublie pas d'envoyer les paramètres sous forme de chaine de caractères et non du JSON (ici nous n'envoyons rien)
    xhr.send();
}

//Cette fonction est appelé a la reponse du serveur
function readTheme() {
    //On fait un xmlHttprequest -> envoie une demande à un webservice
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        //Quand on reçois une réponse "fini" de notre requete
        if (xhr.readyState == XMLHttpRequest.DONE) {
    }
    }
    //Ici  je fais un POST de l'adresse url du web service ws_read_exercice.php
    xhr.open('POST', 'http://141.94.223.96/Chloe/MasterClasse/php/webservice/ws_read_theme.php', true);
    //Ici il se passe toujours la même chose
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //On oublie pas d'envoyer les paramètres sous forme de chaine de caractères et non du JSON (ici nous n'envoyons rien)
      //je definie que j'attend du json en retour de la requet http
    xhr.setRequestHeader('Accept', 'application/json');
      //je definie le token d'authorisation de la requet http
    xhr.setRequestHeader('Authorization','Bearer ' +getCookie('jwt'));
    //On oublie pas d'envoyer les paramètres sous forme de chaine de caractères et non du JSON (ici nous n'envoyons rien)
    xhr.send();
}

//Cette fonction permet de retrouver l'Id de l'exercice correspondant, passer en parametre dans la fonction ReadExerciceCreateur
function retrieveExercice(idExercice) {
    //Varible déclaré précédement
    myAnswer = [];
    //Je fais une boucle for pour parcourir la longeur de mon tableau EXERCICE
    for (let y = 0; y < myExercice.Exercice.length; y++) {
        //Si l'idExercice transmis est identique à celui d'un exercice du tableau EXERCICE
        if (myExercice.Exercice[y]._ID == idExercice) {
            //Alors je créer une variable pour mettre les éléments dont j'ai besoin
            myTitle = myExercice.Exercice[y]._NOM;
            myIdTheme = myExercice.Exercice[y]._ID_THEME;
            instructions = myExercice.Exercice[y]._CONSIGNE;
            myLevel = myExercice.Exercice[y]._NIVEAU;
            tableAnswers = myExercice.Exercice[y]._REPONSES;
            correctAnswers = myExercice.Exercice[y]._REPONSEATTENDU;
            myLink= myExercice.Exercice[y]._LIEN;
        }
    }
    //Permet de jumeller bonnes et mauvaises reponses avec myAnswer et tableAnserws
    //Pour tous les elements du tableau REPONSES
    for (let x = 0; x < tableAnswers.length; x++) {
        //J'envois ma description en cours dans mon tableau de réponse
        myAnswer.push(tableAnswers[x]._DESCRIPTION);
    }
    
    //Envoie dans le tableau myAnswer le tableau de réponses
    myAnswer.push(correctAnswers);
}

//Cette fonction permet de retrouver les themes en fonction de l'exercice en cours
function Retrieve_Id_Themes(myIdTheme){
    for (let i = 0; i < myThemes.theme.length; i++) {
        //Si l'id du theme en cours transmis est identique à celui d'un exercice du tableau myTheme
        if (myThemes.theme[i]._ID == myIdTheme) {
            //Alors je met le nom du theme en cours dan sma variable 
            myThemeString = myThemes.theme[i]._NOM;
            //Permet d'arrêt la boucle
            break;
        }
    }
}

//Cette fonction va permettre d'afficher les champs lors du click pour consulter un exercice
function displayCreationFields(){

    //Creation de ma ligne qui va contenir les input, select et label
    let rowSelect=ultimateHTMLGenerator("div","",["row"],myContainer);

    //Creation d'un label pour le titre de l'exerccice
    let labelTitle=ultimateHTMLGenerator("label","NOM EXERCICE",[],rowSelect);
    //Creation d'un input en rapport avec le label du titre de l'exercice
    let inputTitle=ultimateHTMLGenerator("input","",[],rowSelect);
    //L'input est de type text
    inputTitle.type="text";
    //La valeur contenu dans l'input est myTtitle
    inputTitle.value=myTitle;
    //Le créer un id à mon input
    inputTitle.id="EXERCICE"+"_NOM";

    //Creation d'un label pour le theme de l'exercice
    let labelTheme=ultimateHTMLGenerator("label","THEME",[],rowSelect);
    //Creation de mon selecteur de theme pour afficher le theme en cours de l'exercice selectionné
    let selectTheme=ultimateHTMLGenerator("select","",[],rowSelect);
    //Pour cela j'utilise une boucle for pour parcourir mes themes
    for(c=0; c<myThemes.theme.length;c++){
        //Cela créer le bon nombre d'option avec l'id theme pour pouvoir choisir un theme dans le selecteur
        let optionsTheme=ultimateHTMLGenerator("option",myThemes.theme[c]._NOM,[],selectTheme);
        optionsTheme.value=myThemes.theme[c]._ID;

    }
    //Ici dans le selecteur s'affiche le theme correspondant à l'exercice selectionné dans le tableau
    selectTheme.value=myIdTheme;
    //J'attribu un id à mon selcteur 
    selectTheme.id="selectTheme";
    
    //Creation d'un label pour le niveau de l'exercice
    let labelLevel=ultimateHTMLGenerator("label","NIVEAU",[],rowSelect);
    //Creation d'un input en rapport avec le label du niveau de l'exercice
    let inputLevel=ultimateHTMLGenerator("input","",[],rowSelect);
    //Linput est de type number
    inputLevel.type="number";
    //La valeur à l'interieur de mon input est myLevel
    inputLevel.value=myLevel;
    //J'attribu un id à mon input 
    inputLevel.id="EXERCICE"+"_NIVEAU";

    //Creation d'un label pour le lien de mon exercice
    let labelLink=ultimateHTMLGenerator("label","LIEN",[],rowSelect);
    //Creation de l'input en rapport avec le label lien de l'exercice
    let inputLink=ultimateHTMLGenerator("input","",[],rowSelect);
    //L'input est de type url (adresse)
    inputLink.type="url";
    //La valeur à l'interieur de mon input est myLink
    inputLink.value=myLink;
    //J'attribu un id à mon input
    inputLink.id="EXERCICE"+"_LIEN";

    //Creation d'une ligne contenant 3 colonnes
    let rowLabel = ultimateHTMLGenerator("div","",["row"],myContainer); 
    //Colonne dans la ligne contenant le label de consigne de l'exercice
    let columnLabel1=ultimateHTMLGenerator("div","",["col-4"],rowLabel);
    let labelOrder=ultimateHTMLGenerator("label","ENONCE EXERCICE",[],columnLabel1);
 
    //Colonne dans la ligne contenant le label de la réponse attendu
    let columnLabel2=ultimateHTMLGenerator("div","",["col-4"],rowLabel);
    let labelExpectedResponse=ultimateHTMLGenerator("label","REPONSE ATTENDU",[],columnLabel2);

    //Colonne dans la ligne contenant le label de proposition de réponse
    let columnLabel3=ultimateHTMLGenerator("div","",["col-4"],rowLabel);
    let labelSuggestion=ultimateHTMLGenerator("label","PROPOSITIONS REPONSES",[],columnLabel3);

    //Creation d'une ligne qui va contenir les champs (input/textarea)
    let rowInputFields = ultimateHTMLGenerator("div","",["row"],myContainer);

    //Colonne contenant l'input de la consigne
    let columnInput1=ultimateHTMLGenerator("div","",["col-4"],rowInputFields);
    let inputOrder=ultimateHTMLGenerator("textarea",instructions,[],columnInput1);
    //J'attribu un id à mon input de consigne
    inputOrder.id="EXERCICE"+"_CONSIGNE";

    //Colonne contenant l'input de la reponse attendu
    let columnInput2=ultimateHTMLGenerator("div","",["col-4"],rowInputFields);
    let inputExpectedResponse=ultimateHTMLGenerator("textarea",correctAnswers,[],columnInput2);
    //J'attribu un id à mon input de reponse attendu
    inputExpectedResponse.id="EXERCICE"+"_REPONSEATTENDU";

    //Colonne contenant le bouton d'ajout et l'input de propositions de réponses
    let columnInput3=ultimateHTMLGenerator("div","",["col-4"],rowInputFields);
    let addButton=ultimateHTMLGenerator("button","+",["btn", "btn-success","d-none"],columnInput3);
    addButton.onclick=function(){
        let inputSuggestion1=ultimateHTMLGenerator("input","",[],columnInput3);
        //J'attribu un id à mon input de proposition
        inputSuggestion1.id="inputPropoRep_Create"+compteurInputReponse_Create;
        //J'agremente mon compteurInputReponse_Create de 1 en 1
        compteurInputReponse_Create++;
    };

    //Creation d'une boucle for pour parcourir le longeur de mon tableau de réponse de l'exercice en cours
    for(j=0; j<myExercices.Exercice[indexExoEnCours]._REPONSES.length;j++){
        //Un input se créer
        let inputSuggestion1=ultimateHTMLGenerator("input","",[],columnInput3);
        //Il a pour id unique inputPropoRep accompagné de 1, 2, 3 ou 4... qui correspond au compteur
        inputSuggestion1.id="inputPropoRep"+compteurInputReponse;
        //Alors la valeur de mon input correspond à la description dans la table réponse, de mon exercice en cours
        inputSuggestion1.value=myExercices.Exercice[indexExoEnCours]._REPONSES[j]._DESCRIPTION;
        //J'agremente mon compteurInputReponse de 1 en 1 pour avoir un id unique pour chaque input
        compteurInputReponse++;
    }

    //Creation d'une ligne contenant les boutons update et delete dans deux colonnes
    let rowButtonUD=ultimateHTMLGenerator("div","",["row"],myContainer); 
    //J'attribu un id à mon bouton
    rowButtonUD.id="rowButtonUD";

    //1ere colonne
    let column1ButtonUD=ultimateHTMLGenerator("div","",["col-6"],rowButtonUD);
    //Bouton update
    let buttonUpdate= ultimateHTMLGenerator("button","Modifier",["btn","btn-warning"],column1ButtonUD);
    buttonUpdate.id="buttonUpdate";
    //Au click sur le bouton update, la fonction displayCreationButtons est appelé
    buttonUpdate.onclick = function(){
        addButton.classList.remove("d-none");
        displayCreationButtons(myExercices.Exercice[indexExoEnCours]._ID);
    }

    //2eme colonne
    let column2ButtonUD=ultimateHTMLGenerator("div","",["col-6"],rowButtonUD);
    //Bouton delete
    let buttonDelete= ultimateHTMLGenerator("button","Supprimer",["btn","btn-danger"],column2ButtonUD);
    buttonDelete.id="buttonDelete";
    //Au click sur le bouton delete intervient la partie du CRUD Delete
    buttonDelete.onclick = function(){deleteExercice(myExercices.Exercice[indexExoEnCours]._ID)}
}

//Cette fonction vide la ligne ou se trouve les boutons Update Delete et laisse apparaitre le bouton Valider
function displayCreationButtons(idExercice){

    //Vide de la ligne pour laisser apparaitre le bouton Valider
    document.getElementById("rowButtonUD").innerHTML = ""; 
    let buttonValidate=ultimateHTMLGenerator("button","Valider",["col","btn","btn-success"],rowButtonUD);
    buttonValidate.id="buttonValidate";

    //Au click sur le bouton  Valider intervient la partie du CRUD Update
    //Je passe en paramettre de la fonction toutes les valeurs dont je vais avoir besoin  
    buttonValidate.onclick = function(){updateExercice(
        idExercice,
        document.getElementById("EXERCICE"+"_NOM").value,
        document.getElementById("EXERCICE"+"_CONSIGNE").value,
        document.getElementById("EXERCICE"+"_REPONSEATTENDU").value,
        document.getElementById("EXERCICE"+"_NIVEAU").value,
        document.getElementById("EXERCICE"+"_LIEN").value,
       document.getElementById("selectTheme").value);
    };
}
//_______________________________________________METRE A JOUR_______________________________________________
//Cette fonction va servir à faire la mise à jour de l'exercice et de ses propositions de réponse
function updateExercice(id,nom,consigne,reponseattendu,niveau,lien,theme){
    console.log(consigne);
    //On fait un xmlHttprequest -> envoie une demande à un webservice
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        //Quand on reçois une réponse "fini" de notre requete
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if(xhr.responseText){ 
            }
        }
    }
    //Ici  je fais un POST de l'adresse url du web service ws_update_exercice.php
    xhr.open('POST', 'http://141.94.223.96/Chloe/MasterClasse/php/webservice/ws_update_exercice.php', true);
    //Ici il se passe toujours la même chose
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //On oublie pas d'envoyer les paramètres sous forme de chaine de caractères et non du JSON (ici nous envoyon tous ce qui est passé en parametre de la fonction updateExercice)
      //je definie que j'attend du json en retour de la requet http
    xhr.setRequestHeader('Accept', 'application/json');
      //je definie le token d'authorisation de la requet http
    xhr.setRequestHeader('Authorization','Bearer ' +getCookie('jwt'));
    //On oublie pas d'envoyer les paramètres sous forme de chaine de caractères et non du JSON (ici nous n'envoyons rien)
    xhr.send("id="+id
    +"&nom="+nom
    +"&consigne="+consigne
    +"&reponseAttendu="+reponseattendu
    +"&niveau="+niveau
    +"&lien="+lien
    +"&id_theme="+theme
    +"&valide="+0);
    //Creation d'une boucle for qui nous permet de parcourrir l'ensemble des input de propositions de reponses à créer,
    //de récupérer leur valeur et leur id afin de créer de nouvelles propositions de grace au web service update_exercice (en + de celles déjà enregistrées)
    for(let i=1; i<compteurInputReponse_Create; i++){
        //A chaque fois j'appel la fonction createReponse en lui passant la valeur l'id de la proposition de réponse + i et l'id de l'exercice
        createReponse(document.getElementById("inputPropoRep_Create"+i).value,id);
    }
    //Creation d'une boucle for qui nous permet de parcourrir l'ensemble des input de propositions de reponses,
    //et de récupérer leur valeur et leur id afin de les mettre à jour grace au web service update_exercice
    for(let i=1; i<compteurInputReponse; i++ ){
        //A chaque fois je créer mon idReponse qui est ......................
        let idReponse=myExercices.Exercice[indexExoEnCours]._REPONSES[i-1]._ID;
        //Et j'appel la fonction updateReponse à laquelle je passe l'idReponse, la valeur de l'id inputPropoRep (input de proposition de reponse)
        //+i et l'id de l'exercice
        updateReponse(idReponse,document.getElementById("inputPropoRep"+i).value,id);
    }
}

//Cette fonction sert à mettre à jour la réponse à laquelle je passe 3 paramettre (idReponse, description, idExercice)
function updateReponse(idReponse,description,idExercice){
    //On fait un xmlHttprequest -> envoie une demande à un webservice
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        //Quand on reçois une réponse "fini" de notre requete
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if(xhr.responseText){
            }
        }
    }
    //Ici  je fais un POST de l'adresse url du web service ws_update_exercice.php
    xhr.open('POST', 'http://141.94.223.96/Chloe/MasterClasse/php/webservice/ws_update_reponse.php', true);
    //Ici il se passe toujours la même chose
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //On oublie pas d'envoyer les paramètres sous forme de chaine de caractères et non du JSON (ici nous envoyon tous ce qui est passé en parametre de la fonction updateReponse)
      //je definie que j'attend du json en retour de la requet http
    xhr.setRequestHeader('Accept', 'application/json');
      //je definie le token d'authorisation de la requet http
    xhr.setRequestHeader('Authorization','Bearer '+getCookie('jwt'));
    //On oublie pas d'envoyer les paramètres sous forme de chaine de caractères et non du JSON (ici nous n'envoyons rien)
    xhr.send("id="+idReponse
    +"&description="+description
    +"&id_exercice="+idExercice
    );
}

//_______________________________________SUPPRIMER________________________________________________________
//RESTE A FAIRE CETTE FONCTION QUI FERA LE DELETE ATTENTION EN TRAVAUX
function deleteExercice(IdExoEnCours){
    console.log(IdExoEnCours);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
        }
    }
    xhr.open('POST', 'http://141.94.223.96/Chloe/MasterClasse/php/webservice/ws_delete_exercice.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      //je definie que j'attend du json en retour de la requet http
    xhr.setRequestHeader('Accept', 'application/json');
      //je definie le token d'authorisation de la requet http
    xhr.setRequestHeader('Authorization','Bearer ' +getCookie('jwt'));
    //On oublie pas d'envoyer les paramètres sous forme de chaine de caractères et non du JSON (ici nous n'envoyons rien)
    xhr.send("id="+IdExoEnCours);
}

//_____________________________________HTML Element Generator generic function_______________________________________

function ultimateHTMLGenerator(typeElement,contenu,tableauClassCss,destinationElement){  //on créer un élement html donné en paramètre (1er paramètre)                      
    
    let ultimateElement = document.createElement(typeElement); //on attribut du contenu (paramètre 2) à l'element html précedement fabriqué                                                   
    ultimateElement.textContent = contenu;                    //on souhaite ajouter plusieurs class CSS à l'element html précedement créé
    
    for(let i = 0;i<tableauClassCss.length;i++){             //on ajoute la class css contenu dans le tableau de class css (3ème paramètre)
        ultimateElement.classList.add(tableauClassCss[i]);  //on ajoute une classList à la variable ultimateElement
    }
    
    destinationElement.appendChild(ultimateElement);      //on fait apparaitre l'élement dans celui passé en 4ème paramètre
    return ultimateElement;
}

//______________________________________________LIEN VERS CONTACT (FOOTER)_________________________________
//Recupération de l'id du lien de contact pour y ajouter la fonction onclick afin d'afficher l'alerte de contact
let myLinkContact=document.getElementById("link_contact");
myLinkContact.onclick = function() { alert("Téléphone : 02.47.39.24.01"+"\n"+"Mail : formation.dev@mail.fr"); };

//COOKIE
//_________________________________________________________________________________________________________________
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

//______________________________________________________________________________________________________________
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

//______________________________________________________________________________________________________________________
// Fonction permettant de supprimer un cookie
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

//pour décoder le token sous quel forme ?
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};