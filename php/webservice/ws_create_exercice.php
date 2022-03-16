<?php
   header("Access-Control-Allow-Origin: *");
   // je fait appel à un autre fichier 
   require_once("../classes/class_Exercice.php");
   // Afficher les erreurs à l'écran
  ini_set('display_errors', 1);
  // Afficher les erreurs et les avertissements
  error_reporting(E_ALL);
  //Envoie de 9 parametres //

    $monExercice =  new Exercice (0, $_POST['nom'],$_POST['correction'],$_POST['consigne'],$_POST['reponseAttendu'],$_POST['valide'],$_POST['niveau'],$_POST['lien'],$_POST['id_theme']);

    $monExercice->createExercice();
?>