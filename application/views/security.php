<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>攻擊流程演示</title>
	<link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/css/bootstrap-combined.min.css" rel="stylesheet">
	<script src="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/js/bootstrap.min.js"></script>
</head>
<body>
	<div class="container">
		<h1>攻擊流程演示<small>基於CodeIgniter Framework</small></h1>
		<table class="table">
		<tr><td>
			<h2>SQL Injection</h2>
			<a href="<?php echo base_url(); ?>security/sql" class="btn">前往<i class="icon-chevron-right"></i></a>
		</td>
		<tr><td>
			<h2>Cross-Site Scripting</h2>
			<a href="<?php echo base_url(); ?>security/xss" class="btn">前往<i class="icon-chevron-right"></i></a>
		</td>
		<tr><td>
			<h2>Cross-Site Request Forgery</h2>
			<a href="<?php echo base_url(); ?>security/csrf" class="btn">前往<i class="icon-chevron-right"></i></a>
		</td>
		</table>
	</div>
</body>
</html>