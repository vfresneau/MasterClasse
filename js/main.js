let mesExercices = {};








// function afficheTableau() {

//     // cont.innerHTML = "";


//     //Pour tous les scenarios créer, je fabrique mes cards et jumbotron avec les details //
//     for (let i = 0; i <.length; i++) {
load_Exercice();

//creation container dan sle body//
let cont = document.createElement("div");
cont.classList.add("container-fluid");
document.body.appendChild(cont);


function tableau_exercice_stagiaire(){

    //creation d'un element html table dans le container//
    let tableau = ultimateHTMLGenerator("table","", ["table","table-hover","autorisation","my-5","text-center","table-responsive-md"],cont);
    //creation de l'element thead dans la variable tableau //
    let theadTableau = ultimateHTMLGenerator("thead","", [""],tableau);
    //creation d'un element html "tr" dans la variable TheadTableau // 
    let trTableau= ultimateHTMLGenerator("tr","", [""],theadTableau);
    //creation d'un element html "th" dans la variable TrTableau // 
    let th1Tableau= ultimateHTMLGenerator("th","EXERCICES", [""],trTableau);
    th1Tableau.scope = "col";
    //creation d'un element html "th" dans la variable TrTableau // 
    let th2Tableau= ultimateHTMLGenerator("th","NIVEAU", [""],trTableau);
    th2Tableau.scope = "col";
    //creation d'un element html "th" dans la variable TrTableau // 
    let th3Tableau= ultimateHTMLGenerator("th","THEMES", [""],trTableau);
    th3Tableau.scope = "col";
    
    


}    



// { <table class="">
//                     <thead>
//                         <tr>
//                             <th scope="col">EXERCICES</th>
//                             <th scope="col">NIVEAU</th>
//                             <th scope="col">THEMES</th>
//                         </tr>
//                     </thead>
//                     <tbody id="Tbody">
//                         <tr id="tableauR">
//                             <th scope="row">1</th>
//                             <td>Mark</td>
//                             <td>Otto</td>
//                         </tr>
//                     </tbody> }








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





































