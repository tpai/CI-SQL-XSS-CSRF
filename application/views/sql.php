<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>攻擊流程演示 - SQL Injection</title>
	<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
	<link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/css/bootstrap-combined.min.css" rel="stylesheet">
	<script src="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/js/bootstrap.min.js"></script>
	<style>
		table td {
			text-align: center;
		}
		pre {
			font-size: 20px;
			line-height: 30px;
		}
	</style>
</head>
<body>
	<div class="container">
		<h1><a href='<?php echo base_url(); ?>'>首頁</a> > SQL Injection</h1>
		<div id="panel" class="hero-unit">
			<center><table width="100%"><tr><td>
				<a id="start" href="#head"><h2>正常使用</h2></a>
				</td><td>
				<a id="attack" href="#head"><h2>攻擊模擬</h2></a>
				</td><td>
				<a id="avoid" href="#head"><h2>預防措施</h2></a>
			</td></table></center>
		</div>
		<a name="head">&nbsp;</a>
		<button id="prev" class="btn">＜上一步</button>
		<button id="next" class="btn">下一步＞</button>
		<br><br><br>
		<form action="" method="post">
			<label>帳號</label>
				<input type='text' id='user' placeholder='username' disabled='true' />
			<label>密碼</label>
				<input type='password' id='pwd' placeholder='password' disabled='true' />
			<br><input type='button' value='登入' class='btn btn-primary' />
		</form>
		<label>訊息</label>
		<pre id="msg" style="color: red;"></pre>
		<label>程式</label>
		<pre id="demo"></pre>
		<label>輸出</label>
		<pre id="result"></pre>
		<div style="height: 1000px;">&nbsp;</div>
	</div>
	<script src="<?php echo base_url(); ?>assets/js/sql_sim.js"></script>
</body>
</html>