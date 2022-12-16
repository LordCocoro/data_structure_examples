import matplotlib.pyplot as plt
import csv
import sys

DIR = 'archivos_csv/'

def main():
    #ref: https://pythonprogramming.net/loading-file-data-matplotlib-tutorial/

    #C++
    x1 = []
    y1 = []

    #Python
    x2 = []
    y2 = []

    data = []
    txt= sys.argv[1]

    with open(DIR+txt,'r') as csvfile:
        plots = csv.reader(csvfile, delimiter=';')
        i = 0
        for row in plots:
            data.append({'texto':float(row[0]),'cpplog':float(row[1]),'pythonlog':float(row[2])})


    data.sort(key=get_text)


    for datos in data:
        x1.append(datos['texto'])
        x2.append(datos['texto'])
        y1.append(datos['cpplog'])
        y2.append(datos['pythonlog'])

    plt.plot(x1,y1, label='C++')
    plt.plot(x2,y2, label='Python')

    plt.xlabel('Cant. Registros')
    plt.ylabel('Tiempos')
    txt_alone = txt.replace('.csv','')
    plt.title('Tiempo de ejecución'+txt_alone)
    plt.legend()
    plt.savefig("graficos_generados/"+txt_alone+"_generate2.png")
    #plt.savefig funciona para wls
    #plt.show() #comentado por si no funca en wls,

def get_text(data):
    return data.get('texto')

if __name__ == '__main__':
   main()
