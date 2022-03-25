//___________________________________________WEBSERVICE POUR CREER LES EXERCICES_______________________________
let myExercice={};
let myThemes;

//appel de mon container pour afficher ce qu'il y a dedans grace à la fonction  create_Exercice();
let myContainer=document.getElementById("myContainerCreateExercice");

//Recupération de l'id du lien de contact pour y ajouter la fonction onclick afin d'afficher l'alerte de contact
let myLinkContact=document.getElementById("link_contact");
myLinkContact.onclick = function() { alert("Téléphone : 02.47.39.24.01"+"\n"+"Mail : formation.dev@mail.fr"); };

ReadTheme();

//_________________________________REQUETE AJAX_____________________________
function ReadTheme() {
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

    inputSuggestion1.id="REPONSE"+"_DESCRIPTION"+1;
    inputSuggestion2.id="REPONSE"+"_DESCRIPTION"+2;
    inputSuggestion3.id="REPONSE"+"_DESCRIPTION"+3;
    inputSuggestion4.id="REPONSE"+"_DESCRIPTION"+4;


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
        selectTheme.value,
        document.getElementById("REPONSE"+"_DESCRIPTION"+1),
        document.getElementById("REPONSE"+"_DESCRIPTION"+2),
        document.getElementById("REPONSE"+"_DESCRIPTION"+3),
        document.getElementById("REPONSE"+"_DESCRIPTION"+4));
    };
}

//faire attention au "valide" si pas tout les parametre risque que ça ne marche pas 
function creationExercice(nom,consigne,reponseattendu,niveau,lien,theme,suggestion1,suggestion2,suggestion3,suggestion4){
    console.log(theme);
    console.log(consigne);
   

    //console.log(); a faire ici
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            
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
    +"&theme="+theme
    +"&suggestion1="+suggestion1
    +"&suggestion2="+suggestion2
    +"&suggestion3="+suggestion3
    +"&suggestion4="+suggestion4
    +"&valide="+0);
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