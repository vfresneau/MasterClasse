<?php
header("Access-Control-Allow-Origin: *");// permet le debug en local
ini_set('display_errors', 1); // affiche toutes les erreurs
error_reporting(E_ALL); // affiche toutes les erreurs

require_once 'includes/config.php';
require_once 'classes/jwt.php';

//header//
$header = [
    'typ'=> 'JWT',
    'alg' => 'HS256'
];

//payload//
$payload = [
    'user_id' => 123,
    'roles' => [
        'ROLE_ADMIN',
        'ROLE_USER',

    ]
    ];

    //encode//
    $base64Header= base64_encode(json_encode($header));
    $base64Payload = base64_encode(json_encode($payload));
    
    //on nettoie les valeurs encodées//
    //on retire les +,/ et = , car la norme JWT jason web token n'accepte pas certaines syntaxes //

    $base64Header = str_replace(['+','/','='],['-','_',''],
    $base64Header);
    $base64Payload = str_replace(['+','/','='],['-','_',''],
    $base64Payload);

    // echo $base64Payload;

//on génère la signature
$secret = base64_encode(SECRET);
// echo $secret;
$signature = hash_hmac('sha256',$base64Header . '.' . $base64Payload,
$secret, true);

$base64Signature = base64_encode($signature);

$signature = str_replace(['+','/','='],['-','_',''],
$base64Signature);

// echo $signature; //not ok

//on créer le token
$jwt = $base64Header . '.' . $base64Payload . '.' . $signature;

echo $jwt;

$jwt = new JWT();

$token = $jwt->generate($header, $payload, SECRET);

echo $token;

?>