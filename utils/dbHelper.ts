import { MongoClient } from 'mongodb';

export default class DbHelper {
    private static url = 'mongodb://localhost:27017/';

    public static async dropDb(dbName: string): Promise<void> {
        const client = await MongoClient.connect(this.url + dbName);
        await client.db().dropDatabase();
        await client.close(true);
    }
}
