import { AzureFunction, Context } from "@azure/functions"
const { MongoClient } = require('mongodb');

const mongoClient = new MongoClient(process.env.MONGODB_CONNECTION_STRING);
mongoClient.connect();

const database = mongoClient.db(process.env.MONGODB_DATABASE_NAME);

const eventGridTrigger: AzureFunction = async function (context: Context, eventGridEvent: any): Promise<void> {
    await logEvent(eventGridEvent.data);

};

async function logEvent(data: any) {
    const attackEvent = { 
        type: data.type, 
        clientShortCode: data.code, 
        attackShortCode: data.hash
    }
    const result = await database.collection('attacks-events').insertOne(attackEvent);
}


export default eventGridTrigger;
