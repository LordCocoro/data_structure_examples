import time
import sys

DIR = 'archivos_txt/'

def main():
    txt= sys.argv[1] 
    #abrimos archivo
    archivo = open(DIR+txt, "r")
    #parseamos por linea para convertir en un array
    numeros = archivo.read().splitlines()
    #cerramos archivo
    archivo.close()
    #print(numeros)

    inicio = time.time()
    bubbleSort(numeros)
    fin = time.time()
    print(str(fin-inicio))
    #print(numeros)

def bubbleSort(numeros):
    n = len(numeros)

    for i in range(n):

        for j in range(0, n-i-1):
            if numeros[j] > numeros[j+1] :
                numeros[j], numeros[j+1] = numeros[j+1], numeros[j]

if __name__ == '__main__':
   main()