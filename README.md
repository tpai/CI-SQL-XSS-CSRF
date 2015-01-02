Hack Simulator based on Codeigniter
============

This is for introducing SQL injection, XSS and CSRF.

Setup
--

1. git clone https://github.com/tpai/CI-SQL-XSS-CSRF.git
2. unzip to the htdoc folder of your web server.
3. modify .htaccess (becuz I use 'CI-SQL-XSS-CSRF' as default)

```
RewriteEngine on
RewriteBase /[name-of-this-folder]/
RewriteCond $1 !^(index\.php|assets|images|robots\.txt|$)
RewriteRule ^(.*)$ index.php/$1 [L,QSA]
```

Screenshot
---

![](http://i.imgur.com/YcupUxf.png)