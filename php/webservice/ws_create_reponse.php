<?php
 require_once("../includes/config.php");
//je créer une instance de la classe reponse
    $maReponse =  new Reponse();
    //on hydrate notre insctance de la classe réponse avec la description et l'id de l'exercice reçu en paramettre
        $maReponse->set_DESCRIPTION($_POST["description"]);
    $maReponse->set_ID_EXERCICE($_POST["id_exercice"]);
    //créer une ligne dans la table réponse
    $maReponse->createReponse();
  
?>