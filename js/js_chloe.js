//________________________________________POUR MES OBJECTS_______________________________________________________
let mesExercices = {};

/*Appel de la fonction pour lire les exercices */
/*load_Exercice();*/

let monContainer = document.createElement("div");
monContainer.classList.add("container-fluid");
document.body.appendChild(monContainer);

//___________________________________________FONCTION POUR LIRE LES EXERCICES_______________________________

function afficher_Exercice() {
    // on fait un xml httprequest -> envoie une demande à un webservice
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        // quand on reçois une réponse "fini" du notre requete
        if (xhr.readyState == XMLHttpRequest.DONE) {
            mesExercices = JSON.parse(xhr.responseText);
            console.log(mesExercices);
            console.log(idExercice);
            monBlock();
        }
    }
    //ici  l'adresse url du web service
    xhr.open('POST', 'http://141.94.223.96/Chloe/MasterClasse/php/webservice/ws_read_exercice.php', true);
    // toujours la même chose
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // on oublie pas d'envoyer les paramètres sous forme de chaine de caractères et non du json
    xhr.send();
}
//J'utilise une fonction pour afficher mon block contenant l'exercice.
monBlock();

function monBlock(){
    //Je créer une ligne qui contiendra tout mon exercice
    let monBlockBlanc = ultimateHTMLGenerator("div","",["row","bg-light"],monContainer);
    monBlockBlanc.id="blockBlanc";
    //Mon block exercice est composé d'un titre de niveau 4
    let titreExercice = ultimateHTMLGenerator("h4","Ici s'affichera le titre de l'exercice en cours",[],monBlockBlanc);
    titreExercice.id="titreExercice";
    //De colonnes et lignes pour y mettre mes contenus (paragraphe, theme, consigne)
    let colonneExercice=ultimateHTMLGenerator("div","",["col-12"],monBlockBlanc);
    let maLigneConsigne =ultimateHTMLGenerator("div","",["row"],colonneExercice);
    maLigneConsigne.id="ligneConsigne";
    let monParagraphe =ultimateHTMLGenerator("p","Ici s'affichera QUESTIONNAIRE suivi du theme",["text-light"],maLigneConsigne);
    let monTheme =ultimateHTMLGenerator("p","Ici s'affichera la consigne",["text-light"],maLigneConsigne);
    let colonneExo=ultimateHTMLGenerator("div","",["col-12"],monBlockBlanc);
    colonneExo.id="colonneExo";
    let colonneImageGJ=ultimateHTMLGenerator("div","",["col-6"],monBlockBlanc);
    let colonneBouton=ultimateHTMLGenerator("div","",["col-6"],monBlockBlanc);
    //J'utilise une boucle for pour y faire apparaitre les proposition à mes questions
    for(i=0; i<4;i++){
        let inputGroup =ultimateHTMLGenerator("div","",["input-group"],colonneExo);
        let inputGroupText =ultimateHTMLGenerator("div","",["input-group-text"],inputGroup);
        let monInputCoche =ultimateHTMLGenerator("input","",["form-check-input", "mt-0"],inputGroupText);
        let monInput =ultimateHTMLGenerator("input","",["form-control"],inputGroup);
        monInput.value="Ici ma proposition";
    }
    //Je créer un bouton popur passer à l'exercice suivant
    let monBoutonSuivant=ultimateHTMLGenerator("button","Exercice suivant",["btn"],colonneBouton);
    monBoutonSuivant.id="boutonSuivant";
    // c'est ensuite ici que dans le if (si la reponse selectionné est bonne ça affiche GOOD JOB)
    // c'est ensuite ici que dans le else (sinon la reponse selectionné est mauvaise ça affiche la correction dans un cadre rouge)

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