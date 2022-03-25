<?php
 require_once("../includes/config.php");

    $monExercice =  new Exercice (0, $_POST['nom'],"La réponse attendue était : ".$_POST['reponseAttendu'],$_POST['consigne'],$_POST['reponseAttendu'],$_POST['valide'],$_POST['niveau'],$_POST['lien'],$_POST['id_theme']);

    $monExercice->createExercice();
    //affiche l'id de l'exercice qui vient juste d'être fabriqué
    echo $monExercice->get_ID();
?>