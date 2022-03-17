let mesExercices = {};
let mesThemes = {};

// cont.innerHTML = "";

//creation container dans le body//
let cont = document.createElement("div");
cont.classList.add("container-fluid");
document.body.appendChild(cont);

load_Exercice();
load_Theme();

function tableau_exercice_stagiaire(){


    //creation d'un tableau boostraps ! //

    //creation d'un element html table dans le container//
    let tableau = ultimateHTMLGenerator("table","", ["table","table-hover","autorisation","my-auto","text-center","mx-5","table-responsive-md"],cont);
    //creation de l'element thead dans la variable tableau //
    let theadTableau = ultimateHTMLGenerator("thead","", [],tableau);
    //creation d'un element html "tr" dans la variable TheadTableau // 
    let trThead= ultimateHTMLGenerator("tr","", [],theadTableau);
    //creation d'un element html "th" dans la variable TrThead // 
    let thcol1Tableau= ultimateHTMLGenerator("th","EXERCICES", ["col-4"],trThead);
    thcol1Tableau.scope = "col";
    //creation d'un element html "th" dans la variable TrThead // 
    let thcol2Tableau= ultimateHTMLGenerator("th","NIVEAU", ["col-4"],trThead);
    thcol2Tableau.scope = "col";
    //creation d'un element html "th" dans la variable TrThead // 
    let thcol3Tableau= ultimateHTMLGenerator("th","THEMES", ["col-4"],trThead);
    thcol3Tableau.scope = "col";

    
    
    //Pour tous les exercices je créer une ligne dans le tableau //
    for (let i = 0; i <mesExercices.Exercice.length; i++) {
        
//creation d'un element html "th" dans la variable Tableau // 
    let tbody= ultimateHTMLGenerator("tbody","", [],tableau);
    tbody.scope = "row";
    
//creation d'un element html "tr" dans la variable tableau // 
    let trTbody= ultimateHTMLGenerator("tr","", [],tableau);

    //creation d'un element html "th" dans la variable  trTbody// 
    let th_row= ultimateHTMLGenerator("th","", [],trTbody);
    th_row.scope = "col";

    //creation d'un element html "td" dans la variable th_row et affichage des noms des exercices// 
    let td_Exercice_tableau= ultimateHTMLGenerator("td",mesExercices.Exercice[i]._NOM ,[],th_row);
    //creation d'un element html "td" dans la variable th_row et affichage des niveau// 
    let td_Niveau_tableau= ultimateHTMLGenerator("td",mesExercices.Exercice[i]._NIVEAU ,[],th_row);
    //creation d'un element html "td" dans la variable th_row et affichage des themes// 
    let td_Theme_tableau= ultimateHTMLGenerator("td",mesThemes.theme[i]._NOM ,[],th_row);

    }
}





//chemin :mesExercices.Exercice[0]._NOM     //


function load_Exercice() {
    // on fait un xml httprequest -> envoie une demande à un webservice
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        // quand on reçois une réponse "fini" du notre requete
        if (xhr.readyState == XMLHttpRequest.DONE) {
            mesExercices = JSON.parse(xhr.responseText);
            console.log(mesExercices);
            tableau_exercice_stagiaire();
        }
    }
    //ici  l'adresse url du web service
    xhr.open('POST', 'http://141.94.223.96/Vincent/MasterClasse/php/webservice/ws_read_exercice.php', true);
    // toujours la même chose
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // on oublie pas d'envoyer les paramètres sous forme de chaine de caractères et non du json
    xhr.send();
}

function load_Theme() {
    // on fait un xml httprequest -> envoie une demande à un webservice
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        // quand on reçois une réponse "fini" du notre requete
        if (xhr.readyState == XMLHttpRequest.DONE) {
            mesThemes = JSON.parse(xhr.responseText);
            console.log(mesThemes);
        
        }
    }
    //ici  l'adresse url du web service
    xhr.open('POST', 'http://141.94.223.96/Vincent/MasterClasse/php/webservice/ws_read_theme.php', true);
    // toujours la même chose
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // on oublie pas d'envoyer les paramètres sous forme de chaine de caractères et non du json
    xhr.send();
}






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





































