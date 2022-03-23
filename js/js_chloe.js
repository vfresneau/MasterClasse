//________________________________________DECLARATION VARIABLES_______________________________________________________
let myExercice = {};
let whiteBlockTitle;
let tableAnswers = [];
let myAnswer=[];
let myThemes;
let myIdTheme;
//Lors de l'ouverture de cette page, je lui extrait les parametres
//
//creation d'une Instance URL avec un parametre dans searchParams ??
let params = (new URL(document.location)).searchParams;
// lie à params l'id Exercice de la page dans une variable param1 (dans l'adresse url)//
let param1 = params.get("param1"); 

//fonction pour retrouver l'Id de l'exercice correspondant, passer en parametre dans la fonction gotoExercice -> "main.js"//
function retrieveExercice(idExercice){

    for (let y = 0; y <myExercice.Exercice.length; y++) {
    //Si l'idExercice transmis est identique à celui d'un exercice du tableau Exercice : //
    if(myExercice.Exercice[y]._ID == idExercice){ 
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
for (let x=0; x <tableAnswers .length; x++){
    myAnswer.push(tableAnswers [x]._DESCRIPTION);
}

//Envoie dans le tableau myAnswer le tableau de reponse //
myAnswer.push(correctAnswers);
}

//retrouve le theme en fonction de l'exercice en cours //
function Retrieve_Id_Themes(myIdTheme){

    for (let i=0; i<myThemes.theme.length; i++) {
    //Si l'idExercice transmis est identique à celui d'un exercice du tableau Exercice : //
    if(myThemes.theme[i]._ID == myIdTheme){ 
    //je créer une variable pour mettre les elements dont j'ai besoin //
    myThemes= myThemes.theme[i]._NOM;
    break;
    }
}
}

ReadExerciceStagiaire(); //lance la page //

let container = document.createElement("div");
container.classList.add("container-fluid");
document.body.appendChild(container);

//J'utilise une fonction pour afficher mon block contenant l'exercice.
function myBlock(){

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
    let paragraph1_theme_level =ultimateHTMLGenerator("p","THEME:"+myThemes+"NIVEAU:"+ myLevel,["text-light","d-flex","justify-content-center"],LineInstructions);
    let paragrap2_instructions =ultimateHTMLGenerator("p",instructions,["text-light"],LineInstructions);

    let ColumExercice=ultimateHTMLGenerator("div","",["col-12"],whiteBlock);
    ColumExercice.id="ColumExercice";
    // let colonneImageGJ=ultimateHTMLGenerator("div","",["col-6"],whiteBlock);
    let ColumButton=ultimateHTMLGenerator("div","",["col-6"],whiteBlock);


 //J'utilise une boucle for pour y faire apparaitre les proposition de réponse
    for(j=0; j<myAnswer.length;j++){
    //create a inputGroup 

    let inputGroup =ultimateHTMLGenerator("div","",["form-check"],ColumExercice);
    
    //Create a input type checkbox //
    let InputCheckbox =ultimateHTMLGenerator("input","",["form-check-input", "mt-0"],inputGroup);
    InputCheckbox.type = "checkbox";
    
    InputCheckbox.id = j+"checkboxId";
    InputCheckbox.addEventListener("click", function(){verificator(InputCheckbox.id,LabelCheckbox.id)});

    let LabelCheckbox =ultimateHTMLGenerator("label",myAnswer[j],["form-check-label"],inputGroup);
    LabelCheckbox.id = j+"LabelId";
    }

    //I create a button for go to the next exercice //
    let NextButton=ultimateHTMLGenerator("button","Exercice suivant",["btn"],ColumButton);
    NextButton.id="NextButton1";
}


//fonction qui verifie si l'on as la bonne réponse ou non // 
function verificator (checkboxId,LabelId){ //A FINIR !!! //
    //si cette ligne est cochée //
    
if (document.getElementById(checkboxId).checked === true && document.getElementById(LabelId).textContent == correctAnswers)  {
     //et 
     console.log(checkboxId,LabelId);


    //afficher good-job // 
   

    //Sinon affiche : myExercice.Exercice[y]._REPONSEATTENDU //
}
}
  // c'est ensuite ici que dans le if (si la reponse selectionné est bonne ça affiche GOOD JOB)

    // c'est ensuite ici que dans le else (sinon la reponse selectionné est mauvaise ça affiche la correction dans un cadre rouge)

    

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

//___________________________________________WEBSERVICE POUR LIRE LES EXERCICES_______________________________

function ReadExerciceStagiaire() {
    // on fait un xml httprequest -> envoie une demande à un webservice
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        // quand on reçois une réponse "fini" du notre requete
        if (xhr.readyState == XMLHttpRequest.DONE) {
        myExercice = JSON.parse(xhr.responseText);
        //verification si je reçois bien mon webService //
        console.log(myExercice);
        //appelle la fonction "retrieveExercice" et lui passe la variable param1//
        retrieveExercice(param1);
        //appelle la fonction 
        ReadTheme();
        
        }
    }
    //ici  l'adresse url du web service
    xhr.open('POST', 'http://141.94.223.96/Vincent/MasterClasse/php/webservice/ws_read_exercice.php', true);
    // toujours la même chose
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // on oublie pas d'envoyer les paramètres sous forme de chaine de caractères et non du json
    xhr.send();
}

function ReadTheme() {
    // on fait un xml httprequest -> envoie une demande à un webservice
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        // quand on reçois une réponse "fini" du notre requete
        if (xhr.readyState == XMLHttpRequest.DONE) {
        myThemes= JSON.parse(xhr.responseText);
        //verification si je reçois bien mon webService //
        console.log(myThemes);
        Retrieve_Id_Themes(myIdTheme);
        myBlock();
        
        }
    }
    //ici  l'adresse url du web service
    xhr.open('POST', 'http://141.94.223.96/Vincent/MasterClasse/php/webservice/ws_read_theme.php', true);
    // toujours la même chose
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // on oublie pas d'envoyer les paramètres sous forme de chaine de caractères et non du json
    xhr.send();
}