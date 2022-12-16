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

#include <stdio.h>
#include <stdlib.h>

#define PATH "archivos_txt/"


unsigned t0, t1;

void imp(int x[], int ini, int n);
void mSort(int* A, int n);
void merge(int* izq, int nIzq, int* der, int nDer, int* A);



void imp(int x[], int ini, int n)
{
    for (int i = ini; i < n; i++)
        cout << x[i] << " ";
    cout << endl;
}

void mSort(int* A, int n)
{
    if (n == 1) { return; }
    int mitad = n / 2;
    int* izq = new int[mitad];
    int* der = new int[n - mitad];
    for (int i = 0; i < mitad; i++)
        izq[i] = A[i];
    for (int i = mitad; i < n; i++)
        der[i - mitad] = A[i];
    mSort(izq, mitad);
    mSort(der, n - mitad);
    merge(izq, mitad, der, n - mitad, A);
}

void merge(int* izq, int nIzq, int* der, int nDer, int* A)
{
    int i = 0, j = 0, k = 0;
    while ((i < nIzq) && (j < nDer))
    {
        if (izq[i] <= der[j])
        {
            A[k] = izq[i];
            i++;
        }
        else
        {
            A[k] = der[j];
            j++;
        }
        k++;
    }
    while (i < nIzq)
    {
        A[k] = izq[i];
        i++; k++;
    }
    while (j < nDer)
    {
        A[k] = der[j];
        j++; k++;
    }
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
    int* lista = new int[SIZE];
    int i = 0;
    ifstream in(PATH+txt, ifstream::in);
    if (in.is_open()) {
        while ((!in.eof()) && in) {
            int n = 0;
            in >> n;
            lista[i] = n;
            i++;
        }
    }


    t0 = clock();
    mSort(lista, SIZE);
    t1 = clock();
    double time = (double(t1 - t0) / CLOCKS_PER_SEC);
    cout << time << endl;
    return 0;
}