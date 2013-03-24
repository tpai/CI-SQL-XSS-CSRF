var stage, counter

//上色
var highlight = function(str, color) {
	if(color == null)color = "blue"
	return "<font color='"+color+"'>"+str+"</font>"
};

//初始化
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

//上一步
$("#prev").click(function() {
	if(counter > 0)counter --
	motion[stage][counter]()
})

//下一步
$("#next").click(function() {
	if(counter < motion[stage].length - 1)counter ++
	motion[stage][counter]()
})

//正常使用
$("#start").click(function() {
	empty_all()
	stage = "start"
})

//攻擊模擬
$("#attack").click(function() {
	empty_all()
	stage = "attack"
})

//預防措施
$("#avoid").click(function() {
	empty_all()
	stage = "avoid"
})

//動作
var motion = {
	"start": [
		function() {
			$("#msg").html("這是一個常見的留言表單")
			$("#name").prop("value", "")
			$("#email").prop("value", "")
			$("#content").prop("value", "")
		},
		function() {
			$("#msg").html("使用者填入姓名、E-Mail及留言")
			$("#name").prop("value", "iamuser")
			$("#email").prop("value", "iam@user.com")
			$("#content").prop("value", "Hello World!")
			$("#demo").html("")
		},
		function() {
			$("#msg").html("在送出表單之前 先來看看這段新增留言的SQL語法")
			sql = "insert into messages(name, email, content) values('\"."+highlight("$name")+".\"', '\"."+highlight("$email")+".\"', '\"."+highlight("$content")+".\"')";
			$("#demo").html(highlight("$name")+" = $this->db->escape("+highlight("$this->input->post('name')", "darkOrange")+");\n"+
				highlight("$email")+" = $this->db->escape("+highlight("$this->input->post('email')", "darkOrange")+");\n"+
				highlight("$content")+" = $this->db->escape("+highlight("$this->input->post('content')", "darkOrange")+");\n"+
				"$sql = \""+sql+"\";")
		},
		function() {
			$("#msg").html("現在將表單送出 代入參數產生SQL語法")
			name = $("#name").prop("value")
			email = $("#email").prop("value")
			content = $("#content").prop("value")
			sql = "insert into messages(name, email, content) values('"+highlight(name)+"', '"+highlight(email)+"', '"+highlight(content)+"')";
			$("#demo").html("$sql = \""+sql+"\";")
		},
		function() {
			$("#msg").html("送至資料庫儲存")
			$("#demo").html("$this->db->query(\""+sql+"\");")
			$("#result").html("")
		},
		function() {
			$("#msg").html("完成新增留言 產生結果如下")
			$("#result").html("<h3>新留言</h3>姓名："+name+"\nE-Mail："+email+"\n留言內容："+content)
		},
		function() {
			$("#msg").html("模擬結束")
			window.scrollTo(0, 0)
		}
	],
	"attack": [
		function() {
			$("#msg").html("這是一個常見的留言表單")
			$("#name").prop("value", "")
			$("#email").prop("value", "")
			$("#content").prop("value", "")
		},
		function() {
			$("#msg").html("黑客填入姓名、E-Mail及含有不法字元的留言")
			$("#name").prop("value", "iamuser")
			$("#email").prop("value", "iam@user.com")
			$("#content").prop("value", "I say...<script>alert('Hello World!');</script>")
			$("#demo").html("")
		},
		function() {
			$("#msg").html("這段語法有做到跳脫字元防止SQL Injection 卻沒有確實檢查輸入資料是否含有不法標籤")
			sql = "insert into messages(name, email, content) values('\"."+highlight("$name")+".\"', '\"."+highlight("$email")+".\"', '\"."+highlight("$content")+".\"')";
			$("#demo").html(highlight("$name")+" = $this->db->escape("+highlight("$this->input->post('name')", "darkOrange")+");\n"+
				highlight("$email")+" = $this->db->escape("+highlight("$this->input->post('email')", "darkOrange")+");\n"+
				highlight("$content")+" = $this->db->escape("+highlight("$this->input->post('content')", "darkOrange")+");\n"+
				"$sql = \""+sql+"\";")
		},
		function() {
			$("#msg").html("現在將表單送出 代入參數產生SQL語法")
			name = $("#name").prop("value")
			email = $("#email").prop("value")
			content = "I say...&lt;script&gt;alert('Hello World!');&lt;/script&gt;"
			sql = "insert into messages(name, email, content) values('"+highlight(name)+"', '"+highlight(email)+"', '"+highlight(content)+"')";
			$("#demo").html("$sql = \""+sql+"\";")
		},
		function() {
			$("#msg").html("送至資料庫儲存")
			$("#demo").html("$this->db->query(\""+sql+"\");")
			$("#result").html("")
		},
		function() {
			content = content.replace(/&lt;/g, "<").replace(/&gt;/g, ">")
			$("#msg").html("完成新增留言 若此時跳出「Hello World!」訊息視窗代表已經被XSS了")
			$("#result").html("<h3>新留言</h3>姓名："+name+"\nE-Mail："+email+"\n留言內容："+content)
		},
		function() {
			$("#msg").html("模擬結束")
			window.scrollTo(0, 0)
		}
	],
	"avoid": [
		function() {
			$("#msg").html("這是一個常見的留言表單")
			$("#name").prop("value", "")
			$("#email").prop("value", "")
			$("#content").prop("value", "")
		},
		function() {
			$("#msg").html("黑客填入姓名、E-Mail及含有不法字元的留言")
			$("#name").prop("value", "iamuser")
			$("#email").prop("value", "iam@user.com")
			$("#content").prop("value", "I say...<script>alert('Hello World!');</script>")
			$("#demo").html("")
		},
		function() {
			$("#msg").html("這段語法同時做到跳脫字元防止SQL Injection與去除不法標籤防止XSS\n(把post的第二個參數設定為TRUE就會過濾XSS)")
			sql = "insert into messages(name, email, content) values('\"."+highlight("$name")+".\"', '\"."+highlight("$email")+".\"', '\"."+highlight("$content")+".\"')";
			$("#demo").html(highlight("$name")+" = $this->db->escape("+highlight("$this->input->post('name', "+highlight("TRUE", "darkGreen")+")", "darkOrange")+");\n"+
				highlight("$email")+" = $this->db->escape("+highlight("$this->input->post('email', "+highlight("TRUE", "darkGreen")+")", "darkOrange")+");\n"+
				highlight("$content")+" = $this->db->escape("+highlight("$this->input->post('content', "+highlight("TRUE", "darkGreen")+")", "darkOrange")+");\n"+
				"$sql = \""+sql+"\";")
		},
		function() {
			$("#msg").html("現在將表單送出 代入過濾XSS後的參數產生SQL語法")
			name = $("#name").prop("value")
			email = $("#email").prop("value")
			content = "I say...[removed]alert('Hello World!');[removed]"
			sql = "insert into messages(name, email, content) values('"+highlight(name)+"', '"+highlight(email)+"', '"+highlight(content)+"')";
			$("#demo").html("$sql = \""+sql+"\";")
		},
		function() {
			$("#msg").html("送至資料庫儲存")
			$("#demo").html("$this->db->query(\""+sql+"\");")
			$("#result").html("")
		},
		function() {
			content = content.replace(/&lt;/g, "<").replace(/&gt;/g, ">")
			$("#msg").html("完成新增留言 沒有彈出訊息視窗 防禦成功")
			$("#result").html("<h3>新留言</h3>姓名："+name+"\nE-Mail："+email+"\n留言內容："+content)
		},
		function() {
			$("#msg").html("模擬結束")
			window.scrollTo(0, 0)
		}
	]
}