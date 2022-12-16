import time
import sys

DIR = 'archivos_txt/'

def main():
    #abrimos archivo
    txt= sys.argv[1] 
    archivo = open(DIR+txt, "r")
    numeros = archivo.read().splitlines()
    archivo.close()

    timeStart=time.time() 
    selectiontSort(numeros)
    timeEnd = time.time()      
    print(str (timeEnd-timeStart))

 
def selectiontSort(numeros):
    size = len(numeros)
    for i in range(0,len(numeros)-1):
        min_index=i
        for j in range(i+1, len(numeros)):
            if numeros[j] < numeros[min_index]:
                min_index = j
        tempVal=numeros[min_index]
        numeros[min_index]=numeros[i]
        numeros[i]=tempVal
        
    return numeros

if __name__ == '__main__':
   main()
