const { ObjectId } = require('mongodb');
const Model = require('../model');

class Notes extends Model {
    constructor() {
        super('Notes');
    }

    //Add new board
    async new(data) {
        data = {
            ...data,
            boardId: new ObjectId(data.boardId),
            userId: new ObjectId(data.userId)
        }
        return await this.collection.insertOne(data);
    }

    //Get All documents 
    async findAllByBoardId(boardId) {
        const filter = {
            boardId: new ObjectId(boardId)
        };
        const cursor = await this.collection.find(filter);
        const docs = await cursor.toArray();
        return docs;
    }
}

module.exports = Notes;