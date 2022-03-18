<?php

Class Suivi {
	private $_ID;
	private $_REUSSI;
	private $_ID_INDIVIDU;
	private $_ID_EXERCICE;
	private $_TEMPS;
	private $_NOMBRE_ESSAI;

	//S'appelle automatiquement à la création d'instance
    function __construct($ID, $REUSSI, $ID_INDIVIDU, $ID_EXERCICE, $TEMPS, $NOMBRE_ESSAI){
		$this->_ID = $ID;
		$this->_REUSSI = $REUSSI;
		$this->_ID_INDIVIDU = $ID_INDIVIDU;
		$this->_ID_EXERCICE = $ID_EXERCICE;
		$this->_TEMPS = $TEMPS;
		$this->_NOMBRE_ESSAI = $NOMBRE_ESSAI;
	}

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
        try {
            // connexion à la base de donnée
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
			$stmt = $dbh->prepare('INSERT INTO Suivi (reussi, id_individu, id_exercice, temps, nombre_essai) VALUES (:reussi, :id_individu, :id_exercice, :temps, :nombre_essai)');
			$stmt->bindParam(':reussi', $this->_REUSSI);
			$stmt->bindParam(':id_individu', $this->_ID_INDIVIDU);
			$stmt->bindParam(':id_exercice', $this->_ID_EXERCICE);
			$stmt->bindParam(':temps', $this->_TEMPS);
			$stmt->bindParam(':nombre_essai', $this->_NOMBRE_ESSAI);
			$stmt->execute();//ferme la connexion à la base
            $dbh = null;
        } catch (PDOException $e) {
            print 'Erreur !: ' . $e->getMessage() . '<br/>';
            die();
        }
	}

	public function readSuivi(){
  
        // 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)
        try {
            // connexion à la base de donnée
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
			$stmt = $dbh->prepare('SELECT * FROM Suivi WHERE id = :id');
			$stmt->bindParam(':id', $this->_ID);
			$stmt->execute();
            $row = $stmt->fetch();
            $singleSuivi = new Suivi($row['id'],$row['reussi'], $row['id_individu'], $row['id_exercice'], $row['temps'], $row['nombre_essai']);//ferme la connexion à la base
            $dbh = null;
        } catch (PDOException $e) {
            print 'Erreur !: ' . $e->getMessage() . '<br/>';
            die();
        }
		$monjSon = '{$singleSuivi:'.json_encode(array($singleSuivi->toArray($singleSuivi))).'}';
        // Je l'affiche
        return $monjSon;
		}

	public function updateSuivi(){
    
        // 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)
        try {
            // connexion à la base de donnée
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
			$stmt = $dbh->prepare('UPDATE Suivi SET reussi = :reussi, id_individu = :id_individu, id_exercice = :id_exercice, temps = :temps, nombre_essai = :nombre_essai WHERE id = :id');
			$stmt->bindParam(':id', $this->_ID);
			$stmt->bindParam(':reussi', $this->_REUSSI);
			$stmt->bindParam(':id_individu', $this->_ID_INDIVIDU);
			$stmt->bindParam(':id_exercice', $this->_ID_EXERCICE);
			$stmt->bindParam(':temps', $this->_TEMPS);
			$stmt->bindParam(':nombre_essai', $this->_NOMBRE_ESSAI);
			$stmt->execute();//ferme la connexion à la base
            $dbh = null;
        } catch (PDOException $e) {
            print 'Erreur !: ' . $e->getMessage() . '<br/>';
            die();
        }
	}

	public function deleteSuivi(){
      
        // 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)
        try {
            // connexion à la base de donnée
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
			$stmt = $dbh->prepare('DELETE FROM Suivi WHERE id = :id');
			$stmt->bindParam(':id', $this->_ID);
			$stmt->execute();//ferme la connexion à la base
            $dbh = null;
        } catch (PDOException $e) {
            print 'Erreur !: ' . $e->getMessage() . '<br/>';
            die();
        }
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