<?php
//----------------------------------------------------------
//---- Author: Dirk van der Walt
//---- License: GPL v3
//---- Description: 
//---- Date: 20-11-2012
//------------------------------------------------------------

namespace App\Model\Table;
use Cake\ORM\Table;

class UnknownDynamicClientsTable extends Table {
    public function initialize(array $config){
        $this->addBehavior('Timestamp');
    }
}   
