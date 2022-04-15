<?php

//Les Class servent structurer les informations et apporte des méthodes
Class Individu {
	private $_ID;
	private $_NOM;
	private $_PRENOM;
	private $_EMAIL;
	private $_MDP;
	private $_ADMIN;

	/**
	* la méthode construct s'appelle automatiquement lorsque 
	* l'on fait une instance de cette class
	* elle hydrate ou remplie les attributs de l'instance de la classe Individu
	*
	 * @param [type] $ID
	 * @param [type] $NOM
	 * @param [type] $PRENOM
	 * @param [type] $EMAIL
	 * @param [type] $MDP
	 * @param [type] $ADMIN
	 */
    function __construct($ID, $NOM, $PRENOM, $EMAIL, $MDP, $ADMIN){
		$this->_ID = $ID;
		$this->_NOM = $NOM;
		$this->_PRENOM = $PRENOM;
		$this->_EMAIL = $EMAIL;
		$this->_MDP = hash("sha256",$MDP);
		$this->_ADMIN = $ADMIN;
	}
//les guetteurs :méthode pour obtenir la valeur d'un attribut
//Les Setters : méthode pour dénifir un attribut

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
		//on definis un hachage sha256 pour l'atribut mot de pass//
		$this->_MDP = hash("sha256",$_MDP);
	}

	public function get_ADMIN(){
		return $this->_ADMIN;
	}

	public function set_ADMIN($_ADMIN){
		$this->_ADMIN = $_ADMIN;
	}
	
	//Fonction qui verifie l'email et  MDT en base de données et recupère l'id de l'utilisateur s'il existe
	public function connexion(){
		// 127.0.0.1 est l'adresse ip local du serveur (le fichier php étant executer sur le serveur, l'adresse du serveur est donc l'adresse local)

			//La connexion est établie en créant une instance de la classe de base de PDO.
			//Le constructeur accepte des paramètres pour spécifier la source de la base de données (mysql: Systeme de Base de Donéées (SGBD) ,dbname: nom de la base dans le SGBD, login, mdp)
			$dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
			// prépare une requete avec 2 parametres
			$stmt = $dbh->prepare("SELECT * FROM Individu where email =:MAIL and mdp=:MDP");
			//Lie une variable PHP à un marqueur nommé  correspondant dans la requête SQL utilisée, pour préparer la requête.
			$stmt->bindParam(':MAIL', $this->_EMAIL);
			$stmt->bindParam(':MDP', $this->_MDP);
			$stmt->execute();
			//retourne un tableau associatif contenant une ligne de la recherche tant qu'il reste des lignes dans la recherche 
			while ($row = $stmt->fetch()) {
				//on hydrate l'attribut id
				$this->_ID=$row["id"];
				//on hydrate l'attribut admin
				$this->_ADMIN=$row["admin"];
			}
			//ferme la connexion à la base
			$dbh = null;
	}



//
	public function createIndividu(){
    
        // 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)

            //La connexion est établie en créant une instance de la classe de base de PDO.
			//Le constructeur accepte des paramètres pour spécifier la source de la base de données (source de la Bd, login, mdp)
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
			// prépare une requete avec 5 parametres
			$stmt = $dbh->prepare('INSERT INTO Individu (nom, prenom, email, mdp, admin) VALUES (:nom, :prenom, :email, :mdp, :admin)');
			//Lie une variable PHP à un marqueur nommé  correspondant dans la requête SQL utilisée, pour préparer la requête.
			$stmt->bindParam(':nom', $this->_NOM);
			$stmt->bindParam(':prenom', $this->_PRENOM);
			$stmt->bindParam(':email', $this->_EMAIL);
			$stmt->bindParam(':mdp', $this->_MDP);
			$stmt->bindParam(':admin', $this->_ADMIN);
			$stmt->execute();
			//ferme la connexion à la base
            $dbh = null;
	}



	public function updateIndividu(){
    
        // 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)

            //La connexion est établie en créant une instance de la classe de base de PDO.
			//Le constructeur accepte des paramètres pour spécifier la source de la base de données (source de la Bd, login, mdp)
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
			$stmt = $dbh->prepare('UPDATE Individu SET nom = :nom, prenom = :prenom, email = :email, mdp = :mdp, admin = :admin WHERE id = :id');
			//Lie une variable PHP à un marqueur nommé  correspondant dans la requête SQL utilisée, pour préparer la requête.
			$stmt->bindParam(':id', $this->_ID);
			$stmt->bindParam(':nom', $this->_NOM);
			$stmt->bindParam(':prenom', $this->_PRENOM);
			$stmt->bindParam(':email', $this->_EMAIL);
			$stmt->bindParam(':mdp', $this->_MDP);
			$stmt->bindParam(':admin', $this->_ADMIN);
			$stmt->execute();//ferme la connexion à la base
            //ferme la connexion à la base
			$dbh = null;
	}

	public function deleteIndividu(){
    
        // 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)

            //La connexion est établie en créant une instance de la classe de base de PDO.
			//Le constructeur accepte des paramètres pour spécifier la source de la base de données (source de la Bd, login, mdp)
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
			$stmt = $dbh->prepare('DELETE FROM Individu WHERE id = :id');
			//Lie une variable PHP à un marqueur nommé  correspondant dans la requête SQL utilisée, pour préparer la requête.
			$stmt->bindParam(':id', $this->_ID);
			$stmt->execute();
			//ferme la connexion à la base
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