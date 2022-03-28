//__________________________________________DECLARATION DE VARIABLES_______________________________
let myExercices={};
let myThemes;
let compteurInput=1;

//myContainer est egale à l'id du container présent en HTML qui au onclick est remplacé par le contenu de la fonction ReadTheme
let myContainer=document.getElementById("myContainerCreateExercice");

//_______________________________________________Lien vers contact pour le footer_________________________________
//Recupération de l'id du lien de contact pour y ajouter la fonction onclick afin d'afficher l'alerte de contact
let myLinkContact=document.getElementById("link_contact");
myLinkContact.onclick = function() { alert("Téléphone : 02.47.39.24.01"+"\n"+"Mail : formation.dev@mail.fr"); };


//_____________________________________FONCTIONS POUR AFFICHER LE TABLEAU D'EXERCICE____________________________

//fonction qui récupère les exercices et qui passe les autres fonctions de la page //
function load_Exercice() {
   
    // contaiern alpha c'est la div qui contiens les vignette exercice/cours/examen (viens du html)
    document.getElementById("myContainerCreateExercice").innerHTML = "";
    let rowButtonCreate=ultimateHTMLGenerator("row","",[],myContainer); 
    let buttonCreate= ultimateHTMLGenerator("button","Créer",["col","btn","btn-success"],rowButtonCreate);
    buttonCreate.id="buttonCreate";
    //je passe en paramettre de ma fonction ReadTheme qui va afficher le contenu pour créer un exercice
    buttonCreate.onclick =function() { ReadTheme(); };

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
    xhr.open('POST', 'http://141.94.223.96/Chloe/MasterClasse/php/webservice/ws_read_exercice.php', true);
    // toujours la même chose
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
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
    xhr.open('POST', 'http://141.94.223.96/Chloe/MasterClasse/php/webservice/ws_read_theme.php', true);
    // toujours la même chose
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // on oublie pas d'envoyer les paramètres sous forme de chaine de caractères et non du json
    xhr.send();
}
function tableau_exercice_stagiaire() {

    //creation d'un tableau boostraps ! //

    //creation d'un element html table dans le container//
    let TableExercice = ultimateHTMLGenerator("table", "", ["table", "table-hover", "autorisation", "my-auto", "text-center", "mx-auto", "table-responsive-md"],myContainer);
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
            //ICI DOIS SE TROUVER LA FONCTION QUI AMENE A UPDATE DELATE
            // je stocke quel index est en cours d'affichage y // TODO COMPRENDRE
            indexExoEnCours = i;
            // on appel la fonction read exercice qui va charger l'exercice sur la page --> on lui passe l'id à fabriquer
            //ReadExerciceStagiaire(myExercices.Exercice[i]._ID);
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

//_____________________________________FONCTION D'AFFICHAGE INPUT___________________________
//____________________________________________Requete AJAX_____________________________
function ReadTheme() {
   
    // on vide le container qui contient les boutons (EXERCICES, COURS et  EXAMEN)
    //pour y remplacer le contenu par la fonction create_Exercice en appellant la function ReadTheme au onclick
    document.getElementById("myContainerCreateExercice").innerHTML = "";
    // on fait un xml httprequest -> envoie une demande à un webservice
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        // quand on reçois une réponse "fini" du notre requete
        if (xhr.readyState == XMLHttpRequest.DONE) {
        myThemes= JSON.parse(xhr.responseText);
        //verification si je reçois bien mon webService //
        console.log(myThemes);
            create_Exercice();
        }
    }
    //ici  l'adresse url du web service
    xhr.open('POST', 'http://141.94.223.96/Chloe/MasterClasse/php/webservice/ws_read_theme.php', true);
    // toujours la même chose
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // on oublie pas d'envoyer les paramètres sous forme de chaine de caractères et non du json
    xhr.send();
}
//_______________________________________PAGE CREATION EXERCICE_____________________________________
//fonction pour afficher tout le module de creation avec les champs à remplir 
function create_Exercice(){ 

    //ma ligne qui va contenir les input, select et label
    let rowSelect=ultimateHTMLGenerator("row","",[],myContainer);
    //mon label pour le titre
    let labelTitle=ultimateHTMLGenerator("label","NOM EXERCICE",[],rowSelect);
    //mon input qui va avec le label titre
    let inputTitle=ultimateHTMLGenerator("input","",["input"],rowSelect);
    inputTitle.type="text";
    inputTitle.id="EXERCICE"+"_NOM";

    //mon label theme
    let labelTheme=ultimateHTMLGenerator("label","THEME",[],rowSelect);
    // mon select theme ppur pouvoir choisir un theme
    let selectTheme=ultimateHTMLGenerator("select","",[],rowSelect);
    
    //attention a value et textcontent!!!!!
   
    for(c=0; c<myThemes.theme.length;c++){
        //les option avec l'id theme pour pouvoir choisir un theme dans le selecteur
        let optionsTheme=ultimateHTMLGenerator("option",myThemes.theme[c]._NOM,[],selectTheme);
        //optionsTheme.id=myThemes.theme[c]._ID;
        optionsTheme.value=myThemes.theme[c]._ID;
    }
   

    let labelLevel=ultimateHTMLGenerator("label","NIVEAU",[],rowSelect);
    //mon input qui va avec le label niveau
    let inputLevel=ultimateHTMLGenerator("input","",["input"],rowSelect);
    //possibilité de faire ça ?
    inputLevel.type="number";
    inputLevel.id="EXERCICE"+"_NIVEAU";

    let labelLink=ultimateHTMLGenerator("label","LIEN",[],rowSelect);
    //mon input qui va avec le label niveau
    let inputLink=ultimateHTMLGenerator("input","",["input"],rowSelect);
    inputLink.type="url";
    inputLink.id="EXERCICE"+"_LIEN";

    let rowLabel = ultimateHTMLGenerator("row","",[],myContainer);
    //colonne label "enoncé exercice" 
    let columnLabel1=ultimateHTMLGenerator("col-4","",[],rowLabel);
    let labelOrder=ultimateHTMLGenerator("label","ENONCE EXERCICE",[],columnLabel1);

    //colonne label "reponse attendu" 
    let columnLabel2=ultimateHTMLGenerator("col-4","",[],rowLabel);
    let labelExpectedResponse=ultimateHTMLGenerator("label","REPONSE ATTENDU",[],columnLabel2);
    //colonne label "propositions reponses"

    let columnLabel3=ultimateHTMLGenerator("col-4","",[],rowLabel);
    let labelSuggestion=ultimateHTMLGenerator("label","PROPOSITIONS REPONSES",[],columnLabel3);

    //Ligne ou se trouve les 3 colonnes avec chaqune leur label (enoncé, reponse attendu, proposition)
    let rowInputFields = ultimateHTMLGenerator("row","",[],myContainer);

    //1ere colonne qui contient l'input en rappo "enoncé exercice" 
    let columnInput1=ultimateHTMLGenerator("col-4","",[],rowInputFields);
    let inputOrder=ultimateHTMLGenerator("textarea","",["textarea"],columnInput1);
    inputOrder.id="EXERCICE"+"_CONSIGNE";

    //2eme colonne qui contient l'input en rapport avec le label "reponse attendu" 
    let columnInput2=ultimateHTMLGenerator("col-4","",[],rowInputFields);
    let inputExpectedResponse=ultimateHTMLGenerator("textarea","",["textarea"],columnInput2);
    inputExpectedResponse.id="EXERCICE"+"_REPONSEATTENDU";

    //3eme colonne qui contient les suggextions en rapport avec le label "propositions reponses"
    let columnInput3=ultimateHTMLGenerator("col-4","",[],rowInputFields);
    //dans php il s'agit de "reponse" lié à l'id d'un exercice
        let addButton= ultimateHTMLGenerator("button","+",["col","btn","btn-success"],columnInput3);
    let inputSuggestion1=ultimateHTMLGenerator("input","",["input"],columnInput3);
    //ici l'id pouvoir permettre de recuperer la valeur tapé par l'utilisateur
    inputSuggestion1.id="REPONSE"+"_DESCRIPTION"+1;

    addButton.onclick = function(){
        //sert à créer un id unique lors de chaque creation d'input
        compteurInput++;
        let inputSuggestion1=ultimateHTMLGenerator("input","",["input"],columnInput3);
        inputSuggestion1.id="REPONSE"+"_DESCRIPTION"+compteurInput;
    }
    //4 INPUTS reboucler sur les 4  ppour recup les valeurs if guillemet remplis  
    let rowButtonV=ultimateHTMLGenerator("row","",[],myContainer); 
    let buttonValidate= ultimateHTMLGenerator("button","Valider",["col","btn","btn-success"],rowButtonV);
    buttonValidate.id="buttonValidate";
    //je passe en paramettre de ma fonction modifierInput la valeur de mon id 
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

//faire attention au "valide" si pas tout les parametre risque que ça ne marche pas 
function creationExercice(nom,consigne,reponseattendu,niveau,lien,theme){
    console.log(theme);
    console.log(consigne);
   

    //console.log(); a faire ici
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            //si la réponse n'est pas un nombre 
            // si jamais la requette à planté et quelle renvoi erreur404 c'est pas un nombre mais une chaine de caractere
            if(isNaN(è)){
                // si pas un nombre on ne fait rien
             }else{
                // si c'est un nompbre 
                for(let i=1; i<=compteurInput;i++){
                    //recupère la valeur des inputs tapé par l'utilisateur 
                    let descri = document.getElementById("REPONSE"+"_DESCRIPTION"+i).value;
                    //on passe en paramettre la variable descri + l'id de l'exercice (ici le xhrresponseText renvois vers le web service create_exercice et donc récupère l'id de l'exercicé créer)
                    createReponse(descri, xhr.responseText);
                }
             }
        }
    }
    //lien vers mon web service create_exercice sur mon serveur (attention)
    xhr.open('POST', 'http://141.94.223.96/Chloe/MasterClasse/php/webservice/ws_create_exercice.php', true);
    //toujours la même chose
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // on envois tout ce qui est passé en parametre
    xhr.send("nom="+nom
    +"&consigne="+consigne
    +"&reponseAttendu="+reponseattendu
    +"&niveau="+niveau
    +"&lien="+lien
    +"&id_theme="+theme
    +"&valide="+0);
}

function createReponse(descri, id_exo){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
           
        }
    }
    //lien vers mon web service create_exercice sur mon serveur (attention)
    xhr.open('POST', 'http://141.94.223.96/Chloe/MasterClasse/php/webservice/ws_create_reponse.php', true);
    //toujours la même chose
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // on envois tout ce qui est passé en parametre
    xhr.send("description="+descri
    +"&id_exercice="+id_exo);
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