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
#define     N 500

unsigned t0, t1;
using namespace std;


int* counting_sort(int,int*);
int maxOf(int,int*);
int* createNumArr(int,int,int*);
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
            b = counting_sort(SIZE,a);
            t1=clock();
            double time = (double(t1-t0)/CLOCKS_PER_SEC);
            cout << time << endl;
            delete(b);

            in.close(); 
    return 0;
}

int* counting_sort(int s,int* a){

   int* c = new int[maxOf(s,a)];

   c = createNumArr(maxOf(s,a),s,a);

   int* b = new int [s];
      for(int j = s-1; j>=0;j--){
          b[c[a[j]]] = a[j];
          c[a[j]]--;
     }
    delete(a);
    delete(c);
    return b;
}

int maxOf (int s, int* a){
    int max = *(a);

    for(int i = 0;i< s;i++)
        (max>*(a+i))?max=max:max=*(a+i);
        
    return max+1;
}
int* createNumArr (int maxof, int s, int* a){
    int* c =new int[maxof];

    for(int i = 0; i < maxof; i++)
        c[i]=0;

     for(int i = 0; i < s; i++)
         c[*(a+i)]++;


     for(int i = 0; i < maxof; i++)
         *(c+i+1) += *(c+i);

return c;
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
