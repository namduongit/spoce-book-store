import os

folder_path = './'
files = [f for f in os.listdir(folder_path) if f.endswith('.png')]

print(files)