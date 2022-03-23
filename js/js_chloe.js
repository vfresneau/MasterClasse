//________________________________________DECLARATION VARIABLES_______________________________________________________
let mesExercices = {};
let titreBlockBlanc;
let monTableauReponse= [];
let mesReponses=[];

//Lors de l'ouverture de cette page, je lui extrait les parametres
//
//creation d'une Instance URL avec un parametre dans searchParams ??
let params = (new URL(document.location)).searchParams;
// lie à params l'id Exercice de la page dans une variable param1 (dans l'adresse url)//
let param1 = params.get("param1");


//fonction pour retrouver l'Id de l'exercice correspondant, passer en parametre dans la fonction gotoExercice -> "main.js"//
function retrieveExercice(idExercice){
    
    for (let y = 0; y <mesExercices.Exercice.length; y++) {
        //Si l'idExercice transmis est identique à celui d'un exercice du tableau Exercice : //
        if(mesExercices.Exercice[y]._ID == idExercice){ 
        //je créer une variable pour mettre les elements dont j'ai besoin //
        
        monTitre = mesExercices.Exercice[y]._NOM;
        mesConsignes = mesExercices.Exercice[y]._CONSIGNE;
        monNiveau = mesExercices.Exercice[y]._NIVEAU;
        monTableauReponse = mesExercices.Exercice[y]._REPONSES;
    }
}
//pour tous les elements du tableau REPONSES, je selectionne toutes les descriptions //
for (let x=0; x <monTableauReponse.length; x++){
    mesReponses.push(monTableauReponse[x]._DESCRIPTION);
    //verification visuel de mesReponses //
    console.log(mesReponses);
    }
}

afficher_Exercice(); // lance la page //

let monContainer = document.createElement("div");
monContainer.classList.add("container-fluid");
document.body.appendChild(monContainer);

//J'utilise une fonction pour afficher mon block contenant l'exercice.

function monBlock(){

    //Je créer une ligne qui contiendra tout mon exercice
    let monBlockBlanc = ultimateHTMLGenerator("div","",["row","bg-light"],monContainer);
    monBlockBlanc.id="blockBlanc";
    //Mon block exercice est composé d'un titre de niveau 4
    let titreExercice = ultimateHTMLGenerator("h4",monTitre,[],monBlockBlanc);
    titreExercice.id="titreExercice";
    //Des colonnes et lignes pour y mettre mes contenus (paragraphe, theme, consigne)//
    let colonneExercice=ultimateHTMLGenerator("div","",["col-12"],monBlockBlanc);
    let LigneConsigne =ultimateHTMLGenerator("div","",["row"],colonneExercice);
    LigneConsigne.id="ligneConsigne";
    //creation de paragraphe pour mettre le theme et le niveau de l'exercice //
    let paragraphe1_theme_niveau =ultimateHTMLGenerator("p","themes: "+"NIVEAU:"+ monNiveau,["text-light","d-flex","justify-content-center"],LigneConsigne);
    let paragraphe2_consigne =ultimateHTMLGenerator("p",mesConsignes,["text-light"],LigneConsigne);

    let colonneExo=ultimateHTMLGenerator("div","",["col-12"],monBlockBlanc);
    colonneExo.id="colonneExo";
    let colonneImageGJ=ultimateHTMLGenerator("div","",["col-6"],monBlockBlanc);
    let colonneBouton=ultimateHTMLGenerator("div","",["col-6"],monBlockBlanc);

    //J'utilise une boucle for pour y faire apparaitre les proposition à mes questions
        for(j=0; j<mesReponses.length;j++){

        let inputGroup =ultimateHTMLGenerator("div","",["input-group"],colonneExo);
        let inputGroupText =ultimateHTMLGenerator("div","",["input-group-text"],inputGroup);
        let monInputCoche =ultimateHTMLGenerator("input","",["form-check-input", "mt-0"],inputGroupText);
        // monInputCoche.addEventListener("");
        let paraReponse =ultimateHTMLGenerator("p",mesReponses[j],[],inputGroup);
        }

    //Je créer un bouton pour passer à l'exercice suivant
    let monBoutonSuivant=ultimateHTMLGenerator("button","Exercice suivant",["btn"],colonneBouton);
    monBoutonSuivant.id="boutonSuivant";

    // c'est ensuite ici que dans le if (si la reponse selectionné est bonne ça affiche GOOD JOB)
    // c'est ensuite ici que dans le else (sinon la reponse selectionné est mauvaise ça affiche la correction dans un cadre rouge)
    
}
 

//___________________________________________WEBSERVICE POUR LIRE LES EXERCICES_______________________________

function afficher_Exercice() {
    // on fait un xml httprequest -> envoie une demande à un webservice
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        // quand on reçois une réponse "fini" du notre requete
        if (xhr.readyState == XMLHttpRequest.DONE) {
            mesExercices = JSON.parse(xhr.responseText);
            //verification si je reçois bien mon webService //
            console.log(mesExercices);
            //appelle la fonction "retrieveExercice" et lui passe la variable param1//
            retrieveExercice(param1);
            //appelle la fonction "monBlock" 
            monBlock();

        }
    }
    //ici  l'adresse url du web service
    xhr.open('POST', 'http://141.94.223.96/Vincent/MasterClasse/php/webservice/ws_read_exercice.php', true);
    // toujours la même chose
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // on oublie pas d'envoyer les paramètres sous forme de chaine de caractères et non du json
    xhr.send();
}

//_____________________________________FONCTION ULTIMATE GENERATOR_______________________________________

function ultimateHTMLGenerator(typeElement,contenu,tableauClassCss,destinationElement){  //on créer un élement html donné en paramètre (1er paramètre)                      
    
    let ultimateElement = document.createElement(typeElement); //on attribut du contenu (paramètre 2) à l'element html précedement fabriqué                                                   
    ultimateElement.textContent = contenu;                    //on souhaite ajouter plusieurs class CSS à l'element html précedement créé
    
    for(let i = 0;i<tableauClassCss.length;i++){             //on ajoute la class css contenu dans le tableau de class css (3ème paramètre)
        ultimateElement.classList.add(tableauClassCss[i]);  //on ajoute une classList à la variable ultimateElement
    }
    
    destinationElement.appendChild(ultimateElement);      //on fait apparaitre l'élement dans celui passé en 4ème paramètre
    return ultimateElement;
}