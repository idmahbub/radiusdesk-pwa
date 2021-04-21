<?php
//----------------------------------------------------------
//---- Author: Dirk van der Walt
//---- License: GPL v3
//---- Description: 
//---- Date: 20-11-2012
//------------------------------------------------------------


namespace App\Model\Table;

use Cake\ORM\Table;
use Cake\Validation\Validator;

class NaStatesTable extends Table {
	
    public function initialize(array $config){
        $this->addBehavior('Timestamp');
        $this->belongsTo('Nas');    
    }
    
}
