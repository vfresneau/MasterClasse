<?php
//I call on files includes
require_once("../includes/config.php");
//I create an instance of JWT class for use his fonctions
$JWT= new JWT();
 //I call an fonction of token verification to have access at this webservice
$JWT-> testTokenExitValide();

$monExercice = new Exercice($_POST['id'],$_POST['nom'], $_POST['correction'], $_POST['consigne'], $_POST['reponseAttendu'], $_POST['valide'], $_POST['niveau'], $_POST['lien'], $_POST['id_theme']);

$monExercice->updateExercice();
?>