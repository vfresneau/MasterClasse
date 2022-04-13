<?php

//Les Class servent structurer les informations et apporte des méthodes
Class examen {
	private $_ID;
	private $_NOM;
	private $_NOMBRE_QUESTION;
	private $_NOMBRE_THEME;
	private $_ID_NIVEAU;

	/**
	* la méthode construct s'appelle automatiquement lorsque 
	* l'on fait une instance de cette class
	* elle hydrate ou remplie les attributs de l'instance de la classe examen
	 *
	 * @param [type] $ID
	 * @param [type] $NOM
	 * @param [type] $NOMBRE_QUESTION
	 * @param [type] $NOMBRE_THEME
	 * @param [type] $ID_NIVEAU
	 */
    function __construct($ID, $NOM, $NOMBRE_QUESTION, $NOMBRE_THEME, $ID_NIVEAU){
		$this->_ID = $ID;
		$this->_NOM = $NOM;
		$this->_NOMBRE_QUESTION = $NOMBRE_QUESTION;
		$this->_NOMBRE_THEME = $NOMBRE_THEME;
		$this->_ID_NIVEAU = $ID_NIVEAU;
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

	public function get_NOMBRE_QUESTION(){
		return $this->_NOMBRE_QUESTION;
	}

	public function set_NOMBRE_QUESTION($_NOMBRE_QUESTION){
		$this->_NOMBRE_QUESTION = $_NOMBRE_QUESTION;
	}

	public function get_NOMBRE_THEME(){
		return $this->_NOMBRE_THEME;
	}

	public function set_NOMBRE_THEME($_NOMBRE_THEME){
		$this->_NOMBRE_THEME = $_NOMBRE_THEME;
	}

	public function get_ID_NIVEAU(){
		return $this->_ID_NIVEAU;
	}

	public function set_ID_NIVEAU($_ID_NIVEAU){
		$this->_ID_NIVEAU = $_ID_NIVEAU;
	}

	//
	public function createexamen(){
// 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)

//La connexion est établie en créant une instance de la classe de base de PDO.
//Le constructeur accepte des paramètres pour spécifier la source de la base de données (mysql: Systeme de Base de Donéées (SGBD) ,dbname: nom de la base dans le SGBD, login, mdp)
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
			// prépare une requete avec 4 parametres
			$stmt = $dbh->prepare('INSERT INTO examen (nom, nombre_question, nombre_theme, id_niveau) VALUES (:nom, :nombre_question, :nombre_theme, :id_niveau)');
			//Lie une variable PHP à un marqueur nommé correspondant dans la requête SQL utilisée, pour préparer la requête.
			$stmt->bindParam(':nom', $this->_NOM);
			$stmt->bindParam(':nombre_question', $this->_NOMBRE_QUESTION);
			$stmt->bindParam(':nombre_theme', $this->_NOMBRE_THEME);
			$stmt->bindParam(':id_niveau', $this->_ID_NIVEAU);
			$stmt->execute();
			//ferme la connexion à la base
            $dbh = null;
	}

	//fonction qui permet de récupérer toutes les examens en fonction de l'id
	public function readexamen(){
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
			$stmt = $dbh->prepare('SELECT * FROM examen WHERE id = :id');
			$stmt->bindParam(':id', $this->_ID);
			$stmt->execute();
			//retourne un tableau associatif contenant une ligne de la recherche tant qu'il reste des lignes dans la recherche
            $row = $stmt->fetch();
			//pour chaque resultat je fabrique un examen de la classe Examen
            $singleexamen = new examen($row['id'],$row['nom'], $row['nombre_question'], $row['nombre_theme'], $row['id_niveau']);//ferme la connexion à la base
            $dbh = null;
			//transforme en tableau d'object json ??
		$monjSon = '{$singleexamen:'.json_encode(array($singleexamen->toArray($singleexamen))).'}';
        // Je l'affiche
        return $monjSon;
		}

	//fonction public pour update un examen //
	public function updateexamen(){
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
			$stmt = $dbh->prepare('UPDATE examen SET nom = :nom, nombre_question = :nombre_question, nombre_theme = :nombre_theme, id_niveau = :id_niveau WHERE id = :id');
			$stmt->bindParam(':id', $this->_ID);
			$stmt->bindParam(':nom', $this->_NOM);
			$stmt->bindParam(':nombre_question', $this->_NOMBRE_QUESTION);
			$stmt->bindParam(':nombre_theme', $this->_NOMBRE_THEME);
			$stmt->bindParam(':id_niveau', $this->_ID_NIVEAU);
			$stmt->execute();//ferme la connexion à la base
            $dbh = null;
	}

	//fonction public pour delete un examen //
	public function deleteexamen(){
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
			$stmt = $dbh->prepare('DELETE FROM examen WHERE id = :id');
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