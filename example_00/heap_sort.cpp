#include    <iostream>
#include    <ctime>
#include    <fstream>
#include    <string>
#include    <regex>
#include    <sstream>
#include    <vector>
#include    <dirent.h>

#define     length(x) (sizeof(x)/sizeof(x[0]))
#define     PATH "archivos_txt/"

unsigned t0, t1;
using namespace std;


int* heap_sort(int,int*);
void heapify(int,int,int*);
vector<string> openDir();
string toString(char*);

int main (int nargs, char *argv[]){
            int SIZE = atoi(argv[1]);
            string txt = toString(argv[1]);
            int* a = new int [SIZE];
            int* b = new int [SIZE];
            int i = 0;
            ifstream in(PATH+txt, ifstream::in);
            if(in.is_open()){
                while((!in.eof())&&in){
                    int n = 0;
                    in >> n;
                    *(a+i) = n;
                    i++;
                }                   
            }
            t0=clock();            
            b = heap_sort(SIZE,a);
            t1=clock();
            double time = (double(t1-t0)/CLOCKS_PER_SEC);
            cout << time << endl;

            
            delete(b);

            in.close(); 
    
    return 0;
}

int* heap_sort(int s,int* a){
    for(int i = s / 2 - 1; i >= 0; i--)
        heapify(i,s,a);
    
    for(int i = s - 1 ; i>=0;i--){
        swap(*(a),*(a+i));
        heapify(0,i,a);
    }
    return a;
}
void heapify(int root,int s,int*a){
    int largest = root;
    int l = 2*root +1;
    int r = 2*root +2;

    if(l<s && *(a+l)>*(a+largest))largest=l;
    if(r<s && *(a+r)>*(a+largest))largest=r;

    if(largest!=root){
        swap(*(a+root),*(a+largest));
        heapify(largest,s,a);
    }
}
vector<string> openDir(){
     DIR *dir; struct dirent *diread;
    vector<string> files;

    if ((dir = opendir(PATH)) != nullptr) {
        while ((diread = readdir(dir)) != nullptr) {
                files.push_back(diread->d_name);                
        }
        files.pop_back();
        files.pop_back();
        closedir (dir);
    } else {
        perror ("opendir");
    }
    return files;
}

string toString(char* txt){
    stringstream sti;
    string SIZE;
        sti << txt;
        sti >> SIZE;
        return SIZE+".txt";
}
