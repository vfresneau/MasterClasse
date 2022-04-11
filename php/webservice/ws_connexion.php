<?php
//balise de debut

//inclus dans cette page le fichier config.php
require_once("../includes/config.php");

//On instancie la Class individu et on remplie ces attributs 
$monIndividu = new Individu(0,"","",$_POST["mail"],$_POST["mdp"],0);
$monIndividu->connexion();
//si l'ID est différent de 0 connexion réussi ??
if ($monIndividu->get_ID()!= 0){
    //declaration de l'algorythm and token type
    $header = [
        'typ'=> "JWT",
        'alg'=> "HS256"
    ];
    //I create contents (payload)
    $payload =[
        //DATA
        'id'=>$monIndividu->get_ID(),
        'email' => $monIndividu->get_EMAIL(),
        'admin' => $monIndividu->get_ADMIN()
    ];
    //on instancie la classe JWT 
    $jwt = new JWT();
    //afin de generer un token avec son header,son payload, et son mot secret ??
    $token = $jwt->generate($header,$payload,SECRET);
    //verification de la generation du token
    echo $token;
    exit;
}
echo 0;

//balise de fin
?>