const router = require('express').Router();
const { jwtMiddleware } = require('../../../../config/jwt.strategy');

//Models
const Boards = require('../../../../dao/board/board.model');
const validatorHandler = require('../../../../middlewares/validator.handler');
const boardModel = new Boards();

const {
    createBoardSchema,
    findAllBoardsByUserSchema,
    findBoardSchema,
    deleteBoardSchema,
} = require('../../../../schemas/board.schema');

router.post('/create',
    jwtMiddleware,
    validatorHandler(createBoardSchema, 'body'),
    async (req, res, next) => {
        try {
            const data = req.body;
            const userId = req.user.userId;

            const randomCode = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);

            const insertData = {
                userId,
                boardName: data.boardName,
                boardCode: randomCode.toUpperCase()
            }

            const result = await boardModel.new(insertData);
            result.code = randomCode.toUpperCase();

            res.status(200).json({
                status: 'success',
                result,
            });
        } catch (error) {
            next(error);
        }
    }
);

router.get('/findAll/:userId',
    jwtMiddleware,
    validatorHandler(findAllBoardsByUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const data = req.params;

            const results = await boardModel.findAllByUserId(data.userId);

            res.status(200).json({
                status: 'success',
                results,
            });
        } catch (error) {
            next(error);
        }
    }
);

router.get('/findOne/:code',
    jwtMiddleware,
    validatorHandler(findBoardSchema, 'params'),
    async (req, res, next) => {
        try {
            const data = req.params;

            const results = await boardModel.findFirstMatch({boardCode: data.code});

            res.status(200).json({
                status: 'success',
                results,
            });
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/delete/:boardId',
    jwtMiddleware,
    validatorHandler(deleteBoardSchema, 'params'),
    async (req, res, next) => {
        try {
            const data = req.params;

            const result = await boardModel.deleteOne(data.boardId);

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