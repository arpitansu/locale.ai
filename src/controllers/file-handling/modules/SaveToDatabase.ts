import { db } from "../../../configuration/locale.db";
import * as fs from "fs";
import * as csv from "csv-parser"
import { listenerCount } from "cluster";

export class SaveToDatabase{
    private _filepath : string;
    private _trackbackId;
    constructor(filepath : string){
        this._filepath = filepath;
    }


    async execute(){
        let createTrackback = await this._createTrackback()
        this._save();
        return createTrackback
    }

    /**
     * this function will create an trackback id for every upload and return it to the user
     */
    private async _createTrackback() : Promise<any>{
        let body = {} as iTrackback
        body.msg = "In Progress"
        return db['trackback'].create(body)
        .then(result => {
            if(result) {
                this._trackbackId = result.id
                return result
            }
            else throw new Error('Trackack creation failure')
        })
    }

    private _updateTrackback(updateString){
        let body = {} as iTrackback
        body.msg = updateString
        return db['trackback'].update(body, {
            where : {
                id : this._trackbackId
            }
        })
        .then(result => {
            if(result) return result
            else throw new Error('Trackback creation failure')
        })
    }

    private _save(){
        let data = []
        let counter = 0;
        let rs = fs.createReadStream(this._filepath)
        .pipe(csv())
        .on('data', async (row) => {
           counter++
           data.push(row)
           if(counter == 1000){
                rs.pause()
                let status = await this._bulkInsert(data)
                this._updateTrackback(`upto row ${status} done`)
                counter = 0;
                data = []
                rs.resume()
           }
        })
        .on('end', () => {
            this._updateTrackback("Data Loaded")
        })

    }

    private _bulkInsert(data){
        return db['sequelize'].transaction(t => {
            return db['xrides'].bulkCreate(data, {transaction : t})
        })
        .then(commit => {
            return commit[commit.length - 1].id
        })
        .catch(rollback => {
            return rollback
        })


    }

}

export interface iTrackback {
    id? : number
    date_addded? : Date
    msg : string
}

