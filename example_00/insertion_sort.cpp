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

// Insertion sort in C++

#include <iostream>
using namespace std;

void InsertionSort(int* a, int n) {
    int i, j, x;
    for (i = 1; i < n; i++) {
        x = a[i];
        j = i - 1;
        while (j >= 0 && a[j] > x) {
            a[j + 1] = a[j];
            j = j - 1;
        }
        a[j + 1] = x;
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
    InsertionSort(lista, SIZE);
    t1 = clock();
    double time = (double(t1 - t0) / CLOCKS_PER_SEC);
    cout << time << endl;
    return 0;
}