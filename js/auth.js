// on récupère le toaster (le container des toasts)
let toaster = document.getElementById("toastContainer");
// on récupe le container
let cf = document.getElementById("cf");
// on stocke les champs
let champs =[];
// le nom du cookie
const COOKIE_NAME = "JWT_AUTH_COOKIE";

// Au lancement on vérifie si on est connecté ou non
isConnected();

//_________________________________________________________________________
// FABRIQUE DU HTML
//_________________________________________________________________________
// Génère le login
function generateLogin(){
    cf.innerHTML = "";
    let in1 = ElementGenerator("input","",[],cf);
    in1.placeholder = "mettre test";
    in1.type = "text";
    in1.id="login";

    let in2 = ElementGenerator("input","",[],cf);
    in2.placeholder = "mettre test";
    in2.type = "password";
    in2.id="password"

    let btt = ElementGenerator("button","Connexion",["btn", "btn-primary"],cf);
    btt.addEventListener("click", function(){
        connexion();
    })
}
//_________________________________________________________________________
// Fonction affichant les champs sur la page
function generate(){
    cf.innerHTML="";
    let maRow;
    for(let i=0; i<champs.length;i++) {
        // Tout les 12
        if(i%6 ==0){
            maRow = ElementGenerator("div","",["row"],cf);
        }
        let maCol = ElementGenerator("div","",["col-2"],maRow);
        //on fabrique le bouton supprimer
        let delButton = ElementGenerator("button","X",["btn", "btn-danger"],maCol);
        // on fabrique un id unique
        delButton.addEventListener("click", function(){
            DelElement(champs[i]._ID);
        });
        // On fabrique un span pour pouvoir lier l'event double clique dessus pour afficher le mode update
        let monsSpan = ElementGenerator("span",champs[i]._DESCRIPTION,[],maCol);
        // Quand on double click sur un champs 
        monsSpan.addEventListener("dblclick", function(){
            // on supprime le span actuel
            monsSpan.remove();
            // on genere un input avec un bouton
            let monInput = ElementGenerator("input","",[],maCol);
            monInput.value = champs[i]._DESCRIPTION;
            let updateBTN = ElementGenerator("button","modifier",["btn", "btn-primary"],maCol);
            // on fabrique un evenement click surlequel on lie la fonction update
            updateBTN.addEventListener("click", function(){
                update(champs[i]._ID, monInput.value);
            });
        });

       
    }
}
//_________________________________________________________________________
// XMLHTTPREQUEST HELPER
//_________________________________________________________________________
// limite la recopie du code
function XHR_entete_setter(xhr){
    xhr.setRequestHeader("Accept", "application/json");
    // Bien mettre le token d'authorisation dans Bearer --> récupération du cookie
    xhr.setRequestHeader("Authorization", "Bearer " + getCookie(COOKIE_NAME));
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    return xhr;
}



//_________________________________________________________________________
// CRUD
//_________________________________________________________________________

//_________________________________________________________________________
function create(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            // si la réponse et bien au format JSON avec le token standard de renvoie
            if(isResponseValide(xhr.responseText)){
                // on parse la réponse en JSON pour l'exploiter
                let retour = JSON.parse(xhr.responseText);
                // on affiche les messages
                displayAllMessage(retour);
                // si le code réponse personnalisé est égle à 200
                if(retour._CODE_REPONSE == "200"){
                    // on va de nouveau chercher les champs à afficher
                    getAllChamps();
                    // on vide le champs
                    document.getElementById("inputChamps").value = "";
                }
            }
        }
    }
    xhr.open('POST', ' http://141.94.223.96/Charley/secureToken/API/CHAMPS/CREATE_CHAMPS.php', true);
    xhr = XHR_entete_setter(xhr);
    xhr.send("description="+document.getElementById("inputChamps").value);
}

