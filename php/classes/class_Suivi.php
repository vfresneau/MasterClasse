<?php

//Les Class servent structurer les informations et apporte des méthodes
Class Suivi {
	private $_ID;
	private $_REUSSI;
	private $_ID_INDIVIDU;
	private $_ID_EXERCICE;
	private $_TEMPS;
	private $_NOMBRE_ESSAI;

/**
* la méthode construct s'appelle automatiquement lorsque 
* l'on fait une instance de cette class
* elle hydrate ou remplie les attributs de l'instance de la classe Suivi
 *
 * @param [type] $ID
 * @param [type] $REUSSI
 * @param [type] $ID_INDIVIDU
 * @param [type] $ID_EXERCICE
 * @param [type] $TEMPS
 * @param [type] $NOMBRE_ESSAI
 */
    function __construct($ID, $REUSSI, $ID_INDIVIDU, $ID_EXERCICE, $TEMPS, $NOMBRE_ESSAI){
		$this->_ID = $ID;
		$this->_REUSSI = $REUSSI;
		$this->_ID_INDIVIDU = $ID_INDIVIDU;
		$this->_ID_EXERCICE = $ID_EXERCICE;
		$this->_TEMPS = $TEMPS;
		$this->_NOMBRE_ESSAI = $NOMBRE_ESSAI;
	}
//les guetteurs :méthode pour obtenir la valeur d'un attribut
//Les Setters : méthode pour dénifie un attribut

	public function get_ID(){
		return $this->_ID;
	}

	public function set_ID($_ID){
		$this->_ID = $_ID;
	}

	public function get_REUSSI(){
		return $this->_REUSSI;
	}

	public function set_REUSSI($_REUSSI){
		$this->_REUSSI = $_REUSSI;
	}

	public function get_ID_INDIVIDU(){
		return $this->_ID_INDIVIDU;
	}

	public function set_ID_INDIVIDU($_ID_INDIVIDU){
		$this->_ID_INDIVIDU = $_ID_INDIVIDU;
	}

	public function get_ID_EXERCICE(){
		return $this->_ID_EXERCICE;
	}

	public function set_ID_EXERCICE($_ID_EXERCICE){
		$this->_ID_EXERCICE = $_ID_EXERCICE;
	}

	public function get_TEMPS(){
		return $this->_TEMPS;
	}

	public function set_TEMPS($_TEMPS){
		$this->_TEMPS = $_TEMPS;
	}

	public function get_NOMBRE_ESSAI(){
		return $this->_NOMBRE_ESSAI;
	}

	public function set_NOMBRE_ESSAI($_NOMBRE_ESSAI){
		$this->_NOMBRE_ESSAI = $_NOMBRE_ESSAI;
	}

	public function createSuivi(){
// 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)

//La connexion est établie en créant une instance de la classe de base de PDO.
//Le constructeur accepte des paramètres pour spécifier la source de la base de données (mysql: Systeme de Base de Donéées (SGBD) ,dbname: nom de la base dans le SGBD, login, mdp)
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
			// prépare une requete avec 5 parametres
			$stmt = $dbh->prepare('INSERT INTO Suivi (reussi, id_individu, id_exercice, temps, nombre_essai) VALUES (:reussi, :id_individu, :id_exercice, :temps, :nombre_essai)');
			$stmt->bindParam(':reussi', $this->_REUSSI);
			$stmt->bindParam(':id_individu', $this->_ID_INDIVIDU);
			$stmt->bindParam(':id_exercice', $this->_ID_EXERCICE);
			$stmt->bindParam(':temps', $this->_TEMPS);
			$stmt->bindParam(':nombre_essai', $this->_NOMBRE_ESSAI);
			$stmt->execute();
			//ferme la connexion à la base
            $dbh = null;
	}

	//fonction qui permet de récupérer toutes les Suivi en fonction de l'id
	public function readSuivi(){
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
			$stmt = $dbh->prepare('SELECT * FROM Suivi WHERE id = :id');
			$stmt->bindParam(':id', $this->_ID);
			$stmt->execute();
			//retourne un tableau associatif contenant une ligne de la recherche tant qu'il reste des lignes dans la recherche
            $row = $stmt->fetch();
			//pour chaque resultat je fabrique un Suivi de la classe Suivi
            $singleSuivi = new Suivi($row['id'],$row['reussi'], $row['id_individu'], $row['id_exercice'], $row['temps'], $row['nombre_essai']);//ferme la connexion à la base
            $dbh = null;
		//transforme en tableau d'object json ??
		$monjSon = '{$singleSuivi:'.json_encode(array($singleSuivi->toArray($singleSuivi))).'}';
        // Je l'affiche
        return $monjSon;
		}

	//fonction public pour update un suivi //
	public function updateSuivi(){
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
			$stmt = $dbh->prepare('UPDATE Suivi SET reussi = :reussi, id_individu = :id_individu, id_exercice = :id_exercice, temps = :temps, nombre_essai = :nombre_essai WHERE id = :id');
			$stmt->bindParam(':id', $this->_ID);
			$stmt->bindParam(':reussi', $this->_REUSSI);
			$stmt->bindParam(':id_individu', $this->_ID_INDIVIDU);
			$stmt->bindParam(':id_exercice', $this->_ID_EXERCICE);
			$stmt->bindParam(':temps', $this->_TEMPS);
			$stmt->bindParam(':nombre_essai', $this->_NOMBRE_ESSAI);
			$stmt->execute();
            $dbh = null;
	}

//fonction public pour delete un Suivi //
	public function deleteSuivi(){
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
			$stmt = $dbh->prepare('DELETE FROM Suivi WHERE id = :id');
			$stmt->bindParam(':id', $this->_ID);
			$stmt->execute();
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