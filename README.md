## APACHE SETTINGS
```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [QSA,L]
</IfModule>

```

## DEMO URL
scp -r -P 24 .\build\* waviv@117.54.250.182:/var/www/html/research

http://117.54.250.182:85
