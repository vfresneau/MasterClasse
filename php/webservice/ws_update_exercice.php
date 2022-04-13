<?php
//I call on files includes
require_once("../includes/config.php");
//I create an instance of JWT class for use his fonctions
$JWT= new JWT();
 //I call an fonction of token verification to have access at this webservice
$JWT-> testTokenExitValide();
//creation d'une instance de la class Exercice,afin d'envoyer ces 9 parametres
$monExercice = new Exercice($_POST['id'],$_POST['nom'],"La réponse attendue était : ".$_POST['reponseAttendu'], $_POST['consigne'], $_POST['reponseAttendu'], $_POST['valide'], $_POST['niveau'], $_POST['lien'], $_POST['id_theme']);
//utilise la fonction de sa class
$monExercice->updateExercice();
?>