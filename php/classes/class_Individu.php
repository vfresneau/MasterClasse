<?php

Class Individu {
	private $_ID;
	private $_NOM;
	private $_PRENOM;
	private $_EMAIL;
	private $_MDP;
	private $_ADMIN;

	//S'appelle automatiquement à la création d'instance
    function __construct($ID, $NOM, $PRENOM, $EMAIL, $MDP, $ADMIN){
		$this->_ID = $ID;
		$this->_NOM = $NOM;
		$this->_PRENOM = $PRENOM;
		$this->_EMAIL = $EMAIL;
		$this->_MDP = $MDP;
		$this->_ADMIN = $ADMIN;
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

	public function get_PRENOM(){
		return $this->_PRENOM;
	}

	public function set_PRENOM($_PRENOM){
		$this->_PRENOM = $_PRENOM;
	}

	public function get_EMAIL(){
		return $this->_EMAIL;
	}

	public function set_EMAIL($_EMAIL){
		$this->_EMAIL = $_EMAIL;
	}

	public function get_MDP(){
		return $this->_MDP;
	}

	public function set_MDP($_MDP){
		$this->_MDP = $_MDP;
	}

	public function get_ADMIN(){
		return $this->_ADMIN;
	}

	public function set_ADMIN($_ADMIN){
		$this->_ADMIN = $_ADMIN;
	}

	public function createIndividu(){
        $user = 'charley'; // Identifiant de bdd
        $pass = '@JuNiRMdv5GZb'; // Mot de passe bdd

        // 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)
        try {
            // connexion à la base de donnée
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', $user, $pass);
			$stmt = $dbh->prepare('INSERT INTO Individu (nom, prenom, email, mdp, admin) VALUES (:nom, :prenom, :email, :mdp, :admin)');
			$stmt->bindParam(':nom', $this->_NOM);
			$stmt->bindParam(':prenom', $this->_PRENOM);
			$stmt->bindParam(':email', $this->_EMAIL);
			$stmt->bindParam(':mdp', $this->_MDP);
			$stmt->bindParam(':admin', $this->_ADMIN);
			$stmt->execute();//ferme la connexion à la base
            $dbh = null;
        } catch (PDOException $e) {
            print 'Erreur !: ' . $e->getMessage() . '<br/>';
            die();
        }
	}

	public function readIndividu(){
        $user = 'charley'; // Identifiant de bdd
        $pass = '@JuNiRMdv5GZb'; // Mot de passe bdd

        // 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)
        try {
            // connexion à la base de donnée
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', $user, $pass);
			$stmt = $dbh->prepare('SELECT * FROM Individu WHERE id = :id');
			$stmt->bindParam(':id', $this->_ID);
			$stmt->execute();
            $row = $stmt->fetch();
            $singleIndividu = new Individu($row['nom'], $row['prenom'], $row['email'], $row['mdp'], $row['admin']);//ferme la connexion à la base
            $dbh = null;
        } catch (PDOException $e) {
            print 'Erreur !: ' . $e->getMessage() . '<br/>';
            die();
        }
		$monjSon = '{$singleIndividu:'.json_encode(array($singleIndividu->toArray($singleIndividu))).'}';
        // Je l'affiche
        return $monjSon;
		}

	public function updateIndividu(){
        $user = 'charley'; // Identifiant de bdd
        $pass = '@JuNiRMdv5GZb'; // Mot de passe bdd

        // 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)
        try {
            // connexion à la base de donnée
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', $user, $pass);
			$stmt = $dbh->prepare('UPDATE Individu SET nom = :nom, prenom = :prenom, email = :email, mdp = :mdp, admin = :admin WHERE id = :id');
			$stmt->bindParam(':id', $this->_ID);
			$stmt->bindParam(':nom', $this->_NOM);
			$stmt->bindParam(':prenom', $this->_PRENOM);
			$stmt->bindParam(':email', $this->_EMAIL);
			$stmt->bindParam(':mdp', $this->_MDP);
			$stmt->bindParam(':admin', $this->_ADMIN);
			$stmt->execute();//ferme la connexion à la base
            $dbh = null;
        } catch (PDOException $e) {
            print 'Erreur !: ' . $e->getMessage() . '<br/>';
            die();
        }
	}

	public function deleteIndividu(){
        $user = 'charley'; // Identifiant de bdd
        $pass = '@JuNiRMdv5GZb'; // Mot de passe bdd

        // 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)
        try {
            // connexion à la base de donnée
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', $user, $pass);
			$stmt = $dbh->prepare('DELETE FROM Individu WHERE id = :id');
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