<?php
header("Access-Control-Allow-Origin: *");// 
ini_set('display_errors', 1); // affiche toutes les erreurs

error_reporting(E_ALL); // affiche toutes les erreurs
//password and login required for each webservice
const LOGIN="charley";
const MDP="@JuNiRMdv5GZb";

//Password secret of jason web token (jwt)
const SECRET = "Labrouette37!*qsdfreza89";
//class required for pages webservices
require_once("../classes/class_cours.php");
require_once("../classes/class_examen.php");
require_once("../classes/class_exercice_examen.php");
require_once("../classes/class_Exercice.php");
require_once("../classes/class_individu.php");
require_once("../classes/class_suivi.php");
require_once("../classes/class_theme.php");
require_once("../classes/class_reponse.php");
require_once("../classes/CLASS_JWT.php");

?>