from random import randint
from random import seed
def main():
    #Arreglo con numeros
    numeros = [100, 500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000]
    
    #recorremos
    for num in numeros:
        #creamos txt
        f= open("archivos_txt/"+str(num)+".txt","w+")
        seed(str(num))

        for i in range(int(num)):
            nro_random = randint(100, 900)

            f.write("%d\n" % (nro_random))

        #cerramos el archivo
        f.close()

if __name__ == '__main__':
   main()