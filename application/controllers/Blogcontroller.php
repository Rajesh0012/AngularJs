<?php
require_once ('html.php');
class Blogcontroller extends CI_Controller implements html{

    function __construct()
    {
       // $this->load->model('My_model');
        parent::__construct();
    }

    function design($view='',$data = '')
    {
        $this->session->set_userdata('user','hello');

        if ( ! file_exists(APPPATH.'views/'.$view.'.php'))
        {
            // Whoops, we don't have a page for that!
            show_404();
        }

        $this->load->view('header', $data);
        $this->load->view('/'.$view, $data);
        $this->load->view('footer', $data);
    }

    function insertdata()
    {
            $this->load->library('encrypt');
            $data=$this->input->post();
            if($this->input->server('REQUEST_METHOD')==='POST')
            {

             }
        $this->load->library('unit_test');
        $this->unit->set_test_items(array('test_name', 'result'));


        self::design('table');
    }

function getdata(){

    $data=$this->My_model->getdata();
    self::design('table',$data);
}

    public function do_upload()
    {
        if($this->input->server('REQUEST_METHOD') === 'POST') {
            $config['upload_path'] = './public/user_images';
            $config['allowed_types'] = 'gif|jpg|png|jpeg';


            $this->load->library('upload', $config);

            if ($this->upload->do_upload('userfile'))
            {
                $data = array('upload_data' => $this->upload->data());

                //$this->load->view('success', $data);
                echo ($data['upload_data']['orig_name']);
            }else{
                   $error = array('error' => $this->upload->display_errors());
                   print_r($error);
            }
        }
        $this->load->view('form');
    }
}