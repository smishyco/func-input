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
    await logEvent(eventGridEvent.data);

};

async function logEvent(event) {
    // { 
    //     type: // click, submit
    //     code: // clientShortCode
    //     hash: // attackShortCode
    // }
    const attackEvent = { 
        type: event.type, 
        clientShortCode: event.code, 
        attackShortCode: event.hash, 
    }
    const result = await database.collection('attacks-events').insertOne(event);
}


export default eventGridTrigger;
