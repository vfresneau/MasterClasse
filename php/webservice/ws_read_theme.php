<?php
//I call on files includes
require_once("../includes/config.php");
//I create an instance of JWT class for use his fonctions
$JWT= new JWT();
 //I call an fonction of token verification to have access at this webservice
$JWT-> testTokenExitValide();
//class exercice appelle de la méthode readAllExercice//
theme::readAllTheme();

?>
