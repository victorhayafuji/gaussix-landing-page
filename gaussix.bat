@echo off
setlocal
cd /d "%~dp0"

echo ============================================
echo   GAUSSIX - Servidor local (Vite dev)
echo ============================================
echo.

REM Verifica se o Node.js esta instalado
where node >nul 2>nul
if errorlevel 1 (
  echo [ERRO] Node.js nao encontrado no PATH.
  echo Instale em https://nodejs.org e tente novamente.
  echo.
  pause
  exit /b 1
)

REM Instala dependencias na primeira execucao
if not exist "node_modules" (
  echo Instalando dependencias ^(primeira execucao, pode demorar^)...
  call npm install
  if errorlevel 1 (
    echo.
    echo [ERRO] Falha ao instalar dependencias ^(npm install^).
    pause
    exit /b 1
  )
  echo.
)

echo Iniciando o servidor de desenvolvimento...
echo O site abrira automaticamente em http://localhost:3000
echo Pressione Ctrl+C nesta janela para parar o servidor.
echo.

REM Sobe o Vite e abre o navegador
call npm run dev -- --open

pause
