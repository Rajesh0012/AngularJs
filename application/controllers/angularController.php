<?php
/**
 * Created by Rajesh.
 * User: Rajesh
 * Date: 01-Jan-18
 * Time: 11:38 AM
 */


class angularController extends CI_Controller{


    function submitForm(){



        $this->load->view('header');
        $this->load->view('angular_form');
        $this->load->view('footer');
    }

    function submitData(){

     $data = json_decode(file_get_contents('php://input'));

     print_r($data);
        $name = $this->security->xss_clean($data->name);
    // echo $name = ;

        if(strlen($name)<3){

            echo 'Name is Required And Must Be Correct';
        }

    }
}