<?php

//Les Class servent structurer les informations et apporte des méthodes
Class theme {
	private $_ID;
	private $_NOM;

/**
* la méthode construct s'appelle automatiquement lorsque 
* l'on fait une instance de cette class
* elle hydrate ou remplie les attributs de l'instance de la classe Individu
 *
 * @param [type] $ID
 * @param [type] $NOM
 */
    function __construct($ID, $NOM){
		$this->_ID = $ID;
		$this->_NOM = $NOM;
	}
//les guetteurs :méthode pour obtenir la valeur d'un attribut
//Les Setters : méthode pour dénifie un attribut

	public function get_ID(){
		return $this->_ID;
	}

	public function set_ID($_ID){
		$this->_ID = $_ID;
	}

	public function get_NOM(){
		return $this->_NOM;
	}

	public function set_NOM($_NOM){
		$this->_NOM = $_NOM;
	}

	public function createtheme(){
// 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)

//La connexion est établie en créant une instance de la classe de base de PDO.
//Le constructeur accepte des paramètres pour spécifier la source de la base de données (mysql: Systeme de Base de Donéées (SGBD) ,dbname: nom de la base dans le SGBD, login, mdp)
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
            $stmt = $dbh->prepare('INSERT INTO theme (nom) VALUES (:nom)');
			//Lie une variable PHP à un marqueur nommé correspondant dans la requête SQL utilisée, pour préparer la requête.
            $stmt->bindParam(':nom', $this->_NOM);
			$stmt->execute();
            //ferme la connexion à la base
            $dbh = null;
	}

//méthode statique permet d'y accéder sans avoir besoin d'instancier la classe. Ceci peuvent être accédé statiquement depuis une instance d'objet.
// -->Méthode static utiliser afin d'être appeller dans le webservice theme//
    public static function readAllTheme(){
        //declaration d'un tableau vide
        $liste_theme = array(); 
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
            $stmt = $dbh->prepare("SELECT * FROM theme");
            $stmt->execute();
			//retourne un tableau associatif contenant une ligne de la recherche tant qu'il reste des lignes dans la recherche
            while ($row = $stmt->fetch()) {
               //pour chaque resultat je fabrique un theme de la classe theme
                $monTheme = new theme ($row['id'],$row['nom']);
                //j'ajoute à mon tableau de theme' mon theme en cours
                array_push($liste_theme, $monTheme);
                }
            //ferme la connexion à la base
            $dbh = null;
            
     //on transforme mon tableau d'object en json
        //strval() transforme un entier en chaine de caractere
        //htmlspecialchars() remplace les carcteres speciaux en entité html compréhensible par le navigateur
        // https://www.w3schools.com/html/html_entities.asp
        $monJson = '{"theme":[';
            //pacours ma liste d'exercice pour ajouter mes exercices un à un, à mon json
            for($i=0 ; $i<count($liste_theme);$i++){
                $monJson .= '{"_ID":"'.strval($liste_theme[$i]->get_ID()).'",';
                $monJson .= '"_NOM":"'.htmlspecialchars(($liste_theme[$i]->get_NOM())).'"';
                //fermeture le tableau de reponse et mon object ($exercice[$i])
                $monJson .= '}';
                //je sépare chaque object theme par une virgule sauf le dernier
                if($i!=count($liste_theme)-1){
                    $monJson.=',';
                }
            }
            //je ferme mon tableau d'exercice et le json
            $monJson =$monJson."]}";
            echo $monJson;
    }

//fonction public pour update un theme//
	public function updatetheme(){
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
			$stmt = $dbh->prepare('UPDATE theme SET nom = :nom WHERE id = :id');
			$stmt->bindParam(':id', $this->_ID);
			$stmt->bindParam(':nom', $this->_NOM);
			$stmt->execute();
            $dbh = null;
	}

    //fonction public pour delete un exercice //
	public function deletetheme(){
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
			$stmt = $dbh->prepare('DELETE FROM theme WHERE id = :id');
			$stmt->bindParam(':id', $this->_ID);
			$stmt->execute();
            $dbh = null;
	}

}
?>