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