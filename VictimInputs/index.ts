import { AzureFunction, Context } from "@azure/functions"
const { MongoClient } = require('mongodb');

const mongoClient = new MongoClient(process.env.MONGODB_CONNECTION_STRING);
mongoClient.connect();

const database = mongoClient.db(process.env.MONGODB_DATABASE_NAME);

const eventGridTrigger: AzureFunction = async function (context: Context, eventGridEvent: any): Promise<void> {
    // {
    //     eventType: data.type,
    //     subject: data.code,
    //     dataVersion: "1.0",
    //     data: { type, code, hash},
    // }
    console.log(eventGridEvent);
    await logEvent(eventGridEvent.data);

};

async function logEvent(data: any) {
    // { 
    //     type: // click, submit
    //     code: // clientShortCode
    //     hash: // attackShortCode
    // }
    const attackEvent = { 
        type: data.type, 
        clientShortCode: data.code, 
        attackShortCode: data.hash
    }
    const result = await database.collection('attacks-events').insertOne(attackEvent);
    console.log(result);
}


export default eventGridTrigger;
