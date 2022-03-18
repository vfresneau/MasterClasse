<?php
 require_once("../includes/config.php");


$monExercice = new Exercice($_POST['id'],$_POST['nom'], $_POST['correction'], $_POST['consigne'], $_POST['reponseAttendu'], $_POST['valide'], $_POST['niveau'], $_POST['lien'], $_POST['id_theme']);

$monExercice->updateExercice();
?>