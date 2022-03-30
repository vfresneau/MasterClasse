<?php
//I call on files includes
require_once("../includes/config.php");
//I create an instance of JWT class for use his fonctions
$JWT= new JWT();
 //I call an fonction of token verification to have access at this webservice
$JWT-> testTokenExitValide();

$monExercice =  new Exercice (0, $_POST['nom'],"La réponse attendue était : ".$_POST['reponseAttendu'],$_POST['consigne'],$_POST['reponseAttendu'],$_POST['valide'],$_POST['niveau'],$_POST['lien'],$_POST['id_theme']);

$monExercice->createExercice();
//affiche l'id de l'exercice qui vient juste d'être fabriqué
echo $monExercice->get_ID();

?>