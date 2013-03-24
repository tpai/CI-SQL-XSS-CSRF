var stage, counter

//上色
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

//初始化
var empty_all = function() {
	counter = -1
	$("#user").prop("value", "")
	$("#pwd").prop("value", "")
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
			$("#msg").html("這是一個常見的登入表單")
			$("#user").prop("value", "")
			$("#pwd").prop("value", "")
		},
		function() {
			$("#msg").html("使用者填入帳號密碼")
			$("#user").prop("value", "iamuser")
			$("#pwd").focus().prop("value", "iamidiot")
			$("#demo").html("")
		},
		function() {
			$("#msg").html("在送出表單之前 先來看看驗證使用者的SQL語法")
			sql = "select count(*) from users where username = '\"."+highlight("$username")+".\"' and password = '\"."+highlight("$password")+".\"' limit 1";
			$("#demo").html(highlight("$username")+" = "+highlight("$this->input->post('user')", "darkOrange")+";\n"+
				highlight("$password")+" = "+highlight("$this->input->post('pwd')", "darkOrange")+";\n"+
				"$sql = \""+sql+"\";")
		},
		function() {
			$("#msg").html("現在將表單送出 代入參數產生SQL語法")
			var user = $("#user").prop("value")
			var pwd = $("#pwd").prop("value")
			sql = "select count(*) from users where username = '<font color='blue'>"+highlight(user)+"</font>' and password = '<font color='blue'>"+highlight(pwd)+"</font>' limit 1";
			$("#demo").html("$sql = \""+sql+"\";")
		},
		function() {
			$("#msg").html("送入資料庫查詢")
			$("#demo").html("$this->db->query(\""+sql+"\");")
			$("#result").html("")
		},
		function() {
			$("#msg").html("輸出結果為1 代表使用者存在 0則不存在")
			$("#result").html("1")
		},
		function() {
			$("#msg").html("模擬結束")
			window.scrollTo(0, 0)
		}
	],
	"attack": [
		function() {
			$("#msg").html("這是一個常見的登入表單")
			$("#user").prop("value", "")
			$("#pwd").prop("value", "")
		},
		function() {
			$("#msg").html("黑客填入帳號及摻有不法字元的密碼")
			$("#user").prop("value", "iamuser")
			$("#pwd").focus().prop("value", "' or '1'='1")
			$("#demo").html("")
		},
		function() {
			$("#msg").html("未對輸入資料做消毒的SQL語法")
			sql = "select count(*) from users where username = '\"."+highlight("$username")+".\"' and password = '\"."+highlight("$password")+".\"' limit 1";
			$("#demo").html(highlight("$username")+" = "+highlight("$this->input->post('user')", "darkOrange")+";\n"+
				highlight("$password")+" = "+highlight("$this->input->post('pwd')", "darkOrange")+";\n"+
				"$sql = \""+sql+"\";")
		},
		function() {
			$("#msg").html("代入參數後的SQL語法")
			var user = $("#user").prop("value")
			var pwd = $("#pwd").prop("value")
			sql = "select count(*) from users where username = '<font color='blue'>"+highlight(user)+"</font>' and password = '<font color='blue'>"+highlight(pwd)+"</font>' limit 1";
			$("#demo").html("$sql = \""+sql+"\";")
		},
		function() {
			$("#msg").html("送入資料庫查詢")
			$("#demo").html("$this->db->query(\""+sql+"\");")
			$("#result").html("")
		},
		function() {
			$("#msg").html("輸出結果為1 攻擊成功")
			$("#result").html("1")
		},
		function() {
			$("#msg").html("模擬結束")
			window.scrollTo(0, 0)
		}
	],
	"avoid": [
		function() {
			$("#msg").html("這是一個常見的登入表單")
			$("#user").prop("value", "")
			$("#pwd").prop("value", "")
		},
		function() {
			$("#msg").html("黑客填入帳號及摻有不法字元的密碼")
			$("#user").prop("value", "iamuser")
			$("#pwd").focus().prop("value", "' or '1'='1")
			$("#demo").html("")
		},
		function() {
			$("#msg").html("千萬不要相信user丟進來的任何資料")
			sql = "select count(*) from users where username = '\"."+highlight("$username")+".\"' and password = '\"."+highlight("$password")+".\"' limit 1";
			$("#demo").html(highlight("$username")+" = "+highlight("$this->db->escape("+highlight("$this->input->post('user')", "darkOrange")+")", "darkGreen")+";\n"+
				highlight("$password")+" = "+highlight("$this->db->escape("+highlight("$this->input->post('pwd')", "darkOrange")+")", "darkGreen")+";\n"+
				"$sql = \""+sql+"\";")
		},
		function() {
			$("#msg").html("過濾掉就對了")
			var user = $("#user").prop("value")
			var pwd = $("#pwd").prop("value")
			sql = "select count(*) from users where username = '"+highlight(escape(user))+"' and password = '"+highlight(escape(pwd))+"' limit 1";
			$("#demo").html("$sql = \""+sql+"\";")
		},
		function() {
			$("#msg").html("安全地送入資料庫查詢")
			$("#demo").html("$this->db->query(\""+sql+"\");")
			$("#result").html("")
		},
		function() {
			$("#msg").html("輸出結果為0 防禦成功")
			$("#result").html("0")
		},
		function() {
			$("#msg").html("模擬結束")
			window.scrollTo(0, 0)
		}
	]
}