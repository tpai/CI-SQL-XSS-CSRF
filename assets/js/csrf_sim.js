var stage, counter

//上色
var highlight = function(str, color) {
	if(color == null)color = "blue"
	return "<font color='"+color+"'>"+str+"</font>"
};

//純文字化
var textize = function(str) {
	return str.replace(/</g, "&lt;").replace(/>/g, "&gt;")
};

//初始化
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
			$("#msg").html("這是一個留言列表 管理者可透過點擊刪除鈕刪除留言")
			$("#demo").html("")
		},
		function() {
			$("#msg").html("刪除鈕的HTML語法如下 1, 2, 3分別代表各筆留言的id")
			$("#demo").html("&lt;a href='/message/remove/"+highlight("1", "darkOrange")+"' class='btn btn-danger'&gt;刪除&lt;/a&gt;\n"+
					"&lt;a href='/message/remove/"+highlight("2", "darkOrange")+"' class='btn btn-danger'&gt;刪除&lt;/a&gt;\n"+
					"&lt;a href='/message/remove/"+highlight("3", "darkOrange")+"' class='btn btn-danger'&gt;刪除&lt;/a&gt;\n"
				);
		},
		function() {
			$("#msg").html("刪除留言的PHP程式如下")
			$("#demo").html("if($this->session->userdata('admin') == true) {\n"+
				"  "+highlight("$id")+" = "+highlight("$this->uri->segment(3)", "darkOrange")+";\n"+
				"  $this->db->query(\"delete from message where id = '\"."+highlight("$id")+".\"'\");\n"+
				"}")
		},
		function() {
			$("#msg").html("管理者按下了第二個刪除鈕 代入參數產生SQL語法並且執行")
			$("#msg_2").css("background-color", "pink")
			$("#demo").html("if($this->session->userdata('admin') == true) {\n"+
				"  "+highlight("$id")+" = "+highlight("2", "darkOrange")+";\n"+
				"  $this->db->query(\"delete from message where id = '"+highlight("$id")+"'\");\n"+
				"}")
		},
		function() {
			$("#msg").html("成功刪除 結果如上方列表所示")
			$("#demo").html("")
			$("#msg_2").hide(0)
		},
		function() {
			$("#msg").html("模擬結束")
			window.scrollTo(0, 0)
		}
	],
	"attack": [
		function() {
			$("#msg").html("這是一個留言列表 黑客無法透過正常程序刪除留言")
			$("tr[id^='msg_'] a").hide()
			$("#demo").html("")
		},
		function() {
			$("#msg").html("但是黑客透過觀察HTML語法 發現存在著CSRF漏洞的可能")
			$("#demo").html("&lt;a href='/message/remove/"+highlight("1", "darkOrange")+"' class='btn btn-danger'&gt;刪除&lt;/a&gt;\n"+
					"&lt;a href='/message/remove/"+highlight("2", "darkOrange")+"' class='btn btn-danger'&gt;刪除&lt;/a&gt;\n"+
					"&lt;a href='/message/remove/"+highlight("3", "darkOrange")+"' class='btn btn-danger'&gt;刪除&lt;/a&gt;\n"
				);
			$("#msg_4").hide()
		},
		function() {
			$("#msg").html("於是黑客利用類似XSS的攻擊方式 在網頁中插入惡意語法 誘使管理員瀏覽")
			$("#demo").html("&lt;img src='"+highlight("/message/remove/2")+"' /&gt;")
			$("#msg_4").show()
		},
		function() {
			$("#msg").html("管理員一旦瀏覽到該圖片 瀏覽器會立即request這段網址")
			$("#demo").html("GET http://www.xxx.com/message/remove/2 200")
		},
		function() {
			$("#msg").html("由於利用了管理員身分 所以會通過身分驗證")
			$("#demo").html("if("+highlight("$this->session->userdata('admin') == true", "purple")+") {\n"+
				"  "+highlight("$id")+" = "+highlight("2", "darkOrange")+";\n"+
				"  $this->db->query(\"delete from message where id = '\"."+highlight("$id")+".\"'\");\n"+
				"}")
			$("#msg_2").css("background-color", "pink")
		},
		function() {
			$("#msg").html("黑客利用了管理員向伺服器提出偽造請求 成功刪除了留言")
			$("#demo").html("")
			$("#msg_2").hide(0)
		},
		function() {
			$("#msg").html("模擬結束")
			window.scrollTo(0, 0)
		}
	],
	"avoid": [
		function() {
			$("#msg").html("開啟CI內建的CSRF防禦機制來抵禦")
			$("#demo").html(highlight("application/config/config.php:296-299", "gray")+
			"\n$config['csrf_protection'] = "+highlight("TRUE", "darkGreen")+";"+
			"\n$config['csrf_token_name'] = 'csrf_token';"+
			"\n$config['csrf_cookie_name'] = 'csrf_cookie';"+
			"\n$config['csrf_expire'] = 7200;")
		},
		function() {
			$("#msg").html("不要使用GET做重要的處理 利用form_open產生表單並使用POST的方式")
			$("#demo").html("$input = array(\n 'name' => 'msgid',\n 'value' => 1,\n 'style' => 'display: none;'\n);\n"+
			"$submit = array(\n 'name' => 'remove',\n 'value' => '刪除',\n 'class' => 'btn btn-danger'\n);\n"+
			"echo form_open('/message/remove').\n"+
			"  form_input($input).\n"+
			"  form_submit($submit).\n"+
			"  form_close();");
		},
		function() {
			$("#msg").html("產生出來的表單HTML語法 含有防禦CSRF的token值")
			$("#demo").html(textize("<form action='/message/remove' method='post'>\n")+
			textize("  <div style='display:none'>\n")+
			highlight("    &lt;input type='hidden' name='csrf_token' value='**********' /&gt;", "darkGreen")+"\n"+
			textize("  </div>\n")+
			textize("  <input type='text' name='msgid' value='1' style='display: none;' />\n")+
			textize("  <input type='submit' name='remove' value='刪除' class='btn btn-danger' />\n")+
			textize("</form>"));
		},
		function() {
			$("#msg").html("黑客既無法透過GET亦無法利用偽造表單發送刪除請求 防禦成功")
			$("#demo").html("<img src='/ci/assets/images/CSRF_not_allowed.png'>")
		},
		function() {
			$("#msg").html("模擬結束")
			window.scrollTo(0, 0)
		}
	]
}