@echo off
title Vida de Formiga 3D
cd /d "%~dp0"
start "Servidor Vida de Formiga 3D" cmd /k node servidor_3d.js
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:5199/"
