<?php

Class exercice_examen {
	private $_ID;
	private $_ID_EXERCICE;
	private $_ID_EXAMEN;

	//S'appelle automatiquement à la création d'instance
    function __construct($ID, $ID_EXERCICE, $ID_EXAMEN){
		$this->_ID = $ID;
		$this->_ID_EXERCICE = $ID_EXERCICE;
		$this->_ID_EXAMEN = $ID_EXAMEN;
	}

	public function get_ID(){
		return $this->_ID;
	}

	public function set_ID($_ID){
		$this->_ID = $_ID;
	}

	public function get_ID_EXERCICE(){
		return $this->_ID_EXERCICE;
	}

	public function set_ID_EXERCICE($_ID_EXERCICE){
		$this->_ID_EXERCICE = $_ID_EXERCICE;
	}

	public function get_ID_EXAMEN(){
		return $this->_ID_EXAMEN;
	}

	public function set_ID_EXAMEN($_ID_EXAMEN){
		$this->_ID_EXAMEN = $_ID_EXAMEN;
	}

	public function createexercice_examen(){
        $user = 'charley'; // Identifiant de bdd
        $pass = '@JuNiRMdv5GZb'; // Mot de passe bdd

        // 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)
        try {
            // connexion à la base de donnée
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=', $user, $pass);
			$stmt = $dbh->prepare('INSERT INTO exercice_examen (id_exercice, id_examen) VALUES (:id_exercice, :id_examen)');
			$stmt->bindParam(':id_exercice', $this->_ID_EXERCICE);
			$stmt->bindParam(':id_examen', $this->_ID_EXAMEN);
			$stmt->execute();//ferme la connexion à la base
            $dbh = null;
        } catch (PDOException $e) {
            print 'Erreur !: ' . $e->getMessage() . '<br/>';
            die();
        }
	}

	public function readexercice_examen(){
        $user = 'charley'; // Identifiant de bdd
        $pass = '@JuNiRMdv5GZb'; // Mot de passe bdd

        // 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)
        try {
            // connexion à la base de donnée
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=', $user, $pass);
			$stmt = $dbh->prepare('SELECT * FROM exercice_examen WHERE id = :id');
			$stmt->bindParam(':id', $this->_ID);
			$stmt->execute();
            $row = $stmt->fetch();
            $singleexercice_examen = new exercice_examen($row['id_exercice'], $row['id_examen']);//ferme la connexion à la base
            $dbh = null;
        } catch (PDOException $e) {
            print 'Erreur !: ' . $e->getMessage() . '<br/>';
            die();
        }
		$monjSon = '{$singleexercice_examen:'.json_encode(array($singleexercice_examen->toArray($singleexercice_examen))).'}';
        // Je l'affiche
        return $monjSon;
		}

	public function updateexercice_examen(){
        $user = 'charley'; // Identifiant de bdd
        $pass = '@JuNiRMdv5GZb'; // Mot de passe bdd

        // 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)
        try {
            // connexion à la base de donnée
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=', $user, $pass);
			$stmt = $dbh->prepare('UPDATE exercice_examen SET id_exercice = :id_exercice, id_examen = :id_examen WHERE id = :id');
			$stmt->bindParam(':id', $this->_ID);
			$stmt->bindParam(':id_exercice', $this->_ID_EXERCICE);
			$stmt->bindParam(':id_examen', $this->_ID_EXAMEN);
			$stmt->execute();//ferme la connexion à la base
            $dbh = null;
        } catch (PDOException $e) {
            print 'Erreur !: ' . $e->getMessage() . '<br/>';
            die();
        }
	}

	public function deleteexercice_examen(){
        $user = 'charley'; // Identifiant de bdd
        $pass = '@JuNiRMdv5GZb'; // Mot de passe bdd

        // 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)
        try {
            // connexion à la base de donnée
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=', $user, $pass);
			$stmt = $dbh->prepare('DELETE FROM exercice_examen WHERE id = :id');
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