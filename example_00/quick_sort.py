import time
import sys

DIR = 'archivos_txt/'

def main():
    
    txt= sys.argv[1] 
    archivo = open(DIR+txt, "r")
    numeros = archivo.read().splitlines()
    archivo.close()
     #cerramos archivo
    inicio = time.time()
    sort(numeros)
    fin = time.time()
    print(str(fin-inicio))
    #print(numeros)


def sort(numeros):
    izquierda = []
    centro = []
    derecha = []
    if len(numeros) > 1:
        pivote = numeros[0]
        for i in numeros:
            if i < pivote:
                izquierda.append(i)
            elif i == pivote:
                centro.append(i)
            elif i > pivote:
                derecha.append(i)         
       #orden ascendente 
        return sort(izquierda)+centro+sort(derecha)      
    else:
      return numeros

if __name__ == '__main__':
   main()
