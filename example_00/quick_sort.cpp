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

using namespace std;

using std::cout;
using std::endl;



void swap(int* a, int* b)
{
    int t = *a;
    *a = *b;
    *b = t;
}
 
int partition (int arr[], int low, int high)
{
    int pivot = arr[high]; // pivot
    int i = (low - 1); // 
 
    for (int j = low; j <= high - 1; j++)
    {
        //
        if (arr[j] < pivot)
        {
            i++; // 
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return (i + 1);
}
 
void quickSort(int arr[], int low, int high)
{
    if (low < high)
    {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}
 
void printArray(int arr[], int size)
{
    int i;
    for (i = 0; i < size; i++)
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
    quickSort(arr, 0,SIZE-1);
    t1 = clock();
    double time = (double(t1 - t0) / CLOCKS_PER_SEC);
    cout << time << endl;
    return 0;
}

