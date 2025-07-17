@echo off
echo ===============================================
echo   Comunidad de Regantes Miraflores - Servidor Web
echo ===============================================
echo.

echo Intentando iniciar servidor web...
echo.

REM Verificar si Python está disponible
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo [1] Iniciando con Python...
    python -m http.server 8000
    goto :end
)

REM Verificar si PHP está disponible
php --version >nul 2>&1
if %errorlevel% == 0 (
    echo [2] Iniciando con PHP...
    php -S localhost:8000
    goto :end
)

REM Verificar si Node.js está disponible
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo [3] Iniciando con Node.js...
    echo Instalando http-server si es necesario...
    npm install -g http-server
    http-server -p 8000
    goto :end
)

REM Si ninguno está disponible, abrir directamente
echo.
echo ⚠️  No se encontró Python, PHP o Node.js instalado.
echo.
echo Opciones disponibles:
echo.
echo 1. Instalar Python desde: https://www.python.org/downloads/
echo 2. Instalar Node.js desde: https://nodejs.org/
echo 3. Abrir el archivo index.html directamente en tu navegador
echo.
echo Presiona cualquier tecla para abrir index.html en tu navegador...
pause >nul
start index.html

:end
echo.
echo ===============================================
echo   Servidor iniciado en: http://localhost:8000
echo   Presiona Ctrl+C para detener el servidor
echo ===============================================
echo.
