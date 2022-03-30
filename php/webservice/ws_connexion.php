<?php

require_once("../includes/config.php");
require_once("../classes/class_individu.php");

//instance d'u individu

$monIndividu = new Individu(0,"","",$_POST["mail"],$_POST["mdp"],0);
$monIndividu->connexion();
//si ddiférent de 0 connexion réussi
if ($monIndividu->get_ID()!= 0){
    $header = [
        'typ'=> "JWT",
        'alg'=> "HS256"
    ];
    $payload =[
        'id'=>$monIndividu->get_ID(),
        'email' => $monIndividu->get_EMAIL()
    ];
    
    $jwt = new JWT();
    $token = $jwt->generate($header,$payload,SECRET);
    echo $token;
    exit;
}
echo 0;




?>