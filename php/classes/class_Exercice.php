<?php

Class Exercice {
	private $_ID;
	private $_NOM;
	private $_CORRECTION;
	private $_CONSIGNE;
	private $_REPONSEATTENDU;
	private $_VALIDE;
	private $_NIVEAU;
	private $_LIEN;
	private $_ID_THEME;

	//S'appelle automatiquement à la création d'instance
    function __construct($ID, $NOM, $CORRECTION, $CONSIGNE, $REPONSEATTENDU, $VALIDE, $NIVEAU, $LIEN, $ID_THEME){
		$this->_ID = $ID;
		$this->_NOM = $NOM;
		$this->_CORRECTION = $CORRECTION;
		$this->_CONSIGNE = $CONSIGNE;
		$this->_REPONSEATTENDU = $REPONSEATTENDU;
		$this->_VALIDE = $VALIDE;
		$this->_NIVEAU = $NIVEAU;
		$this->_LIEN = $LIEN;
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

	public function get_CORRECTION(){
		return $this->_CORRECTION;
	}

	public function set_CORRECTION($_CORRECTION){
		$this->_CORRECTION = $_CORRECTION;
	}

	public function get_CONSIGNE(){
		return $this->_CONSIGNE;
	}

	public function set_CONSIGNE($_CONSIGNE){
		$this->_CONSIGNE = $_CONSIGNE;
	}

	public function get_REPONSEATTENDU(){
		return $this->_REPONSEATTENDU;
	}

	public function set_REPONSEATTENDU($_REPONSEATTENDU){
		$this->_REPONSEATTENDU = $_REPONSEATTENDU;
	}

	public function get_VALIDE(){
		return $this->_VALIDE;
	}

	public function set_VALIDE($_VALIDE){
		$this->_VALIDE = $_VALIDE;
	}

	public function get_NIVEAU(){
		return $this->_NIVEAU;
	}

	public function set_NIVEAU($_NIVEAU){
		$this->_NIVEAU = $_NIVEAU;
	}

	public function get_LIEN(){
		return $this->_LIEN;
	}

	public function set_LIEN($_LIEN){
		$this->_LIEN = $_LIEN;
	}

	public function get_ID_THEME(){
		return $this->_ID_THEME;
	}

	public function set_ID_THEME($_ID_THEME){
		$this->_ID_THEME = $_ID_THEME;
	}

	//Fonction Création exercice //
	public function createExercice(){
        $user = 'charley'; // Identifiant de bdd
        $pass = '@JuNiRMdv5GZb'; // Mot de passe bdd

        // 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)
        try {
            // connexion à la base de donnée
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', $user, $pass);
			$stmt = $dbh->prepare('INSERT INTO Exercice (nom, correction, consigne, reponseAttendu, valide, niveau, lien, id_theme) VALUES (:nom, :correction, :consigne, :reponseAttendu, :valide, :niveau, :lien, :id_theme)');
			$stmt->bindParam(':nom', $this->_NOM);
			$stmt->bindParam(':correction', $this->_CORRECTION);
			$stmt->bindParam(':consigne', $this->_CONSIGNE);
			$stmt->bindParam(':reponseAttendu', $this->_REPONSEATTENDU);
			$stmt->bindParam(':valide', $this->_VALIDE, PDO::PARAM_BOOL);
			$stmt->bindParam(':niveau', $this->_NIVEAU);
			$stmt->bindParam(':lien', $this->_LIEN);
			$stmt->bindParam(':id_theme', $this->_ID_THEME);
			$stmt->execute();//ferme la connexion à la base
            $dbh = null;
        } catch (PDOException $e) {
            print 'Erreur !: ' . $e->getMessage() . '<br/>';
            die();
        }
	}

	// -->Méthode static pour l'utiliser dans le webservice, pour appeller tous les exercices//
public static function readAllExercice(){
	$user = "charley"; // Identifiant
	$pass = "@JuNiRMdv5GZb"; // Mot de passe
	$liste_exercice = array(); //tableau vide

	// 127.0.0.1 est l'adresse ip local du serveur (le fichier php étant executer sur le serveur, l'adresse du serveur est donc l'adresse local)
	try {
		// connexion à la base de donnée
		$dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', $user, $pass);
		// envoie d'une requete à la base de données --> on récup l'exercice correspondant à l'id
		$stmt = $dbh->prepare("SELECT * FROM Exercice");
		$stmt->execute();
		// pour chaque ligne trouvé--> y en à qu'un ici
		while ($row = $stmt->fetch()) {
		   //pour chaque resultat je fabrique un exercice de la classe EXERCICE 
			$monExercice = new Exercice($row['id'],$row['nom'], $row['correction'], $row['consigne'], $row['reponseAttendu'], $row['valide'], $row['niveau'], $row['lien'], $row['id_theme']);
			//j'ajoute à mon tableau d'exercice' mon exercice en cours
			array_push($liste_exercice, $monExercice);

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
	foreach($liste_exercice as $Exercice){
		$array = $Exercice->toArray($Exercice);
		$monTab[$i] = $array;
		$i+=1;
	}

	$monJson = '{"Exercice":'.json_encode($monTab)."}";
	echo $monJson;
}


//fonction pour Lire un exercice //
	public function readExercice(){
        $user = 'charley'; // Identifiant de bdd
        $pass = '@JuNiRMdv5GZb'; // Mot de passe bdd

        // 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)
        try {
            // connexion à la base de donnée
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', $user, $pass);
			$stmt = $dbh->prepare('SELECT * FROM Exercice WHERE id = :id');
			$stmt->bindParam(':id', $this->_ID);
			$stmt->execute();
            $row = $stmt->fetch();
            $singleExercice = new Exercice($row['id'],$row['nom'], $row['correction'], $row['consigne'], $row['reponseAttendu'], $row['valide'], $row['niveau'], $row['lien'], $row['id_theme']);//ferme la connexion à la base
            $dbh = null;
        } catch (PDOException $e) {
            print 'Erreur !: ' . $e->getMessage() . '<br/>';
            die();
        }
		$monjSon = '{$singleExercice:'.json_encode(array($singleExercice->toArray($singleExercice))).'}';
        // Je l'affiche
        return $monjSon;
		}



	public function updateExercice(){
        $user = 'charley'; // Identifiant de bdd
        $pass = '@JuNiRMdv5GZb'; // Mot de passe bdd

        // 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)
        try {
            // connexion à la base de donnée
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', $user, $pass);
			$stmt = $dbh->prepare('UPDATE Exercice SET nom = :nom, correction = :correction, consigne = :consigne, reponseAttendu = :reponseAttendu, valide = :valide, niveau = :niveau, lien = :lien, id_theme = :id_theme WHERE id = :id');
			$stmt->bindParam(':id', $this->_ID);
			$stmt->bindParam(':nom', $this->_NOM);
			$stmt->bindParam(':correction', $this->_CORRECTION);
			$stmt->bindParam(':consigne', $this->_CONSIGNE);
			$stmt->bindParam(':reponseAttendu', $this->_REPONSEATTENDU);
			$stmt->bindParam(':valide', $this->_VALIDE);
			$stmt->bindParam(':niveau', $this->_NIVEAU);
			$stmt->bindParam(':lien', $this->_LIEN);
			$stmt->bindParam(':id_theme', $this->_ID_THEME);
			$stmt->execute();//ferme la connexion à la base
            $dbh = null;
        } catch (PDOException $e) {
            print 'Erreur !: ' . $e->getMessage() . '<br/>';
            die();
        }
	}

	//Fcontion delete //
	public function deleteExercice(){
        $user = 'charley'; // Identifiant de bdd
        $pass = '@JuNiRMdv5GZb'; // Mot de passe bdd

        // 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)
        try {
            // connexion à la base de donnée
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', $user, $pass);
			$stmt = $dbh->prepare('DELETE FROM Exercice WHERE id = :id');
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