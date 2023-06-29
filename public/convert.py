'''
author:        Asukais <92195386+MARKIR123@users.noreply.github.com>
date:          2023-06-28 19:36:09
Copyright © YourCompanyName All rights reserved
'''
import json

def txtToJson(file):
    jsonData = {}
    data = []
    with open(file) as f:
        lines = f.readlines()
        for line in lines:
            t = line.split(',')
            data.append([float(t[-1]), float(t[-2])])
    jsonData['data'] = data
    json.dump(jsonData, open(file.replace('.txt', '.json'), 'w'))

if __name__ == '__main__':
    txtToJson('环境因素秭归三峡.txt')