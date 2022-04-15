<?php
//I call on files includes
require_once("../includes/config.php");


//I create an instance of JWT class for use his fonctions
$JWT= new JWT();
 //I call an fonction of token verification to have access at this webservice
$JWT-> testTokenExitValide();

 //je créer un Instance de classe Exercice, et je lui donne ces arguments qu'il a besoin dans la classe pour fonctionner.
$monExercice =  new Exercice (0, $_POST['nom'],"La réponse attendue était : ".$_POST['reponseAttendu'],$_POST['consigne'],$_POST['reponseAttendu'],$_POST['valide'],$_POST['niveau'],$_POST['lien'],$_POST['id_theme']);
//je fais fais apelle à ma fonction createExercice qui se trouve dans la classe Exercice, pour créer un exercice
$monExercice->createExercice();
//affiche l'id de l'exercice qui vient juste d'être fabriqué (grace a la fonction createExercice de la classe Exercice)
echo $monExercice->get_ID();

?>