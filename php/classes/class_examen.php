<?php

Class examen {
	private $_ID;
	private $_NOM;
	private $_NOMBRE_QUESTION;
	private $_NOMBRE_THEME;
	private $_ID_NIVEAU;

	//S'appelle automatiquement à la création d'instance
    function __construct($ID, $NOM, $NOMBRE_QUESTION, $NOMBRE_THEME, $ID_NIVEAU){
		$this->_ID = $ID;
		$this->_NOM = $NOM;
		$this->_NOMBRE_QUESTION = $NOMBRE_QUESTION;
		$this->_NOMBRE_THEME = $NOMBRE_THEME;
		$this->_ID_NIVEAU = $ID_NIVEAU;
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

	public function createexamen(){
        $user = 'charley'; // Identifiant de bdd
        $pass = '@JuNiRMdv5GZb'; // Mot de passe bdd

        // 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)
        try {
            // connexion à la base de donnée
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=', $user, $pass);
			$stmt = $dbh->prepare('INSERT INTO examen (nom, nombre_question, nombre_theme, id_niveau) VALUES (:nom, :nombre_question, :nombre_theme, :id_niveau)');
			$stmt->bindParam(':nom', $this->_NOM);
			$stmt->bindParam(':nombre_question', $this->_NOMBRE_QUESTION);
			$stmt->bindParam(':nombre_theme', $this->_NOMBRE_THEME);
			$stmt->bindParam(':id_niveau', $this->_ID_NIVEAU);
			$stmt->execute();//ferme la connexion à la base
            $dbh = null;
        } catch (PDOException $e) {
            print 'Erreur !: ' . $e->getMessage() . '<br/>';
            die();
        }
	}

	public function readexamen(){
        $user = 'charley'; // Identifiant de bdd
        $pass = '@JuNiRMdv5GZb'; // Mot de passe bdd

        // 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)
        try {
            // connexion à la base de donnée
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=', $user, $pass);
			$stmt = $dbh->prepare('SELECT * FROM examen WHERE id = :id');
			$stmt->bindParam(':id', $this->_ID);
			$stmt->execute();
            $row = $stmt->fetch();
            $singleexamen = new examen($row['nom'], $row['nombre_question'], $row['nombre_theme'], $row['id_niveau']);//ferme la connexion à la base
            $dbh = null;
        } catch (PDOException $e) {
            print 'Erreur !: ' . $e->getMessage() . '<br/>';
            die();
        }
		$monjSon = '{$singleexamen:'.json_encode(array($singleexamen->toArray($singleexamen))).'}';
        // Je l'affiche
        return $monjSon;
		}

	public function updateexamen(){
        $user = 'charley'; // Identifiant de bdd
        $pass = '@JuNiRMdv5GZb'; // Mot de passe bdd

        // 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)
        try {
            // connexion à la base de donnée
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=', $user, $pass);
			$stmt = $dbh->prepare('UPDATE examen SET nom = :nom, nombre_question = :nombre_question, nombre_theme = :nombre_theme, id_niveau = :id_niveau WHERE id = :id');
			$stmt->bindParam(':id', $this->_ID);
			$stmt->bindParam(':nom', $this->_NOM);
			$stmt->bindParam(':nombre_question', $this->_NOMBRE_QUESTION);
			$stmt->bindParam(':nombre_theme', $this->_NOMBRE_THEME);
			$stmt->bindParam(':id_niveau', $this->_ID_NIVEAU);
			$stmt->execute();//ferme la connexion à la base
            $dbh = null;
        } catch (PDOException $e) {
            print 'Erreur !: ' . $e->getMessage() . '<br/>';
            die();
        }
	}

	public function deleteexamen(){
        $user = 'charley'; // Identifiant de bdd
        $pass = '@JuNiRMdv5GZb'; // Mot de passe bdd

        // 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)
        try {
            // connexion à la base de donnée
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=', $user, $pass);
			$stmt = $dbh->prepare('DELETE FROM examen WHERE id = :id');
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