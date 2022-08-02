const router = require('express').Router();
const { jwtMiddleware } = require('../../../../config/jwt.strategy');

//Models
const Notes = require('../../../../dao/note/note.model');
const validatorHandler = require('../../../../middlewares/validator.handler');
const noteModel = new Notes();

const {
    createNoteSchema,
    deleteNoteSchema,
    createNoteParamSchema,
    findAllNotesSchema
} = require('../../../../schemas/note.schema');

router.post('/create/:boardId/user/:userId',
    jwtMiddleware,
    validatorHandler(createNoteParamSchema, 'params'),
    validatorHandler(createNoteSchema, 'body'),
    async (req, res, next) => {
        try {
            const data = req.body;
            const boardId = req.params.boardId;
            const userId = req.params.userId;

            const insertData = {
                boardId,
                userId,
                type: data.type,
                title: data.title,
                description: data.description,
            }

            const result = await noteModel.new(insertData);

            res.status(200).json({
                status: 'success',
                result,
            });
        } catch (error) {
            next(error);
        }
    }
);

router.get('/findAll/:boardId',
    jwtMiddleware,
    validatorHandler(findAllNotesSchema, 'params'),
    async (req, res, next) => {
        try {
            const data = req.params;

            const results = await noteModel.findAllByBoardId(data.boardId);

            res.status(200).json({
                status: 'success',
                results,
            });
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/delete/:noteId',
    jwtMiddleware,
    validatorHandler(deleteNoteSchema, 'params'),
    async (req, res, next) => {
        try {
            const data = req.params;

            const result = await noteModel.deleteOne(data.noteId);

            res.status(200).json({
                status: 'success',
                result,
            });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;