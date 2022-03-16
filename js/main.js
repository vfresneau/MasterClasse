let exercice = {};






// function afficheTableau() {

//     // cont.innerHTML = "";


//     //Pour tous les scenarios créer, je fabrique mes cards et jumbotron avec les details //
//     for (let i = 0; i <.length; i++) {

//je lie l'element html Tbody à ma variable Tableaubody //
let TableauBody = document.getElementById("Tbody");
//creation d'une ligne du tableau ....//
// let LigneDuTableau = ultimateHTMLGenerator("th", "", [""], TableauBody);
// LigneDuTableau.scope = "row";



load_Exercice();




function load_Exercice() {
    // on fait un xml httprequest -> envoie une demande à un webservice
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        // quand on reçois une réponse "fini" du notre requete
        if (xhr.readyState == XMLHttpRequest.DONE) {
            mesExercices = JSON.parse(xhr.responseText);
            console.log(mesExercices);
            // load_univers();
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





































