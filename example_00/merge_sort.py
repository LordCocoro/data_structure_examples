# -*- coding: utf-8 -*-
"""
Created on Tue Jun 15 15:04:49 2021

@author: User
"""
import sys
from time import time
import numpy as np

DIR = 'archivos_txt/'



def merge_sort(list):


    list_length = len(list)

    if list_length == 1:
        return list

    mid_point = list_length // 2

    left_partition = merge_sort(list[:mid_point])
    right_partition = merge_sort(list[mid_point:])


    return merge(left_partition, right_partition)

def merge(left, right):
    output = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            output.append(left[i])
            i += 1
        else:
            output.append(right[j])
            j += 1
    output.extend(left[i:])
    output.extend(right[j:])
    return output
  
# Prueba
if __name__ == "__main__":
    txt= sys.argv[1] 
    vector = np.genfromtxt(DIR+txt, dtype='int')
    t_ini=time()
    sorted_list = merge_sort(vector)
    t_fin=time()
    print(str(t_fin-t_ini))


