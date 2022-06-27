#!/usr/bin/python3
import re
import shutil
import os

client_path = 'web-client/build/static'
server_path = 'webcms-server/app/calculator/static/calculator'
url_file_path = 'webcms-server/app/calculator/templates/calculator/index.html'

def replace_url_in_file():
    names_to_remplace = os.listdir(server_path)
    
    css_list = list_files(f'{server_path}/css')
    js_list = list_files(f'{server_path}/js')

    with open(url_file_path, 'r+') as file:
        load = file.read()
        # for i in js_list:
        #     load.replace(i, )


def list_files(path):
    unaccepted = ('.txt', '.map')

    files_list = os.listdir(path)
    
    for i in unaccepted:
        files_list = tuple(filter(lambda j: not j.endswith(i), files_list))

    return files_list

if __name__ == "__main__":
    replace_url_in_file()
    # shutil.rmtree(server_path)
    # shutil.copytree(client_path, server_path)