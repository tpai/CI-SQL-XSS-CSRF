<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>攻擊流程演示 - Cross-Site Scripting</title>
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
		<h1><a href='<?php echo base_url(); ?>'>首頁</a> > Cross-Site Request Forgery</h1>
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
			<h3>留言列表</h3>
			<table id='msg_list' class="table">
				<tr><th>ID</th><th>標題</th><th>&nbsp;</th></tr>
				<tr id='msg_1'>
					<td>1</td><td>Be a man, do the right thing.</td>
					<td>
						<a href='#' class='btn btn-danger'>刪除</a>
					</td>
				</tr>
				<tr id='msg_2'>
					<td>2</td><td>Somebody gonna hurt real bad.</td>
					<td>
						<a href='#' class='btn btn-danger'>刪除</a>
					</td>
				</tr>
				<tr id='msg_3'>
					<td>3</td><td>Boo your opinion!</td>
					<td>
						<a href='#' class='btn btn-danger'>刪除</a>
					</td>
				</tr>
				<tr id='msg_4' style='background-color: lightGray;'>
					<td>4</td><td><img src='/meesage/remove/1' /> ← Look at this!</td>
					<td>
						&nbsp;
					</td>
				</tr>
			</table>
		</form>
		<label>訊息</label>
		<pre id="msg" style="color: red;"></pre>
		<label>程式</label>
		<pre id="demo"></pre>
		<div style="height: 1000px;">&nbsp;</div>
	</div>
	<script src="<?php echo base_url(); ?>assets/js/csrf_sim.js"></script>
</body>
</html>