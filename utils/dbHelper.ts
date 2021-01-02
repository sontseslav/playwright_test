import { MongoClient } from 'mongodb';

export default class DbHelper {
    private static url = 'mongodb://localhost:27017/';

    public static async deleteUser(dbName: string, userName: string): Promise<void> {
        const client = await MongoClient.connect(this.url + dbName);
        const deletionResult = await client.db().collection('users').deleteOne({ username: userName });
        if (deletionResult.deletedCount) {
            console.log(`Deleted user: ${userName}`);
        } else {
            console.log(`User ${userName} not found`);
        }
        await client.close(true);
    }
}