//_________________________________________________________________________
function update(id, descr){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            // si la réponse et bien au format JSON avec le token standard de renvoie
            if(isResponseValide(xhr.responseText)){
                // on parse la réponse en JSON pour l'exploiter
                let retour = JSON.parse(xhr.responseText);
                // on affiche les messages
                displayAllMessage(retour);
                // on va denouveau chercher les champs à afficher
                getAllChamps();
            }
        }
    }
    // ATTENTION, lorsqu'on utilise la méthode put, les paramètres doivents être envoyé dans l'URL
    xhr.open('PUT', ' http://141.94.223.96/Charley/secureToken/API/CHAMPS/UPDATE_CHAMPS.php?id='+id+'&&description='+descr, true);
    xhr = XHR_entete_setter(xhr);
    xhr.send();
}

//_________________________________________________________________________
function DelElement(id){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            // si la réponse et bien au format JSON avec le token standard de renvoie
            if(isResponseValide(xhr.responseText)){
                // on parse la réponse en JSON pour l'exploiter
                let retour = JSON.parse(xhr.responseText);
                // on affiche les messages
                displayAllMessage(retour);
                // on va denouveau chercher les champs à afficher
                getAllChamps();
            }
        }
    }
    // ATTENTION, lorsqu'on utilise la méthode delete, les paramètres doivents être envoyé dans l'URL
    xhr.open('DELETE', ' http://141.94.223.96/Charley/secureToken/API/CHAMPS/DELETE_CHAMPS.php?id='+id, true);
    xhr = XHR_entete_setter(xhr);
    xhr.send();
}

//_________________________________________________________________________
function getAllChamps(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            // si la réponse et bien au format JSON avec le token standard de renvoie
            if(isResponseValide(xhr.responseText)){
                // on parse la réponse en JSON pour l'exploiter
                let retour = JSON.parse(xhr.responseText);
                // on affiche les messages
                displayAllMessage(retour);
                // on stocke les champs de la réponse
                champs = retour._JSON_REPONSE;
                // enfin on génére l'affichage
                generate();
            }
        }
    }
    xhr.open('GET', 'http://141.94.223.96/Charley/secureToken/API/CHAMPS/RETREIVE_ALL_CHAMPS.php', true);
    xhr = XHR_entete_setter(xhr);
    xhr.send();
}


//_________________________________________________________________________
// LOGIN
//_________________________________________________________________________
function connexion(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            // si la réponse et bien au format JSON avec le token standard de renvoie
            if(isResponseValide(xhr.responseText)){
                // on parse la réponse en JSON pour l'exploiter
                let retour = JSON.parse(xhr.responseText);
                // on affiche les messages
                displayAllMessage(retour);
                // si code 200 alors la connexion à réussi
                if(retour._CODE_REPONSE == 200){
                    // on stocke alors le token dans un cookie pour une journée
                    setCookie(COOKIE_NAME, retour._JWT, 1);
                    //on affiche alors le menu
                     document.getElementById("menu").style.display="block";
                    // on appel alors la fonction pour récupéré les champs
                    getAllChamps();
                }
            }
        }
    }
    xhr.open('POST', 'http://141.94.223.96/Charley/secureToken/API/LOGIN/LOGIN.php', true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // pour l'envoie de paramètre rien ne change
    // ATTENTION on ne ce charge pas ici de la sécurité de l'envoi, il dois être gérer par le serveur via un cerificat SSL (pour éviter des attaques de type man-in-the-middle)
    xhr.send("login="+document.getElementById("login").value+"&&mdp="+document.getElementById("password").value);
}



