import os
import io
import sys

def list(path, extensions):
    file = None
    count = 0
    
    for subDir, dir, files  in os.walk(path):
        for file in files:
            name, extension = os.path.splitext(file)
            valid = False
            
            for ex in extensions:
                if ex == extension:
                    valid = True
                    break
                
            if not valid: continue
            
            try:
                file = io.open(subDir + "\\" + file, "r")
                count += len(file.readlines())
            except:
                print("cannot open file %s\n" % file)
                continue
            
    return count
    

def main():
    path = "."
    extensions = [".cs"]
    
    if (len(sys.argv) >= 2):
        path = sys.argv[1]
    if (len(sys.argv) >= 3):
        extensions = []
        
        for i in range(len(sys.argv)):
            if(i <= 1) : continue
            extensions.append(sys.argv[i])
            
    print("listing in path:%s for extensions:%s" %(path, extensions))
    print("total lines:%s"%list(path, extensions))
    
main()