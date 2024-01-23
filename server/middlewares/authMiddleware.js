const dotenv = require('dotenv');
const jwt = require('../lib/jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

dotenv.config({ path: './config.env' });

const SECRET = process.env.JWT_SECRET;

exports.authMiddleware = catchAsync(async (req, res, next) => {
    if (req.header('Authorization')) {
        const token = req.header('Authorization');
        try {
            if (token) {
                const decodedToken = await jwt.verify(token, SECRET);
                req.user = decodedToken;
            }
            
        } catch (error) {
            if(error){
                return next(new AppError(error, 401))
            }
        }
    }

    next();
});
