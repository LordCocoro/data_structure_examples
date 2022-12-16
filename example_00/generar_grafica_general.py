import matplotlib.pyplot as plt
import csv
def main():
    #ref: https://pythonprogramming.net/loading-file-data-matplotlib-tutorial/

    
    cantidad = [100,500,1000,2000,3000,4000,5000,6000,7000,8000,9000,10000,20000,30000,40000,50000,60000,70000,80000,90000,100000]
    bubble_sort = []
    quick_sort = []
    counting_sort = []
    heap_sort = []
    selection_sort = []
    insertion_sort = []
    merge_sort = []

    with open('archivos_csv/todos_python.csv','r') as csvfile:
        plots = csv.reader(csvfile, delimiter=';')
        i=0
        for row in plots:
            if i > 0:
                bubble_sort.append(float(row[1]))
                quick_sort.append(float(row[2]))
                counting_sort.append(float(row[3]))
                heap_sort.append(float(row[4]))
                selection_sort.append(float(row[5]))
                insertion_sort.append(float(row[6]))
                merge_sort.append(float(row[7]))
            i += 1

    #plt.scatter(cantidad,bubble_sort,s=10,color='red')
    plt.plot(cantidad,bubble_sort, label='Bubble Sort')
    plt.plot(cantidad,quick_sort, label='Quick Sort')
    plt.plot(cantidad,counting_sort, label='Counting Sort')
    plt.plot(cantidad,heap_sort, label='Heap Sort')
    plt.plot(cantidad,selection_sort, label='Selection Sort')
    plt.plot(cantidad,insertion_sort, label='Insertion Sort')
    plt.plot(cantidad,merge_sort, label='Merge Sort')

    plt.xlabel('Cant. Registros')
    plt.ylabel('Tiempo (segundos)')

    plt.title('Tiempo de ejecución en Python')
    
    plt.legend()
    plt.savefig("graficos_generados/comparativa_python.png")
    plt.show()
    #plt.savefig funciona para wls
    #plt.show() #comentado por si no funca en wls,

def get_text(data):
    return data.get('texto')

if __name__ == '__main__':
   main()
