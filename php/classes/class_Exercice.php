<?php
//permet d'utiliser le fichier inclus entre parenthèse, et hérite de la portée des variables suivant le chemin du fichier fourni
require_once ("class_reponse.php");

//Les Class servent structurer les informations et apporte des méthodes
class Exercice
{
    private $_ID;
    private $_NOM;
    private $_CORRECTION;
    private $_CONSIGNE;
    private $_REPONSEATTENDU;
    private $_VALIDE;
    private $_NIVEAU;
    private $_LIEN;
    private $_ID_THEME;
    //permet d'avoir acces aux reponses dans le json de l'exercice
    private $_REPONSES = [];

    /**
     * la méthode construct s'appelle automatiquement lorsque
     * l'on fait une instance de cette class
     * elle hydrate ou remplie les attributs de l'instance de la classe Exercice
     *
     * @param [type] $ID
     * @param [type] $NOM
     * @param [type] $CORRECTION
     * @param [type] $CONSIGNE
     * @param [type] $REPONSEATTENDU
     * @param [type] $VALIDE
     * @param [type] $NIVEAU
     * @param [type] $LIEN
     * @param [type] $ID_THEME
     */
    function __construct($ID, $NOM, $CORRECTION, $CONSIGNE, $REPONSEATTENDU, $VALIDE, $NIVEAU, $LIEN, $ID_THEME)
    {
        $this->_ID = $ID;
        $this->_NOM = $NOM;
        $this->_CORRECTION = $CORRECTION;
        $this->_CONSIGNE = $CONSIGNE;
        $this->_REPONSEATTENDU = $REPONSEATTENDU;
        $this->_VALIDE = $VALIDE;
        $this->_NIVEAU = $NIVEAU;
        $this->_LIEN = $LIEN;
        $this->_ID_THEME = $ID_THEME;
        // quand je fait une instance de exercice
        // si on ma passé un id --> je vais récupérer toutes les réponses de l'exercice
        if ($this->_ID != 0)
        {
            $this->getAllReponses();
        }
    }
    //les guetteurs :méthode pour obtenir la valeur d'un attribut
    //Les Setters : méthode pour dénifie un attribut
    public function get_ID()
    {
        return $this->_ID;
    }

    public function set_ID($_ID)
    {
        $this->_ID = $_ID;
    }

    public function get_NOM()
    {
        return $this->_NOM;
    }

    public function set_NOM($_NOM)
    {
        $this->_NOM = $_NOM;
    }

    public function get_CORRECTION()
    {
        return $this->_CORRECTION;
    }

    public function set_CORRECTION($_CORRECTION)
    {
        $this->_CORRECTION = $_CORRECTION;
    }

    public function get_CONSIGNE()
    {
        return $this->_CONSIGNE;
    }

    public function set_CONSIGNE($_CONSIGNE)
    {
        $this->_CONSIGNE = $_CONSIGNE;
    }

    public function get_REPONSEATTENDU()
    {
        return $this->_REPONSEATTENDU;
    }

    public function set_REPONSEATTENDU($_REPONSEATTENDU)
    {
        $this->_REPONSEATTENDU = $_REPONSEATTENDU;
    }

    public function get_VALIDE()
    {
        return $this->_VALIDE;
    }

    public function set_VALIDE($_VALIDE)
    {
        $this->_VALIDE = $_VALIDE;
    }

    public function get_NIVEAU()
    {
        return $this->_NIVEAU;
    }

    public function set_NIVEAU($_NIVEAU)
    {
        $this->_NIVEAU = $_NIVEAU;
    }

    public function get_LIEN()
    {
        return $this->_LIEN;
    }

    public function set_LIEN($_LIEN)
    {
        $this->_LIEN = $_LIEN;
    }

    public function get_ID_THEME()
    {
        return $this->_ID_THEME;
    }

    public function set_ID_THEME($_ID_THEME)
    {
        $this->_ID_THEME = $_ID_THEME;
    }

