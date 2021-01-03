/* eslint-disable no-console */
import { MongoClient } from 'mongodb';
import pageHelper from './pageHelper';

export default class DbHelper {
    private static url = 'mongodb://localhost:27017/';

    private static userJson = {
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        hash: '1fd3fd0f444b4695461fda7b89bef43550b5ebf1e8d576b64ebdd34db073eedc2f9b580b33dc2e5fb80a2a969ca8fb4563c83c64500759ae41d88548631865342d5e79df19b6f27107f51b139267e9587f5a5005ad4feff452312e94d67a03911b86b197849b39dbe7e84305b25b13e2a448feeab9108ff5b2d64dd6a766e9a9a8cb1c63c8342d09334fc8e330c8edfe517d4f78bc052501d2b5675f7fc76d0a39a9a7f8613a753d1e63c8f9f45b829250741ec1116fad87aeb523828e96af49a70ef52904dee8cbffeb581dc7b8888290698d9f1ce51185c47c77f3a87cf532946df0d5b8aaeacf8b13a5246c449201577a959fd454abafbc26f79632ea9efbb4633de61ba1c0dce03154fffbfe05800c244a4f58c029e4259d6621d727f1d99a10b647bc7fc5ac12ae54f1be122ee24277039b66ff20b5db719cc5761f3a89b769d53bd95cff29ab85c8f9f624f215e45ff3470e6282fd89b1518f61ad1bb3347cde74570f9c306c00a56cf4d4bcd9f82136043206aa59c29d687d873b68a94dc7a86b72c06fe7eb522170938a0abe0dc4c806d1f97d26ba196d0e05d49d9704a1a89994c2d01cbbb6403d9b2fac97fc82cda0b246183e8db6cf5143875fd6dffe9f2436832dbed5e72dbb4e3f75dfd8e4ca577bfc68e9c9a1132663d9547a782ee7ac9e4ea3ff576ecd403c448dff2fa8893d09651a8544be179c829c1061',
        salt: 'd275faf363be3cfe27a49e9f409c3da4',
        email: `${pageHelper.defaultUserEmail}`,
        username: `${pageHelper.defaultUser}`,
        following: [],
        favorites: [],
        __v: 0,
    }

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

    public static async addDefaultUser(dbName: string): Promise<void> {
        const client = await MongoClient.connect(this.url + dbName);
        try {
            const insertionResult = await client.db().collection('users').insertOne(this.userJson);
            if (insertionResult.insertedCount) {
                console.log(`Inserted ${insertionResult.insertedCount} documents`);
            }
        } catch (error: any) {
            console.error(error);
        } finally {
            await client.close(true);
        }
    }
}
