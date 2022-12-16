import time
import sys

DIR = 'archivos_txt/'
def main():
    txt = sys.argv[1] 
    archivo = open(DIR+txt, "r")
    a = archivo.read().splitlines()
    for i in range(0, len(a)):
        a[i]=int(a[i])
    archivo.close()
    inicio = time.time()
    heapSort(a)
    fin = time.time()
    print(str(fin-inicio))
 
def heapify(root,s,a):
    largest = root
    l = 2*root+1
    r = 2*root+2

    if(l<s and a[l]>a[largest]):
        largest=l
    if(r<s and a[r]>a[largest]):
        largest=r
    
    if(largest!=root):
        a[root],a[largest] = a[largest],a[root]
        heapify(largest,s,a)


def heapSort(a):  
    s = len(a)

    for i in range(s // 2 - 1, -1, -1):
        heapify(i,s,a)


    for i in range(s-1, 0, -1):
        a[i],a[0]=a[0],a[i]
        heapify(0,i,a)

    return a

if __name__ == '__main__':
   main()