    //Fonction Création exercice //
    public function createExercice()
    {
        // 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)
        //La connexion est établie en créant une instance de la classe de base de PDO.
        //Le constructeur accepte des paramètres pour spécifier la source de la base de données (mysql: Systeme de Base de Donéées (SGBD) ,dbname: nom de la base dans le SGBD, login, mdp)
        $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
        // prépare une requete avec 8 parametres
        $stmt = $dbh->prepare('INSERT INTO Exercice (nom, correction, consigne, reponseAttendu, valide, niveau, lien, id_theme) VALUES (:nom, :correction, :consigne, :reponseAttendu, :valide, :niveau, :lien, :id_theme)');
        //Lie une variable PHP à un marqueur nommé  correspondant dans la requête SQL utilisée, pour préparer la requête.
        $stmt->bindParam(':nom', $this->_NOM);
        $stmt->bindParam(':correction', $this->_CORRECTION);
        $stmt->bindParam(':consigne', $this->_CONSIGNE);
        $stmt->bindParam(':reponseAttendu', $this->_REPONSEATTENDU);
        $stmt->bindParam(':valide', $this->_VALIDE, PDO::PARAM_BOOL);
        $stmt->bindParam(':niveau', $this->_NIVEAU);
        $stmt->bindParam(':lien', $this->_LIEN);
        $stmt->bindParam(':id_theme', $this->_ID_THEME);
        $stmt->execute();
        //recupere l'id automatique qui a été fabriqué
        $this->_ID = $dbh->lastInsertId();
        //ferme la connexion à la base
        $dbh = null;

    }

    //fonction qui permet de récupérer toutes les reponses en fonction de l'id de l'exercice
    public function getAllReponses()
    {
        // 127.0.0.1 est l'adresse ip local du serveur (le fichier php étant executer sur le serveur, l'adresse du serveur est donc l'adresse local)
        //La connexion est établie en créant une instance de la classe de base de PDO.
        //Le constructeur accepte des paramètres pour spécifier la source de la base de données (mysql: Systeme de Base de Donéées (SGBD) ,dbname: nom de la base dans le SGBD, login, mdp)
        $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
        // prépare une requete avec 1 parametre
        $stmt = $dbh->prepare("SELECT * FROM reponse where id_exercice=:id");
        //Lie une variable PHP à un marqueur nommé  correspondant dans la requête SQL utilisée, pour préparer la requête.
        $stmt->bindParam(':id', $this->_ID);
        $stmt->execute();
        //retourne un tableau associatif contenant une ligne de la recherche tant qu'il reste des lignes dans la recherche
        while ($row = $stmt->fetch())
        {
            //pour chaque resultat je fabrique une Reponse de la classe Reponse
            $reponse = new Reponse();
            //pour chaque ligne de Reponse fabriqué, j'obtiens et definis les attributs de sa class
            $reponse->set_ID($row['id']);
            $reponse->set_DESCRIPTION($row['description']);
            $reponse->set_ID_EXERCICE($row['id_exercice']);
            //j'ajoute à mon tableau de reponse ma reponse en cours
            array_push($this->_REPONSES, $reponse);
        }
        //ferme la connexion à la base
        $dbh = null;
    }
    //méthode statique permet d'y accéder sans avoir besoin d'instancier la classe. Ceci peuvent être accédé statiquement depuis une instance d'objet.
    // -->Méthode static utiliser afin d'être appeller dans le webservice Exercice//
    public static function readAllExercice()
    {
        //tableau vide
        $liste_exercice = array();
        // 127.0.0.1 est l'adresse ip local du serveur (le fichier php étant executer sur le serveur, l'adresse du serveur est donc l'adresse local)
        //La connexion est établie en créant une instance de la classe de base de PDO.
        //Le constructeur accepte des paramètres pour spécifier la source de la base de données (mysql: Systeme de Base de Donéées (SGBD) ,dbname: nom de la base dans le SGBD, login, mdp)
        $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
        // prépare une requete avec 1 parametre
        $stmt = $dbh->prepare("SELECT * FROM Exercice");
        $stmt->execute();
        //retourne un tableau associatif contenant une ligne de la recherche tant qu'il reste des lignes dans la recherche
        while ($row = $stmt->fetch())
        {
            //pour chaque resultat je fabrique un exercice de la classe EXERCICE
            $monExercice = new Exercice($row['id'], $row['nom'], $row['correction'], $row['consigne'], $row['reponseAttendu'], $row['valide'], $row['niveau'], $row['lien'], $row['id_theme']);
            //j'ajoute à mon tableau d'exercice' mon exercice en cours
            array_push($liste_exercice, $monExercice);
            //ferme la connexion à la base
            $dbh = null;
        }
        //declaration d'un tableau
        $monTab = array();
        $i = 0;
        // on transforme l'objet en tableau (récursif sur les objets)
        foreach ($liste_exercice as $Exercice)
        {
            $array = $Exercice->toArray($Exercice);
            $monTab[$i] = $array;
            $i += 1;
        }
        //transforme en tableau d'object json ??
        $monJson = '{"Exercice":' . json_encode($monTab) . "}";
        echo $monJson;
    }

