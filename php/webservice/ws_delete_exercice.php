<?php
//I call on files includes
require_once("../includes/config.php");
//I create an instance of JWT class for use his fonctions
$JWT= new JWT();
 //I call an fonction of token verification to have access at this webservice
$JWT-> testTokenExitValide();

 // on récupère le paramètre de la requete ajax   
//I create an instance of exercice class, and i send this 9 parameters
$monExercice = new Exercice($_POST['id'], "", "", "","",0,0,"",0);
//I call on function deleteExercice of class exercice
$monExercice->deleteExercice();

?>
