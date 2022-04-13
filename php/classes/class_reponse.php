<?php

//Les Class servent structurer les informations et apporte des méthodes
Class Reponse {
	private $_ID;
	private $_DESCRIPTION;
    private $_ID_EXERCICE;

//les guetteurs :méthode pour obtenir la valeur d'un attribut
//Les Setters : méthode pour dénifie un attribut

    public function get_ID(){
		return $this->_ID;
	}

	public function set_ID($_ID){
		$this->_ID = $_ID;
	}

	public function get_DESCRIPTION(){
		return $this->_DESCRIPTION;
	}

	public function set_DESCRIPTION($_DESCRIPTION){
		$this->_DESCRIPTION = $_DESCRIPTION;
	}

	public function get_ID_EXERCICE(){
		return $this->_ID_EXERCICE;
	}

	public function set_ID_EXERCICE($_ID_EXERCICE){
		$this->_ID_EXERCICE = $_ID_EXERCICE;
	}

	//Fonction Création de reponse //
	public function createReponse(){
// 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)

//La connexion est établie en créant une instance de la classe de base de PDO.
//Le constructeur accepte des paramètres pour spécifier la source de la base de données (mysql: Systeme de Base de Donéées (SGBD) ,dbname: nom de la base dans le SGBD, login, mdp)
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
			// prépare une requete avec 2 parametres
			$stmt = $dbh->prepare('INSERT INTO `reponse`( `description`, `id_exercice`) VALUES (:description, :id_exo)');
			//Lie une variable PHP à un marqueur nommé correspondant dans la requête SQL utilisée, pour préparer la requête.
			$stmt->bindParam(':description', $this->_DESCRIPTION);
			$stmt->bindParam(':id_exo', $this->_ID_EXERCICE);
			$stmt->execute();
			//recupere l'id automatique qui a été fabriqué
			$this->_ID= $dbh->lastInsertId();
			//ferme la connexion à la base
            $dbh = null;
	}

	//fonction public pour update une reponse //
	public function updateReponse(){
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
			$stmt = $dbh->prepare('UPDATE `reponse` SET `description`=:description,`id_exercice`=:id_exo WHERE `id`=:id');
			$stmt->bindParam(':description', $this->_DESCRIPTION);
			$stmt->bindParam(':id_exo', $this->_ID_EXERCICE);
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
