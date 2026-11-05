@echo off
setlocal EnableExtensions
REM HAJAR review helper: dry-run unless user explicitly passes --push.
REM Does not update main or deploy the site.
set "SOURCE=%~dp0.."
set "REPOSITORY=%USERPROFILE%\HAJAR_Portfolio_GitHub"
if not exist "%REPOSITORY%\.git" (
  if exist "%REPOSITORY%" (
    echo ERROR: The checkout folder exists but is not a Git repository: "%REPOSITORY%"
    exit /b 1
  )
  git clone --branch main --single-branch https://github.com/rahman-997/portfolio.git "%REPOSITORY%"
  if errorlevel 1 exit /b 1
)
if /I "%~1"=="--push" (
  echo Preparing and uploading only the isolated HAJAR review branch.
  node "%SOURCE%\scripts\prepare-review-branch.mjs" --repository "%REPOSITORY%" --source "%SOURCE%" --branch review/hajar-v15-5-qa-20261102 --check-remote --apply --push
) else (
  echo DRY RUN ONLY: No branch or files will be changed.
  node "%SOURCE%\scripts\prepare-review-branch.mjs" --repository "%REPOSITORY%" --source "%SOURCE%" --branch review/hajar-v15-5-qa-20261102 --check-remote
  echo To explicitly upload the review branch, run this script with --push.
)
if errorlevel 1 exit /b 1
endlocal
