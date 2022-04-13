<?php

//Les Class servent structurer les informations et apporte des méthodes
Class cours {
	private $_ID;
	private $_NOM;
	private $_DESCRIPTION;
	private $_ID_THEME;

	/**
	* la méthode construct s'appelle automatiquement lorsque 
	* l'on fait une instance de cette class
	* elle hydrate ou remplie les attributs de l'instance de la classe cours
	 *
	 * @param [type] $ID
	 * @param [type] $NOM
	 * @param [type] $DESCRIPTION
	 * @param [type] $ID_THEME
	 */
    function __construct($ID, $NOM, $DESCRIPTION, $ID_THEME){
		$this->_ID = $ID;
		$this->_NOM = $NOM;
		$this->_DESCRIPTION = $DESCRIPTION;
		$this->_ID_THEME = $ID_THEME;
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

	public function get_DESCRIPTION(){
		return $this->_DESCRIPTION;
	}

	public function set_DESCRIPTION($_DESCRIPTION){
		$this->_DESCRIPTION = $_DESCRIPTION;
	}

	public function get_ID_THEME(){
		return $this->_ID_THEME;
	}

	public function set_ID_THEME($_ID_THEME){
		$this->_ID_THEME = $_ID_THEME;
	}

	//fonction public pour creer un examen //
	public function createcours(){
// 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)

//La connexion est établie en créant une instance de la classe de base de PDO.
//Le constructeur accepte des paramètres pour spécifier la source de la base de données (mysql: Systeme de Base de Donéées (SGBD) ,dbname: nom de la base dans le SGBD, login, mdp)
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
			// prépare une requete avec 3 parametres
			$stmt = $dbh->prepare('INSERT INTO cours (nom, description, id_theme) VALUES (:nom, :description, :id_theme)');
			//Lie une variable PHP à un marqueur nommé correspondant dans la requête SQL utilisée, pour préparer la requête.
			$stmt->bindParam(':nom', $this->_NOM);
			$stmt->bindParam(':description', $this->_DESCRIPTION);
			$stmt->bindParam(':id_theme', $this->_ID_THEME);
			$stmt->execute();
			//ferme la connexion à la base
            $dbh = null;
        } 

	//fonction public pour lire un examen //
	public function readcours(){
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
			$stmt = $dbh->prepare('SELECT * FROM cours WHERE id = :id');
			$stmt->bindParam(':id', $this->_ID);
			$stmt->execute();
			//retourne un tableau associatif contenant une ligne de la recherche tant qu'il reste des lignes dans la recherche
            $row = $stmt->fetch();
			//pour chaque resultat je fabrique un cours de la classe cours (en instanciant la class cours )
            $singlecours = new cours($row['id'],$row['nom'], $row['description'], $row['id_theme']);//ferme la connexion à la base
			$dbh = null;
		//transforme en tableau d'object json ??
		$monjSon = '{$singlecours:'.json_encode(array($singlecours->toArray($singlecours))).'}';
        // Je l'affiche
        return $monjSon;
	}

	//fonction public pour update un cours //
	public function updatecours(){
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
			$stmt = $dbh->prepare('UPDATE cours SET nom = :nom, description = :description, id_theme = :id_theme WHERE id = :id');
			$stmt->bindParam(':id', $this->_ID);
			$stmt->bindParam(':nom', $this->_NOM);
			$stmt->bindParam(':description', $this->_DESCRIPTION);
			$stmt->bindParam(':id_theme', $this->_ID_THEME);
			$stmt->execute();//ferme la connexion à la base
            $dbh = null;
	}

	//fonction public pour update un cours //
	public function deletecours(){
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
			$stmt = $dbh->prepare('DELETE FROM cours WHERE id = :id');
			$stmt->bindParam(':id', $this->_ID);
			$stmt->execute();//ferme la connexion à la base
            $dbh = null;
	}

	// permet de créer un json contenant les objets des objets
    public function toArray(){
        $array = get_object_vars($this);
        unset($array['_parent'], $array['_index']);
        array_walk_recursive($array, function (&$property) {
            if (is_object($property) && method_exists($property, 'toArray')) {
                $property = $property->toArray();
            }
        });
        return $array;
    }
}
?>