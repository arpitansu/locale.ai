import { FILE_FORMAT } from "../../../configuration/locale.ai.configuration";
import * as fs from "fs"
import * as readline from "readline"
import { RESPONSE_MEESAGES } from "../../../configuration/locale.ai.response.message";
import { iTrackback } from "./SaveToDatabase";

export class FileValidate{
    private _filePath : string;
    constructor(filePath : string){
        this._filePath = filePath
    }

    async execute() : Promise<iIsValid>{

        return new Promise((resolve ,reject) => {
            // i need to only read the top line here to match the headings
            var lineReader = readline.createInterface({
                input: require('fs').createReadStream(this._filePath),
            });
    
            var lineCounter = 0; 
            var wantedLines = [];
    
            lineReader.on('line', (line) => {
                lineCounter++;
                wantedLines.push(line);
                if(lineCounter==1){
                    lineReader.close()
                }
            });
    
    
            lineReader.on('close', () => {
                let heading = wantedLines[0].split(",") //this will parse the heading
                if(heading.length != FILE_FORMAT.length){
                    resolve({status : false, msg : RESPONSE_MEESAGES.fileHeadingDidNotMatch})
                    this._deleteFile()
                    return;
                }
                else{
                    for(let i=0; i < FILE_FORMAT.length; i++){
                        if(FILE_FORMAT[i] != heading[i]){
                            resolve({status : false, msg : RESPONSE_MEESAGES.fileHeadingNotInOrder})
                            this._deleteFile()
                            return
                        }
                    }
                }
                resolve({status : true, msg : RESPONSE_MEESAGES.fileAccepted})
            });

        })

    }


    private _deleteFile(){
        //delete the file if not needed
        fs.unlinkSync(this._filePath)
    }
}

export interface iIsValid{
    status : boolean
    msg : string
    trackback? : iTrackback
}