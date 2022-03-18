<?php
 require_once("../includes/config.php");

    $monExercice =  new Exercice (0, $_POST['nom'],$_POST['correction'],$_POST['consigne'],$_POST['reponseAttendu'],$_POST['valide'],$_POST['niveau'],$_POST['lien'],$_POST['id_theme']);

    $monExercice->createExercice();
?>