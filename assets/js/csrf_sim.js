var stage, counter

//draw color
var highlight = function(str, color) {
	if(color == null)color = "blue"
	return "<font color='"+color+"'>"+str+"</font>"
};

//plain text
var textize = function(str) {
	return str.replace(/</g, "&lt;").replace(/>/g, "&gt;")
};

//init
var empty_all = function() {
	counter = -1
	$("tr[id^='msg_']").show()
	$("tr[id^='msg_'] a").show()
	$("#msg_2").css("background-color", "white")
	$("#msg_4").css("display", "none")
	$("#msg").html("")
	$("#demo").html("")
};
empty_all()

//previous
$("#prev").click(function() {
	if(counter > 0)counter --
	motion[stage][counter]()
})

//next
$("#next").click(function() {
	if(counter < motion[stage].length - 1)counter ++
	motion[stage][counter]()
})

//original use
$("#start").click(function() {
	empty_all()
	stage = "start"
})

//hacking
$("#attack").click(function() {
	empty_all()
	stage = "attack"
})

//prevention
$("#avoid").click(function() {
	empty_all()
	stage = "avoid"
})

//steps
var motion = {
	"start": [
		function() {
			$("#msg").html("This is a reply list, admin can delete by pressing red button.")
			$("#demo").html("")
		},
		function() {
			$("#msg").html("The html code of delete button as below, the '1,2,3' means id of these replies.")
			$("#demo").html("&lt;a href='/message/remove/"+highlight("1", "darkOrange")+"' class='btn btn-danger'&gt;Delete&lt;/a&gt;\n"+
					"&lt;a href='/message/remove/"+highlight("2", "darkOrange")+"' class='btn btn-danger'&gt;Delete&lt;/a&gt;\n"+
					"&lt;a href='/message/remove/"+highlight("3", "darkOrange")+"' class='btn btn-danger'&gt;Delete&lt;/a&gt;\n"
				);
		},
		function() {
			$("#msg").html("This is php program of deleting reply.")
			$("#demo").html("if($this->session->userdata('admin') == true) {\n"+
				"  "+highlight("$id")+" = "+highlight("$this->uri->segment(3)", "darkOrange")+";\n"+
				"  $this->db->query(\"delete from message where id = '\"."+highlight("$id")+".\"'\");\n"+
				"}")
		},
		function() {
			$("#msg").html("Admin press the 2nd button, then generate SQL statement with parameters.")
			$("#msg_2").css("background-color", "pink")
			$("#demo").html("if($this->session->userdata('admin') == true) {\n"+
				"  "+highlight("$id")+" = "+highlight("2", "darkOrange")+";\n"+
				"  $this->db->query(\"delete from message where id = '"+highlight("$id")+"'\");\n"+
				"}")
		},
		function() {
			$("#msg").html("Successfully delete!")
			$("#demo").html("")
			$("#msg_2").hide(0)
		},
		function() {
			$("#msg").html("Simulatoin done.")
			window.scrollTo(0, 0)
		}
	],
	"attack": [
		function() {
			$("#msg").html("This is reply list, hacker can't delete reply by pressing button.")
			$("tr[id^='msg_'] a").hide()
			$("#demo").html("")
		},
		function() {
			$("#msg").html("But hacker found this may exist CSRF vulnerability.")
			$("#demo").html("&lt;a href='/message/remove/"+highlight("1", "darkOrange")+"' class='btn btn-danger'&gt;Delete&lt;/a&gt;\n"+
					"&lt;a href='/message/remove/"+highlight("2", "darkOrange")+"' class='btn btn-danger'&gt;Delete&lt;/a&gt;\n"+
					"&lt;a href='/message/remove/"+highlight("3", "darkOrange")+"' class='btn btn-danger'&gt;Delete&lt;/a&gt;\n"
				);
			$("#msg_4").hide()
		},
		function() {
			$("#msg").html("Then hacker use XSS to inject script, induce admin to read it.")
			$("#demo").html("&lt;img src='"+highlight("/message/remove/2")+"' /&gt;")
			$("#msg_4").show()
		},
		function() {
			$("#msg").html("When admin see the image, browser will send request.")
			$("#demo").html("GET http://www.xxx.com/message/remove/2 200")
		},
		function() {
			$("#msg").html("Because of admin already login, so this behaviour will pass verification.")
			$("#demo").html("if("+highlight("$this->session->userdata('admin') == true", "purple")+") {\n"+
				"  "+highlight("$id")+" = "+highlight("2", "darkOrange")+";\n"+
				"  $this->db->query(\"delete from message where id = '\"."+highlight("$id")+".\"'\");\n"+
				"}")
			$("#msg_2").css("background-color", "pink")
		},
		function() {
			$("#msg").html("Hacker uses admin to fake the request to server, delete the reply successfully.")
			$("#demo").html("")
			$("#msg_2").hide(0)
		},
		function() {
			$("#msg").html("Simulation done.")
			window.scrollTo(0, 0)
		}
	],
	"avoid": [
		function() {
			$("#msg").html("Turn on the default settings of CSRF defending in CI.")
			$("#demo").html(highlight("application/config/config.php:296-299", "gray")+
			"\n$config['csrf_protection'] = "+highlight("TRUE", "darkGreen")+";"+
			"\n$config['csrf_token_name'] = 'csrf_token';"+
			"\n$config['csrf_cookie_name'] = 'csrf_cookie';"+
			"\n$config['csrf_expire'] = 7200;")
		},
		function() {
			$("#msg").html("Use POST replace GET, and use the custom form generation function in CI.")
			$("#demo").html("$input = array(\n 'name' => 'msgid',\n 'value' => 1,\n 'style' => 'display: none;'\n);\n"+
			"$submit = array(\n 'name' => 'remove',\n 'value' => 'Delete',\n 'class' => 'btn btn-danger'\n);\n"+
			"echo form_open('/message/remove').\n"+
			"  form_input($input).\n"+
			"  form_submit($submit).\n"+
			"  form_close();");
		},
		function() {
			$("#msg").html("This statement of the generated form contains token to defend CSRF.")
			$("#demo").html(textize("<form action='/message/remove' method='post'>\n")+
			textize("  <div style='display:none'>\n")+
			highlight("    &lt;input type='hidden' name='csrf_token' value='**********' /&gt;", "darkGreen")+"\n"+
			textize("  </div>\n")+
			textize("  <input type='text' name='msgid' value='1' style='display: none;' />\n")+
			textize("  <input type='submit' name='remove' value='Delete' class='btn btn-danger' />\n")+
			textize("</form>"));
		},
		function() {
			$("#msg").html("Hacker can't use GET method and fake form to send delete request.")
			$("#demo").html("<img src='/ci/assets/images/CSRF_not_allowed.png'>")
		},
		function() {
			$("#msg").html("Simulation done.")
			window.scrollTo(0, 0)
		}
	]
}