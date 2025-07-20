"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enforceInternalAccess = void 0;
const enforceInternalAccess = (req, res, next) => {
    const internalHeader = req.headers['x-internal-auth'];
    if (internalHeader !== process.env.INTERNAL_SECRET) {
        return res.status(403).json({ error: 'Forbidden – external access denied' });
    }
    next();
};
exports.enforceInternalAccess = enforceInternalAccess;
