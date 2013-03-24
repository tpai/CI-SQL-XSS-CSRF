<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Security extends CI_Controller {
	public function index() {
		$this->load->view('security');
	}
	public function sql() {
		$this->load->view('sql');
	}
	public function xss() {
		$this->load->view('xss');
	}
	public function csrf() {
		$this->load->view('csrf');
	}
}