<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Hack Simulator - Cross-Site Scripting</title>
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
		<h1><a href='<?php echo base_url(); ?>'>Home</a> > Cross-Site Scripting</h1>
		<div id="panel" class="hero-unit">
			<center><table width="100%"><tr><td>
				<a id="start" href="#head"><h2>Original Use</h2></a>
				</td><td>
				<a id="attack" href="#head"><h2>Hacking</h2></a>
				</td><td>
				<a id="avoid" href="#head"><h2>Prevention</h2></a>
			</td></table></center>
		</div>
		<a name="head">&nbsp;</a>
		<button id="prev" class="btn">＜Previous</button>
		<button id="next" class="btn">Next＞</button>
		<br><br><br>
		<form action="" method="post">
			<label>Name</label>
				<input type='text' id='name' placeholder='name' disabled='true' />
			<label>E-Mail</label>
				<input type='text' id='email' placeholder='your@email.com' disabled='true' />
			<label>Concept</label>
				<textarea id='content' placeholder='message' disabled='true'></textarea>
			<br><input type='button' value='Submit' class='btn btn-primary' />
		</form>
		<label>Message</label>
		<pre id="msg" style="color: red;"></pre>
		<label>Code</label>
		<pre id="demo"></pre>
		<label>Output</label>
		<pre id="result"></pre>
		<div style="height: 1000px;">&nbsp;</div>
	</div>
	<script src="<?php echo base_url(); ?>assets/js/xss_sim.js"></script>
</body>
</html>