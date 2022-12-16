#include <algorithm>
#include <iterator>
#include <iostream>
#include <fstream>
#include <string>
#include <iomanip>
#include <cstdlib>
#include <cstdio>
#include <vector>
#include <cstring>
using namespace std;

#define PATH "archivos_txt/"
unsigned t0, t1;

using std::cout;
using std::endl;


void swap(int *xp, int *yp)
{
    int temp = *xp;
    *xp = *yp;
    *yp = temp;
}
 
void selectionSort(int arr[], int n)
{
    int i, j, min_idx;
     // Limite de movimiento
    for (i = 0; i < n-1; i++)
    {
        // encontrar el nro minimo
        min_idx = i;
        for (j = i+1; j < n; j++)
        if (arr[j] < arr[min_idx])
            min_idx = j;
         // intercambio del minimo con el primero
        swap(&arr[min_idx], &arr[i]);
    }
}
 
void printArray(int arr[], int size)
{
    int i;
    for (i=0; i < size; i++)
        cout << arr[i] << " ";
    cout << endl;
}

string toString(char* txt){
    stringstream sti;
    string SIZE;
        sti << txt;
        sti >> SIZE;
        return SIZE+".txt";
}

int main(int nargs, char *argv[])
{
     int SIZE = atoi(argv[1]);
    string txt = toString(argv[1]);
    int arr[SIZE]; 
    int element;
    std::ifstream in;
    in.open(PATH+txt);

    if (in.is_open()) {
        int i = 0;
        while (in >> element) {
            arr[i] = element;
            i++;
        }
    }

    in.close();
    t0 = clock();    
    selectionSort(arr,SIZE);
    t1 = clock();    
    double time = (double(t1 - t0) / CLOCKS_PER_SEC);
    cout << time << endl;  
    return 0;
}

