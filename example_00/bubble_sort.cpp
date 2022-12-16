#include <iostream>
#include <string>
#include <fstream>
#include <bits/stdc++.h>

#define     PATH "archivos_txt/"

using std::cout;
using std::cin;
using std::endl;


clock_t inicio, fin;
double tiempo_ejecucion;

void swap(int *xp, int *yp)
{
    int temp = *xp;
    *xp = *yp;
    *yp = temp;
}
 
// A function to implement bubble sort
void bubbleSort(int arr[], int n)
{
    

    inicio = clock();
    int i, j;
    for (i = 0; i < n-1; i++)    
        for (j = 0; j < n-i-1; j++)
            if (arr[j] > arr[j+1])
                swap(&arr[j], &arr[j+1]);
    fin = clock();
    
    tiempo_ejecucion = double(fin - inicio) / double(CLOCKS_PER_SEC);
}
 

void printArray(int arr[], int size)
{
    int i;
    for (i = 0; i < size; i++)
        cout << arr[i] << " ";
    cout << endl;
}

std::string toString(char* txt){
    std::stringstream sti;
    std::string SIZE;
        sti << txt;
        sti >> SIZE;
        return SIZE+".txt";
}

int main(int nargs, char *argv[])
{
    const int tam = atoi(argv[1]);;
    int arreglo[tam];
    int element;
    std::ifstream in;
    std::string cantidad_txt, nombre_archivo;
    cantidad_txt = toString(argv[1]);
    nombre_archivo = PATH+cantidad_txt;
    in.open(nombre_archivo);

    if (in.is_open()) {
        int i = 0;
        while (in >> element) {
            arreglo[i] = element;
            i++;
        }
    }
    in.close();
    bubbleSort(arreglo, tam);
    cout<<tiempo_ejecucion<< endl;
    return 0;
}