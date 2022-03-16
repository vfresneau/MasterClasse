<?php

header("Access-Control-Allow-Origin: *");
// je fait appel à un autre fichier 
require_once("../classes/class_Exercice.php");
// Afficher les erreurs à l'écran
ini_set('display_errors', 1);
// Afficher les erreurs et les avertissements
error_reporting(E_ALL);


$monExercice = new Exercice($_POST['id'],$_POST['nom'], $_POST['correction'], $_POST['consigne'], $_POST['reponseAttendu'], $_POST['valide'], $_POST['niveau'], $_POST['lien'], $_POST['id_theme']);

$monExercice->updateExercice();
?>