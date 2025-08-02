@echo off
echo ===============================================
echo   Preparando archivos para crmiraflores.com
echo ===============================================
echo.

REM Crear carpeta de despliegue
if not exist "deploy" mkdir deploy
echo ✅ Carpeta deploy creada

REM Copiar archivos principales
copy index.html deploy\
copy admin.html deploy\
echo ✅ Archivos HTML copiados

REM Copiar carpetas CSS y JS
xcopy css deploy\css\ /E /I /Y
xcopy js deploy\js\ /E /I /Y
echo ✅ Archivos CSS y JS copiados

REM Copiar archivos de configuración
copy .htaccess deploy\
copy netlify.toml deploy\
copy web.config deploy\
echo ✅ Archivos de configuración copiados

REM Crear archivo robots.txt
echo User-agent: * > deploy\robots.txt
echo Allow: / >> deploy\robots.txt
echo Sitemap: https://crmiraflores.com/sitemap.xml >> deploy\robots.txt
echo ✅ robots.txt creado

REM Crear sitemap básico
echo ^<?xml version="1.0" encoding="UTF-8"?^> > deploy\sitemap.xml
echo ^<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"^> >> deploy\sitemap.xml
echo   ^<url^> >> deploy\sitemap.xml
echo     ^<loc^>https://crmiraflores.com/^</loc^> >> deploy\sitemap.xml
echo     ^<changefreq^>weekly^</changefreq^> >> deploy\sitemap.xml
echo     ^<priority^>1.0^</priority^> >> deploy\sitemap.xml
echo   ^</url^> >> deploy\sitemap.xml
echo   ^<url^> >> deploy\sitemap.xml
echo     ^<loc^>https://crmiraflores.com/admin.html^</loc^> >> deploy\sitemap.xml
echo     ^<changefreq^>monthly^</changefreq^> >> deploy\sitemap.xml
echo     ^<priority^>0.5^</priority^> >> deploy\sitemap.xml
echo   ^</url^> >> deploy\sitemap.xml
echo ^</urlset^> >> deploy\sitemap.xml
echo ✅ sitemap.xml creado

echo.
echo ===============================================
echo   ✅ Archivos listos para subir
echo ===============================================
echo.
echo Los archivos están en la carpeta 'deploy'
echo.
echo Próximos pasos:
echo 1. Registrar dominio crmiraflores.com
echo 2. Contratar hosting web
echo 3. Subir contenido de la carpeta 'deploy'
echo 4. Configurar DNS del dominio
echo.
echo ¡Consulta DEPLOY_GUIDE.md para más detalles!
echo.
pause
