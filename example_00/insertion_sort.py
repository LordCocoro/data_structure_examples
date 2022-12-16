# -*- coding: utf-8 -*-
"""
Created on Mon Jun 14 20:28:32 2021

@author: User
"""

# coding:utf-8
from random import randint
from time import time
import sys
import numpy as np

DIR = 'archivos_txt/'

def insert_sort(alist):
    "" "Insertar orden" ""
    n = len(alist)
    t_ini=time()
    for j in range(1, n):
        i = j
        while i > 0:
            if alist[i] < alist[i-1]:
                alist[i], alist[i-1] = alist[i-1], alist[i]
                i -= 1
            else:
                break
    
    t_fin=time()
    print(str(t_fin-t_ini))

# Prueba
if __name__ == "__main__":
    txt= sys.argv[1] 

    vector = np.genfromtxt(DIR+txt, dtype='int')   
    insert_sort(vector)

