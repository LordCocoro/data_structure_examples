i=1
sp="/-\|"
PATHPTR=$(pwd)
echo "Limpiando compilaciones anteriores..."
echo -e "\n"
for archivo in $(ls | grep cpp)
do
    echo "Borrando ejecutable ${archivo//.cpp/}" $(rm ${archivo//.cpp/}) 
    printf "\r${sp:i++%${#sp}:1}"
    printf "\r"
done
echo -e "\n"
echo "Compilando proyetos c++ ....."
echo -e "\n"
for archivo in $(ls | grep cpp)
do
    echo "Compilando $archivo" $(g++ $archivo -o ${archivo//.cpp/}) 
    printf "\r${sp:i++%${#sp}:1}"
    printf "\r"
done
echo -e "\n"
echo "Limpiando archivos .csv"
echo -e "\n"
for archivo in $(ls archivos_csv/)
do
echo "Limpiando $archivo.csv"
$(cat /dev/null > archivos_csv/$archivo)
done
echo -e "\n"


for archivo in $(ls | grep cpp)
do
    echo "Ejecutando el algoritmo ${archivo//.cpp/}: en C++ y Python:"
    for txt in $(ls archivos_txt/)
    do
        arr_cpp=$($PATHPTR/${archivo//.cpp/} $txt);
        arr_py=$(python3 $PATHPTR/${archivo//.cpp/}.py $txt);
        echo ${txt//.txt/}";"$arr_cpp";"$arr_py>> archivos_csv/${archivo//.cpp/}.csv 
    done
    echo "_____________________________________________________"
    echo -e "\n"
done
echo -e "\n"
echo "Generar graficos..."
echo -e "\n"
for csv in $(ls archivos_csv/)
    do
        echo "$csv..."
        echo $(python3 generar_graficav2.py $csv)
        echo "Generada"
        echo -e "\n"
    done