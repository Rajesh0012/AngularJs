<?php

class My_Model extends CI_Model{

    function getdata(){

       $data= $this->db->query('select *from employee');

        return $data;
    }

}