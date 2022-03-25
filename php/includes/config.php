<?php
header("Access-Control-Allow-Origin: *");// 
ini_set('display_errors', 1); // affiche toutes les erreurs
error_reporting(E_ALL); // affiche toutes les erreurs

const LOGIN="charley";
const MDP="@JuNiRMdv5GZb";

require_once("../classes/class_cours.php");
require_once("../classes/class_examen.php");
require_once("../classes/class_exercice_examen.php");
require_once("../classes/class_Exercice.php");
require_once("../classes/class_Individu.php");
require_once("../classes/class_Suivi.php");
require_once("../classes/class_theme.php");
require_once("../classes/class_reponse.php");



const SECRET ='OhLa8311eBroue11e!';








?>