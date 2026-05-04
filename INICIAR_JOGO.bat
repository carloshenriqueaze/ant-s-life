@echo off
title Vida de Formiga
cd /d "%~dp0"
echo.
echo ==========================================
echo        VIDA DE FORMIGA - INICIANDO
echo ==========================================
echo.
echo Abrindo o jogo em http://127.0.0.1:5188/
echo.

if not exist node_modules (
  echo Instalando dependencias pela primeira vez...
  call npm install
  if errorlevel 1 (
    echo.
    echo Erro ao instalar dependencias.
    pause
    exit /b 1
  )
)

start "" "http://127.0.0.1:5188/"
call npm run dev
pause
