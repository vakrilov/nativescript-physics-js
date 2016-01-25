ECHO --------- Compiling
call tsc -p .

ECHO --------- Packing
call npm pack

ECHO --------- Installing 
call cd demo
call npm install "../nativescript-physics-js-1.0.5.tgz"
call cd ..
