<?php

Class Reponse {
	private $_ID;
	private $_DESCRIPTION;
    private $_ID_EXERCICE;

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
	//Fonction Création exercice //
	public function createReponse(){
        // 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)
        
            // connexion à la base de donnée
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
			$stmt = $dbh->prepare('INSERT INTO `reponse`( `description`, `id_exercice`) VALUES (:description, :id_exo)');
			$stmt->bindParam(':description', $this->_DESCRIPTION);
			$stmt->bindParam(':id_exo', $this->_ID_EXERCICE);
	
			$stmt->execute();//ferme la connexion à la base
			//recupere l'id automatique qui a été fabriqué
			$this->_ID= $dbh->lastInsertId();
            $dbh = null;
	}

	public function updateReponse(){
        // 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)
        
            // connexion à la base de donnée
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
