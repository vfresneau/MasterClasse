<?php

Class theme {
	private $_ID;
	private $_NOM;

	//S'appelle automatiquement à la création d'instance
    function __construct($ID, $NOM){
		$this->_ID = $ID;
		$this->_NOM = $NOM;
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

	public function createtheme(){

        // 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)
        try {
            // connexion à la base de donnée
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
			$stmt = $dbh->prepare('INSERT INTO theme (nom) VALUES (:nom)');
			$stmt->bindParam(':nom', $this->_NOM);
			$stmt->execute();//ferme la connexion à la base
            $dbh = null;
        } catch (PDOException $e) {
            print 'Erreur !: ' . $e->getMessage() . '<br/>';
            die();
        }
	}

	// -->Méthode static pour l'utiliser dans le webservice, pour appeller tous les themes//
    public static function readAllTheme(){
       
        $liste_theme = array(); //tableau vide
    
        // 127.0.0.1 est l'adresse ip local du serveur (le fichier php étant executer sur le serveur, l'adresse du serveur est donc l'adresse local)
        try {
            // connexion à la base de donnée
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
            // envoie d'une requete à la base de données --> on récup l'exercice correspondant à l'id
            $stmt = $dbh->prepare("SELECT * FROM theme");
            $stmt->execute();
            // pour chaque ligne trouvé--> 
            while ($row = $stmt->fetch()) {
               //pour chaque resultat je fabrique un exercice de la classe EXERCICE 
                $monTheme = new theme ($row['id'],$row['nom']);
                //j'ajoute à mon tableau d'exercice' mon exercice en cours
                array_push($liste_theme, $monTheme);
                }
            //ferme la connexion à la base
            $dbh = null;
    
        } catch (PDOException $e) {
            print "Erreur !: " . $e->getMessage() . "<br/>";
            die();
        }
    
        $monTab = array();
        $i = 0;
    
        // on transforme l'objet en tableau (récursif sur les objets)
        foreach($liste_theme as $theme) {
            $array = $theme->toArray($theme);
            $monTab[$i] = $array;
            $i+=1;
        }
    
        $monJson = '{"theme":'.json_encode($monTab)."}";
        echo $monJson;
    }




	public function readtheme(){
       
        // 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)
        try {
            // connexion à la base de donnée
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
			$stmt = $dbh->prepare('SELECT * FROM theme WHERE id = :id');
			$stmt->bindParam(':id', $this->_ID);
			$stmt->execute();
            $row = $stmt->fetch();
            $singletheme = new theme($row['id'],$row['nom']);//ferme la connexion à la base
            $dbh = null;
        } catch (PDOException $e) {
            print 'Erreur !: ' . $e->getMessage() . '<br/>';
            die();
        }
		$monjSon = '{$singletheme:'.json_encode(array($singletheme->toArray($singletheme))).'}';
        // Je l'affiche
        return $monjSon;
		}

	public function updatetheme(){
     
        // 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)
        try {
            // connexion à la base de donnée
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
			$stmt = $dbh->prepare('UPDATE theme SET nom = :nom WHERE id = :id');
			$stmt->bindParam(':id', $this->_ID);
			$stmt->bindParam(':nom', $this->_NOM);
			$stmt->execute();//ferme la connexion à la base
            $dbh = null;
        } catch (PDOException $e) {
            print 'Erreur !: ' . $e->getMessage() . '<br/>';
            die();
        }
	}

	public function deletetheme(){
        
        // 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)
        try {
            // connexion à la base de donnée
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
			$stmt = $dbh->prepare('DELETE FROM theme WHERE id = :id');
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