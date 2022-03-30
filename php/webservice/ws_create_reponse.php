<?php
//I call on files includes
require_once("../includes/config.php");
//I create an instance of JWT class for use his fonctions
$JWT= new JWT();
 //I call an fonction of token verification to have access at this webservice
$JWT-> testTokenExitValide();

//je créer une instance de la classe reponse
$maReponse =  new Reponse();
//on hydrate notre insctance de la classe réponse avec la description et l'id de l'exercice reçu en paramettre
$maReponse->set_DESCRIPTION($_POST["description"]);
$maReponse->set_ID_EXERCICE($_POST["id_exercice"]);
//créer une ligne dans la table réponse
$maReponse->createReponse();

?>