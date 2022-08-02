const Joi = require('joi');

//Types
const id = Joi.string();
const type = Joi.string().valid('improve', 'continue', 'actions');
const title = Joi.string();
const description = Joi.string();

const findAllNotesSchema = Joi.object({
    boardId: id.required()
});

const createNoteParamSchema = Joi.object({
    boardId: id.required(),
    userId: id.required(),
});

const createNoteSchema = Joi.object({
    type: type.required(),
    title: title.required(),
    description: description.required(),
});

const deleteNoteSchema = Joi.object({
    noteId: id.required(),
});


module.exports = {
    findAllNotesSchema,
    createNoteParamSchema,
    createNoteSchema,
    deleteNoteSchema,
};