//_________________________________________________________________________
// FONCTIONS SECURITE
//_________________________________________________________________________
// fonction appelé au lancement permettant de savoir si on est toujours connecté
function isConnected(){
    // Si le token existe
    if(getCookie(COOKIE_NAME)){
         //on affiche alors le menu
         document.getElementById("menu").style.display="block";
        // on tente de récup les champs
        getAllChamps();
    }else{
        //on cache alors le menu
        document.getElementById("menu").style.display="none";
        // on affiche le login
        generateLogin();
    }
}
//_________________________________________________________________________
// Cette fonction permet de savoir si la requete vers le serveur à renvoyé une réponse valide
// Si non elle affiche un toast d'erreur
function isResponseValide(response){
    try {
        // on tente de transformer la réponse en json
        monJson = JSON.parse(response);
        // on tente de savoir si il exist un attribut _JSON_REPONSE --> standard 
        if (typeof monJson._JSON_REPONSE == 'undefined') {
            toastGenerator("Erreur _JSON_REPONSE non trouvé", e, "danger", 10000);
            return false;
        }else{
            return true;
        }

    } catch(e) {
        // Si le chaine de retour n'est pas un json
        toastGenerator("Erreur JSON de retour non valide", e, "danger", 10000);
        return false;
    }
}

//_________________________________________________________________________
// fonction permettant de ce déconnecter
function deco(){
    eraseCookie(COOKIE_NAME);
    isConnected();
}

//_________________________________________________________________________
// fonctions pour les TOAST
//_________________________________________________________________________
// Fonction allant chercher les messages du la réponse json et les affiches
function displayAllMessage(retour){
    for(let i=0; i<retour._MESSAGES.length; i++){
        toastGenerator(retour._MESSAGES[i]._TITRE, retour._MESSAGES[i]._MESSAGE, retour._MESSAGES[i]._TYPE, 10000);
    }
}

//_________________________________________________________________________
function toastGenerator(titre, contenu, classType,timeout){
    // on fabrique un toast dans le container de toast (toaster)
    let myToast = document.createElement("div");
    myToast.classList.add("toast", "align-items-center", "text-white", "bg-"+classType, "border-0");
    myToast.role = "alert";
    myToast.ariaLive="assertive";
    myToast.ariaAtomic="true";
    
    let myToastH = document.createElement("div");
    myToastH.classList.add("toast-header");
    myToast.appendChild(myToastH);

    let toastStrong = document.createElement("div");
    toastStrong.classList.add("me-auto");
    toastStrong.textContent = titre;
    myToastH.appendChild(toastStrong);

    let btClose = document.createElement("button");
    btClose.classList.add("btn-close");
    // quand on clique sur le bouton on détruit
    btClose.addEventListener("click", function(){
        myToast.remove();
    });
    myToastH.appendChild(btClose);
    // on fabrique la div de contenu uniquement si il y en a à afficher
    if(contenu !== ""){
        let myToastB = document.createElement("div");
        myToastB.classList.add("toast-body");
        myToastB.textContent = contenu;
        myToast.appendChild(myToastB);
    }

    // on ajoute un toast au toaster
    toaster.appendChild(myToast);
    // on l'affiche
    var ttLeToaster = bootstrap.Toast.getOrCreateInstance(myToast) // Returns a Bootstrap toast instance
    ttLeToaster.show();

    // permet de nettoyer le html afin que les toasts ne ce cumule pas
    try{
        // dans un try car si l'utilisateur clique sur supprimer, cela genere une erreur
        setTimeout(function(){
            myToast.remove();
        }, timeout);
    }catch{

    }
    
}

//_________________________________________________________________________
//COOKIE
//_________________________________________________________________________
// Fonction permettant de remplir un cookie, 
// source https://stackoverflow.com/questions/14573223/set-cookie-and-get-cookie-with-javascript
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

//_________________________________________________________________________
// Fonction permettant de récupérer un cookie par son nom
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

//_________________________________________________________________________
// Fonction permettant de supprimer un cookie
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}




//_________________________________________________________________________
// GENERATEUR HTML
//_________________________________________________________________________
function ElementGenerator(TypeElement,Text,TabClassCSS,DestinationElement){
    let NewElement = document.createElement(TypeElement);
    NewElement.textContent = Text;
    for(let i = 0;i<TabClassCSS.length;i++){
        NewElement.classList.add(TabClassCSS[i]);
    }
    DestinationElement.appendChild(NewElement);
    return NewElement;
}