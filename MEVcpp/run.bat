@echo off
g++ -o %1 %1.cpp
pushd %~dp0
%1.exe
popd