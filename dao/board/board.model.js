const { ObjectId } = require('mongodb');
const Model = require('../model');

class Boards extends Model {
    constructor() {
        super('Boards');
    }

    //Add new board
    async new(data) {
        data = {
            ...data,
            userId: new ObjectId(data.userId)
        }
        return await this.collection.insertOne(data);
    }

    //Get All documents 
    async findAllByUserId(userId) {
        const filter = {
            userId: new ObjectId(userId)
        };
        const cursor = await this.collection.find(filter);
        const docs = await cursor.toArray();
        return docs;
    }

    async uptAddOneNote(id, changes) {
        const filter = {_id: new ObjectId(id)};
        const updateCmd = {
            '$push': {
                notes: {...changes}
            }
        };

        return await this.collection.updateOne(filter, updateCmd);
    }
}

module.exports = Boards;