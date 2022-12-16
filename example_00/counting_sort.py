import time
import sys

DIR = 'archivos_txt/'
def main():
    txt= sys.argv[1]
    archivo = open(DIR+txt, "r")
    a = archivo.read().splitlines()
    for i in range(0, len(a)):
        a[i]=int(a[i])
    archivo.close()
    inicio = time.time()
    countingSort(a)
    fin = time.time()
    print(str(fin-inicio))
 

def countingSort(a):
    size = len(a)
    b = [0] * size

    count = createNumArr(maxof(size,a),size,a)

    i = size - 1
    while i >= 0:
        b[count[a[i]] - 1] = a[i]
        count[a[i]] -= 1
        i -= 1

    return b

def maxof(size,a):
    max = a[0]
    for i in range(0, size):
        if max>a[i]:
            max=max
        else:
            max=a[i]

    return max+1

def createNumArr(maxof,s,a):

    count = [0]*maxof

    for i in range(0, s):
        count[a[i]] += 1

    for i in range(1, maxof):
        count[i] += count[i - 1]
    
    return count

if __name__ == '__main__':
   main()
