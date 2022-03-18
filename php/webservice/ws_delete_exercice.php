<?php
 require_once("../includes/config.php");


  // on récupère le paramètre de la requete ajax    
$monExercice = new Exercice($_POST['id'], "", "", "","",0,0,"",0);
$monExercice->deleteExercice();

?>
