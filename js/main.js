let tableau;


let TableauBody = document.getElementById("Tbody");


// function afficheTableau() {
    
//     // cont.innerHTML = "";


//     //Pour tous les scenarios créer, je fabrique mes cards et jumbotron avec les details //
//     for (let i = 0; i <.length; i++) {

//        let tableau = ultimateHTMLGenerator("th", "", [""], cont);
// tableau.scope = "row";







//  <tr>
//  <th scope="row">1</th>
//  <td>Mark</td>
//  <td>Otto</td>
// </tr>


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





































