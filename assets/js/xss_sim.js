var stage, counter

//put on color
var highlight = function(str, color) {
	if(color == null)color = "blue"
	return "<font color='"+color+"'>"+str+"</font>"
};

//init
var empty_all = function() {
	counter = -1
	$("#name").prop("value", "")
	$("#email").prop("value", "")
	$("#content").prop("value", "")
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
			$("#name").prop("value", "")
			$("#email").prop("value", "")
			$("#content").prop("value", "")
		},
		function() {
			$("#msg").html("User fill out the form.")
			$("#name").prop("value", "iamuser")
			$("#email").prop("value", "iam@user.com")
			$("#content").prop("value", "Hello World!")
			$("#demo").html("")
		},
		function() {
			$("#msg").html("Before submit it, let's take a look to this SQL for adding reply.")
			sql = "insert into messages(name, email, content) values('\"."+highlight("$name")+".\"', '\"."+highlight("$email")+".\"', '\"."+highlight("$content")+".\"')";
			$("#demo").html(highlight("$name")+" = $this->db->escape("+highlight("$this->input->post('name')", "darkOrange")+");\n"+
				highlight("$email")+" = $this->db->escape("+highlight("$this->input->post('email')", "darkOrange")+");\n"+
				highlight("$content")+" = $this->db->escape("+highlight("$this->input->post('content')", "darkOrange")+");\n"+
				"$sql = \""+sql+"\";")
		},
		function() {
			$("#msg").html("Now submit the form, and generate SQL statement with parameters.")
			name = $("#name").prop("value")
			email = $("#email").prop("value")
			content = $("#content").prop("value")
			sql = "insert into messages(name, email, content) values('"+highlight(name)+"', '"+highlight(email)+"', '"+highlight(content)+"')";
			$("#demo").html("$sql = \""+sql+"\";")
		},
		function() {
			$("#msg").html("And query database.")
			$("#demo").html("$this->db->query(\""+sql+"\");")
			$("#result").html("")
		},
		function() {
			$("#msg").html("Finished adding reply, here's results.")
			$("#result").html("<h3>Reply</h3>Name："+name+"\nE-Mail："+email+"\nConcept："+content)
		},
		function() {
			$("#msg").html("Simulation done.")
			window.scrollTo(0, 0)
		}
	],
	"attack": [
		function() {
			$("#msg").html("This is a regular form.")
			$("#name").prop("value", "")
			$("#email").prop("value", "")
			$("#content").prop("value", "")
		},
		function() {
			$("#msg").html("Hacker fill up the form with illegal characters.")
			$("#name").prop("value", "iamuser")
			$("#email").prop("value", "iam@user.com")
			$("#content").prop("value", "I say...<script>alert('Hello World!');</script>")
			$("#demo").html("")
		},
		function() {
			$("#msg").html("This statement escape queries but it doesn't check the <script> tag.")
			sql = "insert into messages(name, email, content) values('\"."+highlight("$name")+".\"', '\"."+highlight("$email")+".\"', '\"."+highlight("$content")+".\"')";
			$("#demo").html(highlight("$name")+" = $this->db->escape("+highlight("$this->input->post('name')", "darkOrange")+");\n"+
				highlight("$email")+" = $this->db->escape("+highlight("$this->input->post('email')", "darkOrange")+");\n"+
				highlight("$content")+" = $this->db->escape("+highlight("$this->input->post('content')", "darkOrange")+");\n"+
				"$sql = \""+sql+"\";")
		},
		function() {
			$("#msg").html("Now submit the form, and generate SQL statement with parameters.")
			name = $("#name").prop("value")
			email = $("#email").prop("value")
			content = "I say...&lt;script&gt;alert('Hello World!');&lt;/script&gt;"
			sql = "insert into messages(name, email, content) values('"+highlight(name)+"', '"+highlight(email)+"', '"+highlight(content)+"')";
			$("#demo").html("$sql = \""+sql+"\";")
		},
		function() {
			$("#msg").html("And query database.")
			$("#demo").html("$this->db->query(\""+sql+"\");")
			$("#result").html("")
		},
		function() {
			content = content.replace(/&lt;/g, "<").replace(/&gt;/g, ">")
			$("#msg").html("Finished adding reply, but it has been hacked at the same time.")
			$("#result").html("<h3>Reply</h3>Name："+name+"\nE-Mail："+email+"\nConcept："+content)
		},
		function() {
			$("#msg").html("Simulation done.")
			window.scrollTo(0, 0)
		}
	],
	"avoid": [
		function() {
			$("#msg").html("This is a regular form.")
			$("#name").prop("value", "")
			$("#email").prop("value", "")
			$("#content").prop("value", "")
		},
		function() {
			$("#msg").html("Hacker fill up the form with illegal characters.")
			$("#name").prop("value", "iamuser")
			$("#email").prop("value", "iam@user.com")
			$("#content").prop("value", "I say...<script>alert('Hello World!');</script>")
			$("#demo").html("")
		},
		function() {
			$("#msg").html("This statement escape quaries and remove <script> tag at the same time. (you just need to add TRUE as second parameter in post data)")
			sql = "insert into messages(name, email, content) values('\"."+highlight("$name")+".\"', '\"."+highlight("$email")+".\"', '\"."+highlight("$content")+".\"')";
			$("#demo").html(highlight("$name")+" = $this->db->escape("+highlight("$this->input->post('name', "+highlight("TRUE", "darkGreen")+")", "darkOrange")+");\n"+
				highlight("$email")+" = $this->db->escape("+highlight("$this->input->post('email', "+highlight("TRUE", "darkGreen")+")", "darkOrange")+");\n"+
				highlight("$content")+" = $this->db->escape("+highlight("$this->input->post('content', "+highlight("TRUE", "darkGreen")+")", "darkOrange")+");\n"+
				"$sql = \""+sql+"\";")
		},
		function() {
			$("#msg").html("Now submit the form, and generate SQL statement with safe parameters.")
			name = $("#name").prop("value")
			email = $("#email").prop("value")
			content = "I say...[removed]alert('Hello World!');[removed]"
			sql = "insert into messages(name, email, content) values('"+highlight(name)+"', '"+highlight(email)+"', '"+highlight(content)+"')";
			$("#demo").html("$sql = \""+sql+"\";")
		},
		function() {
			$("#msg").html("And query database.")
			$("#demo").html("$this->db->query(\""+sql+"\");")
			$("#result").html("")
		},
		function() {
			content = content.replace(/&lt;/g, "<").replace(/&gt;/g, ">")
			$("#msg").html("Finished adding reply, no popup alert.")
			$("#result").html("<h3>Reply</h3>Name："+name+"\nE-Mail："+email+"\nConcept："+content)
		},
		function() {
			$("#msg").html("Simulation done.")
			window.scrollTo(0, 0)
		}
	]
}