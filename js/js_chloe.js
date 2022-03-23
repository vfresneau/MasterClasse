//________________________________________DECLARATION VARIABLES_______________________________________________________
/*let mesExercices = {};
let titreBlockBlanc;
let monTableauReponse= [];
let mesReponses=[];

//Lors de l'ouverture de cette page, je lui extrait les parametres
//
//creation d'une Instance URL avec un parametre dans searchParams ??
let params = (new URL(document.location)).searchParams;
// lie à params l'id Exercice de la page dans une variable param1 (dans l'adresse url)//
let param1 = params.get("param1"); */


/*//fonction pour retrouver l'Id de l'exercice correspondant, passer en parametre dans la fonction gotoExercice -> "main.js"//
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
    
}*/
 

//___________________________________________WEBSERVICE POUR LIRE LES EXERCICES_______________________________

/*function afficher_Exercice() {
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
}*/


//___________________________________________WEBSERVICE POUR CREER LES EXERCICES_______________________________
let mesExercices={};

//appel de mon container pour afficher ce qu'il y a dedans grace à la fonction  create_Exercice();
let myContainer=document.getElementById("myContainerCreateExercice");

//appel de la fonction pour afficher ce que je fais
create_Exercice();

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
    //les option avec l'id theme pour pouvoir choisir un theme dans le selecteur
    let optionsTheme=ultimateHTMLGenerator("option","",[],selectTheme);
    optionsTheme.id="EXERCICE"+"_ID_THEME";
    //optionsTheme.value=mesExercices.Exercice.id_theme;

    let labelLevel=ultimateHTMLGenerator("label","NIVEAU",[],rowSelect);
    //mon input qui va avec le label niveau
    let inputLevel=ultimateHTMLGenerator("input","",["input"],rowSelect);
    //possibilité de faire ça ?
    inputLevel.type="text"+"number";
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
    let inputSuggestion1=ultimateHTMLGenerator("input","",["input"],columnInput3);
    let inputSuggestion2=ultimateHTMLGenerator("input","",["input"],columnInput3);
    let inputSuggestion3=ultimateHTMLGenerator("input","",["input"],columnInput3);
    let inputSuggestion4=ultimateHTMLGenerator("input","",["input"],columnInput3);
    //FAUT IL BIEN AJOUTER L'ID DE L'EXERCICE ?
    inputSuggestion1.id="REPONSE"+"_DESCRIPTION"+"_ID_EXERCICE";
    inputSuggestion2.id="REPONSE"+"_DESCRIPTION"+"_ID_EXERCICE";
    inputSuggestion3.id="REPONSE"+"_DESCRIPTION"+"_ID_EXERCICE";
    inputSuggestion4.id="REPONSE"+"_DESCRIPTION"+"_ID_EXERCICE";

    let rowButtonV=ultimateHTMLGenerator("row","",[],myContainer); 
    let buttonValidate= ultimateHTMLGenerator("button","Valider",["col","btn","btn-success"],rowButtonV);
    buttonValidate.id="buttonValidate";
    //je passe en paramettre de ma fonction modifierInput la valeur de mon id 
    buttonValidate.onclick = function(){creationExercice(0,
        document.getElementById("EXERCICE"+"_NOM").value,
        document.getElementById("EXERCICE"+"_CONSIGNE").value,
        document.getElementById("EXERCICE"+"_REPONSEATTENDU").value,
        document.getElementById("EXERCICE"+"_NIVEAU").value,
        document.getElementById("EXERCICE"+"_LIEN").value,
        document.getElementById("EXERCICE"+"_ID_THEME").value,
        0);
    };
}
//cette fonction doit ajouter les exercice au tableau de vincent dois je reprendre la sienne ou en créer une qui relis a la sienne ?
function creationExercice(id,nom,consigne,reponseattendu,niveau,lien,id_theme){
    console.log(consigne);
    //console.log(); a faire ici
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            //ici fonction qui doit afficher les exercices dans le tableau de vincent
            //tableau_exercice_stagiaire();
        }
    }
    //lien vers mon web service create_exercice sur mon serveur (attention)
    xhr.open('POST', 'http://141.94.223.96/Chloe/MasterClasse/php/webservice/ws_create_exercice.php', true);
    //toujours la même chose
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // on envois tout ce qui est passé en parametre
    xhr.send("nom="+nom
    +"&consigne="+consigne
    +"&reponseattendu="+reponseattendu
    +"&niveau="+niveau
    +"&lien="+lien
    +"&id_theme="+id_theme);
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