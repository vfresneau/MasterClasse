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
//DANS LE WS PHP DANS LA CLASSE REPONSE creéer une methode create qui me permet d'inserer une ligne dans la bd 
//dans le ws crreat exerccie verifier chaque variables envoyé suggestion 1234 et voir q'il y a quelque chose dedazns 
//une fois ok chaque fois qu'il y a quelque chose dedans fabriquer une nouvelle instance de réponse 
// SET id exercice et le paramettre de cet exercice est get id de l'instance de l'exercice fait au dessus 
// set description de mon instance de reponse je lui passe le $_poste de suggestion 
//appeler la fonction create 