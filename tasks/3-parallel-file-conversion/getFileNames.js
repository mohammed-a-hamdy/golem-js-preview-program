import fs from "fs";
import path from "path";
export const getFilenamesInDirectory = (directoryPath) => {
    let arr = [];
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
        } else {
            console.log('Filenames in directory (without extension):');
            files.forEach((file) => {
                const fileName = path.parse(file).name;
               arr.push(fileName)
            });
        }
    });
    return arr;
};


