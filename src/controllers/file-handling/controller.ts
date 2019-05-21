import * as fs from "fs";
import { FileValidate, iIsValid } from "./modules/FileValidate";
import { db } from "../../configuration/locale.db";
import { SaveToDatabase } from "./modules/SaveToDatabase";

export function get(req, res){
    db['trackback'].findAll()
    .then(r => console.log(r))
    res.json({msg : "working"})
}

export function validateFile(req, res){}

export function upload(req, res){
    let fileName = new Date()
    let filePath = "./tmp/"+fileName+".csv"
    req.pipe(fs.createWriteStream(filePath));
    req.on('end', async () => {
       
        let fileVaidate = new FileValidate(filePath)
        let isValid : iIsValid = await fileVaidate.execute()
        if(!isValid.status){
            res.status(500)
        }
        else if(isValid.status){
            //call the save data
            // let saveData = new SaveToDatabase(filePath);
            // let save = await saveData.execute()
            // isValid.trackback = save
        }

        res.json(isValid)
    });
}

export function trackback(req, res){
    if(!req.query.trackback_id){
        res.status(422)
        res.json({msg : "Trackback id not present in the database"})
        return;
    }

    let id = req.query.trackback_id;
    return db['trackback'].findOne({
        where : {
            id : id
        }
    })
    .then(result => {
        if(result) res.json(result)
        else {
            res.status(404)
            res.json({msg : "No Data Found"})
        }
    })
}