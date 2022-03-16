<?php

Class cours {
	private $_ID;
	private $_NOM;
	private $_DESCRIPTION;
	private $_ID_THEME;

	//S'appelle automatiquement à la création d'instance
    function __construct($ID, $NOM, $DESCRIPTION, $ID_THEME){
		$this->_ID = $ID;
		$this->_NOM = $NOM;
		$this->_DESCRIPTION = $DESCRIPTION;
		$this->_ID_THEME = $ID_THEME;
	}

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

	public function createcours(){
        $user = 'charley'; // Identifiant de bdd
        $pass = '@JuNiRMdv5GZb'; // Mot de passe bdd

        // 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)
        try {
            // connexion à la base de donnée
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', $user, $pass);
			$stmt = $dbh->prepare('INSERT INTO cours (nom, description, id_theme) VALUES (:nom, :description, :id_theme)');
			$stmt->bindParam(':nom', $this->_NOM);
			$stmt->bindParam(':description', $this->_DESCRIPTION);
			$stmt->bindParam(':id_theme', $this->_ID_THEME);
			$stmt->execute();//ferme la connexion à la base
            $dbh = null;
        } catch (PDOException $e) {
            print 'Erreur !: ' . $e->getMessage() . '<br/>';
            die();
        }
	}

	public function readcours(){
        $user = 'charley'; // Identifiant de bdd
        $pass = '@JuNiRMdv5GZb'; // Mot de passe bdd

        // 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)
        try {
            // connexion à la base de donnée
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', $user, $pass);
			$stmt = $dbh->prepare('SELECT * FROM cours WHERE id = :id');
			$stmt->bindParam(':id', $this->_ID);
			$stmt->execute();
            $row = $stmt->fetch();
            $singlecours = new cours($row['nom'], $row['description'], $row['id_theme']);//ferme la connexion à la base
            $dbh = null;
        } catch (PDOException $e) {
            print 'Erreur !: ' . $e->getMessage() . '<br/>';
            die();
        }
		$monjSon = '{$singlecours:'.json_encode(array($singlecours->toArray($singlecours))).'}';
        // Je l'affiche
        return $monjSon;
		}

	public function updatecours(){
        $user = 'charley'; // Identifiant de bdd
        $pass = '@JuNiRMdv5GZb'; // Mot de passe bdd

        // 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)
        try {
            // connexion à la base de donnée
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', $user, $pass);
			$stmt = $dbh->prepare('UPDATE cours SET nom = :nom, description = :description, id_theme = :id_theme WHERE id = :id');
			$stmt->bindParam(':id', $this->_ID);
			$stmt->bindParam(':nom', $this->_NOM);
			$stmt->bindParam(':description', $this->_DESCRIPTION);
			$stmt->bindParam(':id_theme', $this->_ID_THEME);
			$stmt->execute();//ferme la connexion à la base
            $dbh = null;
        } catch (PDOException $e) {
            print 'Erreur !: ' . $e->getMessage() . '<br/>';
            die();
        }
	}

	public function deletecours(){
        $user = 'charley'; // Identifiant de bdd
        $pass = '@JuNiRMdv5GZb'; // Mot de passe bdd

        // 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)
        try {
            // connexion à la base de donnée
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', $user, $pass);
			$stmt = $dbh->prepare('DELETE FROM cours WHERE id = :id');
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