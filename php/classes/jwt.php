<?php
header("Access-Control-Allow-Origin: *");// permet le debug en local
ini_set('display_errors', 1); // affiche toutes les erreurs
error_reporting(E_ALL); // affiche toutes les erreurs

class JWT{
    public function generate (array $header, array $payload, string $secret,int $validity = 86400): string
    {
        //ajout validité une journée sinon toujours valide//
        if($validity > 0){
            $now = new DateTime();
            $expiration = $now->getTimestamp() + $validity;
            $payload['iat'] = $now->getTimestamp();
            $payload['exp'] = $expiration;
        }
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
 
return $jwt;
    }
}
















?>