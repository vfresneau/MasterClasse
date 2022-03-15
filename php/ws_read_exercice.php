<?php
    //on va chercher le ficher de la class : on appelle le fichier php
    require('class_Exercice.php');

    // Afficher les erreurs à l'écran
   ini_set('display_errors', 1);
   // Afficher les erreurs et les avertissements
   error_reporting(E_ALL);

    function retreive_Exercice(){
        $user = "charley"; // Identifiant
        $pass = "@JuNiRMdv5GZb"; // Mot de passe
        $liste_exercice = array(); //tableau vide

        // 127.0.0.1 est l'adresse ip local du serveur (le fichier php étant executer sur le serveur, l'adresse du serveur est donc l'adresse local)
        try {
            // connexion à la base de donnée
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MasterClasse', $user, $pass);
            // envoie d'une requete à la base de données --> on récup l'exercice correspondant à l'id
            $stmt = $dbh->prepare("SELECT * FROM Exercice");
            $stmt->execute();
            // pour chaque ligne trouvé--> y en à qu'un ici
            while ($row = $stmt->fetch()) {
               //pour chaque resultat je fabrique un exercice de la classe EXERCICE 
                $monExercice = new Exercice($row['nom'], $row['correction'], $row['consigne'], $row['reponseAttendu'], $row['valide'], $row['niveau'], $row['lien'], $row['id_theme']);
                //j'ajoute à mon tableau d'exercice' mon exercice en cours
                array_push($liste_monExercice, $monExercice);

            }
            //ferme la connexion à la base
            $dbh = null;

        } catch (PDOException $e) {
            print "Erreur !: " . $e->getMessage() . "<br/>";
            die();
        }


        $monTab = array();
        $i = 0;

        // on transforme l'objet en tableau (récursif sur les objets)
        foreach($liste_monExercice as $Exercice){
            $array = $Exercice->toArray($Exercice);
            $monTab[$i] = $array;
            $i+=1;
        }

        $monJson = '{"EXERCICE":'.json_encode($monTab)."}";
        echo $monJson;
    }
    retreive_exercice();

?>
