<?php ////balise de debut

Class exercice_examen {
	private $_ID;
	private $_ID_EXERCICE;
	private $_ID_EXAMEN;


/**
* la méthode construct s'appelle automatiquement lorsque 
* l'on fait une instance de cette class
* elle hydrate ou remplie les attributs de l'instance de la classe exercice_examen
 *
 * @param [type] $ID
 * @param [type] $ID_EXERCICE
 * @param [type] $ID_EXAMEN
 */
    function __construct($ID, $ID_EXERCICE, $ID_EXAMEN){
		$this->_ID = $ID;
		$this->_ID_EXERCICE = $ID_EXERCICE;
		$this->_ID_EXAMEN = $ID_EXAMEN;
	}

    //les accesseurs li la valeur
	//Les getters nous permet d’acceder au contenu des propriétés privé de la Classe.
	//change la valeur de l'attribue
	//Les setters nous permettent de modifier les contenus des propriétés privés de la Classe.

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

	//Fonction qui créer un exercice d'examen
	public function createexercice_examen(){

// 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)

//La connexion est établie en créant une instance de la classe de base de PDO.
//Le constructeur accepte des paramètres pour spécifier la source de la base de données (mysql: Systeme de Base de Donéées (SGBD) ,dbname: nom de la base dans le SGBD, login, mdp
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
			// prépare une requete avec 2 parametres
			$stmt = $dbh->prepare('INSERT INTO exercice_examen (id_exercice, id_examen) VALUES (:id_exercice, :id_examen)');
			//Lie une variable PHP à un marqueur nommé  correspondant dans la requête SQL utilisée, pour préparer la requête.
			$stmt->bindParam(':id_exercice', $this->_ID_EXERCICE);
			$stmt->bindParam(':id_examen', $this->_ID_EXAMEN);
			$stmt->execute();
			//ferme la connexion à la base
            $dbh = null;

	}

	//Fonction qui lit un exercice d'examen
	public function readexercice_examen(){

            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
			$stmt = $dbh->prepare('SELECT * FROM exercice_examen WHERE id = :id');
			$stmt->bindParam(':id', $this->_ID);
			$stmt->execute();
            $row = $stmt->fetch();
            $singleexercice_examen = new exercice_examen($row['id'],$row['id_exercice'], $row['id_examen']);//ferme la connexion à la base
            $dbh = null;
		$monjSon = '{$singleexercice_examen:'.json_encode(array($singleexercice_examen->toArray($singleexercice_examen))).'}';
        return $monjSon;
		}

		//Fonction qui met à jour un exercice d'examen
	public function updateexercice_examen(){

            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
			$stmt = $dbh->prepare('UPDATE exercice_examen SET id_exercice = :id_exercice, id_examen = :id_examen WHERE id = :id');
			$stmt->bindParam(':id', $this->_ID);
			$stmt->bindParam(':id_exercice', $this->_ID_EXERCICE);
			$stmt->bindParam(':id_examen', $this->_ID_EXAMEN);
			$stmt->execute();//ferme la connexion à la base
            $dbh = null;
	}

	//Fonction qui efface un exercice d'examen
	public function deleteexercice_examen(){

            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
			$stmt = $dbh->prepare('DELETE FROM exercice_examen WHERE id = :id');
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