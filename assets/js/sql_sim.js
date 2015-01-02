var stage, counter

//draw color
var highlight = function(str, color) {
	if(color == null)color = "blue"
	return "<font color='"+color+"'>"+str+"</font>"
};

function escape (str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
        }
    });
}

//init
var empty_all = function() {
	counter = -1
	$("#user").prop("value", "")
	$("#pwd").prop("value", "")
	$("#msg").html("")
	$("#demo").html("")
	$("#result").html("")
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
			$("#msg").html("This is a regular form.")
			$("#user").prop("value", "")
			$("#pwd").prop("value", "")
		},
		function() {
			$("#msg").html("User fill up with account and password.")
			$("#user").prop("value", "iamuser")
			$("#pwd").focus().prop("value", "iamidiot")
			$("#demo").html("")
		},
		function() {
			$("#msg").html("Before submit it, let's take a look to this SQL for authorizing user.")
			sql = "select count(*) from users where username = '\"."+highlight("$username")+".\"' and password = '\"."+highlight("$password")+".\"' limit 1";
			$("#demo").html(highlight("$username")+" = "+highlight("$this->input->post('user')", "darkOrange")+";\n"+
				highlight("$password")+" = "+highlight("$this->input->post('pwd')", "darkOrange")+";\n"+
				"$sql = \""+sql+"\";")
		},
		function() {
			$("#msg").html("Now submit the form, and generate SQL statement with parameters.")
			var user = $("#user").prop("value")
			var pwd = $("#pwd").prop("value")
			sql = "select count(*) from users where username = '<font color='blue'>"+highlight(user)+"</font>' and password = '<font color='blue'>"+highlight(pwd)+"</font>' limit 1";
			$("#demo").html("$sql = \""+sql+"\";")
		},
		function() {
			$("#msg").html("And query database.")
			$("#demo").html("$this->db->query(\""+sql+"\");")
			$("#result").html("")
		},
		function() {
			$("#msg").html("Output result got 1, it means user exist.")
			$("#result").html("1")
		},
		function() {
			$("#msg").html("Simulation done.")
			window.scrollTo(0, 0)
		}
	],
	"attack": [
		function() {
			$("#msg").html("This is a regular form.")
			$("#user").prop("value", "")
			$("#pwd").prop("value", "")
		},
		function() {
			$("#msg").html("Hacker fill up the form with illegal characters.")
			$("#user").prop("value", "iamuser")
			$("#pwd").focus().prop("value", "' or '1'='1")
			$("#demo").html("")
		},
		function() {
			$("#msg").html("This SQL statement which not sanitize to these input value.")
			sql = "select count(*) from users where username = '\"."+highlight("$username")+".\"' and password = '\"."+highlight("$password")+".\"' limit 1";
			$("#demo").html(highlight("$username")+" = "+highlight("$this->input->post('user')", "darkOrange")+";\n"+
				highlight("$password")+" = "+highlight("$this->input->post('pwd')", "darkOrange")+";\n"+
				"$sql = \""+sql+"\";")
		},
		function() {
			$("#msg").html("Now submit the form, and generate SQL statement with parameters.")
			var user = $("#user").prop("value")
			var pwd = $("#pwd").prop("value")
			sql = "select count(*) from users where username = '<font color='blue'>"+highlight(user)+"</font>' and password = '<font color='blue'>"+highlight(pwd)+"</font>' limit 1";
			$("#demo").html("$sql = \""+sql+"\";")
		},
		function() {
			$("#msg").html("And query database.")
			$("#demo").html("$this->db->query(\""+sql+"\");")
			$("#result").html("")
		},
		function() {
			$("#msg").html("Output result got 1, it's been hacked.")
			$("#result").html("1")
		},
		function() {
			$("#msg").html("Simulation done.")
			window.scrollTo(0, 0)
		}
	],
	"avoid": [
		function() {
			$("#msg").html("This is a regular form.")
			$("#user").prop("value", "")
			$("#pwd").prop("value", "")
		},
		function() {
			$("#msg").html("Hacker fill up the form with illegal characters.")
			$("#user").prop("value", "iamuser")
			$("#pwd").focus().prop("value", "' or '1'='1")
			$("#demo").html("")
		},
		function() {
			$("#msg").html("Do not believe anything from user.")
			sql = "select count(*) from users where username = '\"."+highlight("$username")+".\"' and password = '\"."+highlight("$password")+".\"' limit 1";
			$("#demo").html(highlight("$username")+" = "+highlight("$this->db->escape("+highlight("$this->input->post('user')", "darkOrange")+")", "darkGreen")+";\n"+
				highlight("$password")+" = "+highlight("$this->db->escape("+highlight("$this->input->post('pwd')", "darkOrange")+")", "darkGreen")+";\n"+
				"$sql = \""+sql+"\";")
		},
		function() {
			$("#msg").html("Just filter it!")
			var user = $("#user").prop("value")
			var pwd = $("#pwd").prop("value")
			sql = "select count(*) from users where username = '"+highlight(escape(user))+"' and password = '"+highlight(escape(pwd))+"' limit 1";
			$("#demo").html("$sql = \""+sql+"\";")
		},
		function() {
			$("#msg").html("And query database.")
			$("#demo").html("$this->db->query(\""+sql+"\");")
			$("#result").html("")
		},
		function() {
			$("#msg").html("Output result got 0, the hacking has been blocked..")
			$("#result").html("0")
		},
		function() {
			$("#msg").html("Simulation done.")
			window.scrollTo(0, 0)
		}
	]
}