    //fonction public pour Lire un exercice //
    public function readExercice()
    {
        // 127.0.0.1 est l'adresse ip locale du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse locale)
        //La connexion est établie en créant une instance de la classe de base de PDO.
        //Le constructeur accepte des paramètres pour spécifier la source de la base de données (mysql: Systeme de Base de Donéées (SGBD) ,dbname: nom de la base dans le SGBD, login, mdp)
        $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
        // prépare une requete avec un parametre
        $stmt = $dbh->prepare('SELECT * FROM Exercice WHERE id = :id');
        //Lie une variable PHP à un marqueur nommé  correspondant dans la requête SQL utilisée, pour préparer la requête.
        $stmt->bindParam(':id', $this->_ID);
        $stmt->execute();
        //retourne un tableau associatif contenant une ligne de la recherche tant qu'il reste des lignes dans la recherche
        $row = $stmt->fetch();
        //pour chaque resultat je fabrique un exercice de la classe Exercice
        $singleExercice = new Exercice($row['id'], $row['nom'], $row['correction'], $row['consigne'], $row['reponseAttendu'], $row['valide'], $row['niveau'], $row['lien'], $row['id_theme']); //ferme la connexion à la base
        //ferme la connexion à la base
        $dbh = null;
        //transforme en tableau d'object json ??
        $monjSon = '{$singleExercice:' . json_encode(array($singleExercice->toArray($singleExercice))) . '}';
        // Je l'affiche
        return $monjSon;
    }

    //fonction public pour update un exercice //
    public function updateExercice()
    {
        $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
        $stmt = $dbh->prepare('UPDATE Exercice SET nom = :nom, correction = :correction, consigne = :consigne, reponseAttendu = :reponseAttendu, valide = :valide, niveau = :niveau, lien = :lien, id_theme = :id_theme WHERE id = :id');
        // prépare une requete avec 9 parametres
        $stmt->bindParam(':id', $this->_ID);
        $stmt->bindParam(':nom', $this->_NOM);
        $stmt->bindParam(':correction', $this->_CORRECTION);
        $stmt->bindParam(':consigne', $this->_CONSIGNE);
        $stmt->bindParam(':reponseAttendu', $this->_REPONSEATTENDU);
        $stmt->bindParam(':valide', $this->_VALIDE);
        $stmt->bindParam(':niveau', $this->_NIVEAU);
        $stmt->bindParam(':lien', $this->_LIEN);
        $stmt->bindParam(':id_theme', $this->_ID_THEME);
        $stmt->execute();
        $dbh = null;
    }

    //Fonction delete un exercice à partir d'un id//
    public function deleteExercice()
    {
        $dbh = new PDO('mysql:host=127.0.0.1;dbname=MASTER_CLASSE', LOGIN, MDP);
        $stmt = $dbh->prepare('DELETE FROM reponse WHERE id_exercice = :id_exercice');
        $stmt->bindParam(':id_exercice', $this->_ID);
        $stmt->execute();
        $stmt = $dbh->prepare('DELETE FROM Exercice WHERE id = :id');
        $stmt->bindParam(':id', $this->_ID);
        $stmt->execute();
        $dbh = null;
    }
    // permet de créer un json contenant les objets des objets
    public function toArray()
    {
        $array = get_object_vars($this);
        unset($array['_parent'], $array['_index']);
        array_walk_recursive($array, function (&$property)
        {
            if (is_object($property) && method_exists($property, 'toArray'))
            {
                $property = $property->toArray();
            }
        });
        return $array;
    }

}

