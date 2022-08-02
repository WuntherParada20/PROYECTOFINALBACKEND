const Joi = require('joi');

//Types
const id = Joi.string();
const boardName = Joi.string();
const code = Joi.string().length(6);

const createBoardSchema = Joi.object({
    boardName: boardName.required(),
});

const findAllBoardsByUserSchema = Joi.object({
    userId: id.required(),
});

const deleteBoardSchema = Joi.object({
    boardId: id.required(),
});

const findBoardSchema = Joi.object({
    code: code.required(),
});


module.exports = {
    createBoardSchema,
    findAllBoardsByUserSchema,
    findBoardSchema,
    deleteBoardSchema
};