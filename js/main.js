let mesExercices = {};
let mesThemes = {};

//creation container dans le body//
let cont = document.createElement("div");
cont.classList.add("container-fluid");
document.body.appendChild(cont);


function tableau_exercice_stagiaire(){

    //efface le container avant d'afficher la page
    cont.innerHTML = "";

    //creation d'un tableau boostraps ! //

    //creation d'un element html table dans le container//
    let tableExercice = ultimateHTMLGenerator("table","", ["table","table-hover","autorisation","my-auto","text-center","mx-5","table-responsive-md"],cont);
    //creation de l'element thead dans la variable tableau //
    let headTable = ultimateHTMLGenerator("thead","", [],tableExercice);
    //creation d'un element html "tr" dans la variable TheadTableau // 
    let headRow= ultimateHTMLGenerator("tr","", [],headTable);
    //creation d'un element html "th" dans la variable TrThead // 
    let columHead1= ultimateHTMLGenerator("th","EXERCICES", ["col-4"],headRow);
    columHead1.scope = "col";
    //creation d'un element html "th" dans la variable TrThead // 
    let columHead2= ultimateHTMLGenerator("th","NIVEAU", ["col-4"],headRow);
    columHead2.scope = "col";
    //creation d'un element html "th" dans la variable TrThead // 
    let columHead3= ultimateHTMLGenerator("th","THEMES", ["col-4"],headRow);
    columHead3.scope = "col";
    //creation d'un element html "tbody" dans la variable Tableau // 
    let bodyTable= ultimateHTMLGenerator("tbody","", [],tableExercice);
    bodyTable.scope = "row";

    //Pour tous les exercices je créer une ligne dans le tableau //
    for (let i = 0; i <mesExercices.Exercice.length; i++) {
//creation d'un element html "th" dans la variable Tableau // 

//creation d'un element html "tr" dans la variable tableau // 
    let rowTable= ultimateHTMLGenerator("tr","", [],bodyTable);
    rowTable.addEventListener("click",function(){gotoExercice(mesExercices.Exercice[i]._ID)})
    //creation d'un element html "td" dans la variable th_row et affichage des noms des exercices// 
    let valueColum1= ultimateHTMLGenerator("td",mesExercices.Exercice[i]._NOM ,[],rowTable);
    valueColum1.classList = "table-secondary";
    //creation d'un element html "td" dans la variable th_row et affichage des niveau// 
    let valueColum2= ultimateHTMLGenerator("td",mesExercices.Exercice[i]._NIVEAU ,[],rowTable);
    valueColum2.classList = "table-dark";
    //creation d'un element html "td" dans la variable th_row et affichage des themes// 
    let montheme = findTheme(mesExercices.Exercice[i]._ID_THEME);
     let valueColum3= ultimateHTMLGenerator("td", montheme,[],rowTable);
     valueColum3.classList="table-secondary";
    
    
    }
}

//envoi le parametre id  de l'exercice selectionné afin d'afficher le contenu dans la page correspondant //
function gotoExercice(idExercice){
    window.location = "http://141.94.223.96/Vincent/MasterClasse/html/affichage_exercice_stagiaire.html";
}


//fonction pour récupérer le nom du themes selon l'ID de l'exercice //
function findTheme(id){
    for (let y = 0; y <mesThemes.theme.length; y++) { 
        if(mesThemes.theme[y]._ID == id){ 
            return mesThemes.theme[y]._NOM;
        }
}

}

//fonction qui récupère les exercices et qui passe les autres fonctions de la page //
function load_Exercice() {
    cont.innerHTML="";
    document.getElementById("container_ALPHA").innerHTML="";
    // on fait un xml httprequest -> envoie une demande à un webservice
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        // quand on reçois une réponse "fini" du notre requete
        if (xhr.readyState == XMLHttpRequest.DONE) {
            mesExercices = JSON.parse(xhr.responseText);
            console.log(mesExercices);
            load_Theme();
            //
        }
    }
    //ici  l'adresse url du web service
    xhr.open('POST', 'http://141.94.223.96/Vincent/MasterClasse/php/webservice/ws_read_exercice.php', true);
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
            mesThemes = JSON.parse(xhr.responseText);
            console.log(mesThemes);
            tableau_exercice_stagiaire();
        }
    }
    //ici  l'adresse url du web service
    xhr.open('POST', 'http://141.94.223.96/Vincent/MasterClasse/php/webservice/ws_read_theme.php', true);
    // toujours la même chose
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // on oublie pas d'envoyer les paramètres sous forme de chaine de caractères et non du json
    xhr.send();
}

//fonction globale pour fabriquer un element html,lui appliquer du css et l'afficher //
function ultimateHTMLGenerator(typeElement,contenu,tableauClassCss,destinationElement){
var ultimateElement = document.createElement(typeElement);
ultimateElement.textContent = contenu;
for(var i = 0;i<tableauClassCss.length;i++){
ultimateElement.classList.add(tableauClassCss[i]);
}
// on fait apparaitre l'element dans celui passé en 4ème paramètre
destinationElement.appendChild(ultimateElement);
return ultimateElement;
}
