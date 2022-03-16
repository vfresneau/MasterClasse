<?php
    //on va chercher le ficher de la class : on appelle le fichier php
    require('../classes/class_Exercice.php');

    // Afficher les erreurs à l'écran
   ini_set('display_errors', 1);
   // Afficher les erreurs et les avertissements
   error_reporting(E_ALL);

//class exercice appelle de la méthode readAllExercice//
Exercice::readAllExercice();

?>
