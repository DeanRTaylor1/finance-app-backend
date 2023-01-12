"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.outgoingsNewRouter = void 0;
const express_1 = __importDefault(require("express"));
const common_1 = require("../../../common");
const outgoings_model_1 = require("../../../models/postgres/outgoings-model");
const user_model_1 = require("../../../models/postgres/user-model");
const router = express_1.default.Router();
exports.outgoingsNewRouter = router;
router.post('/api/finances/outgoings', common_1.requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { item, currency, email, tag, cost } = req.body;
    if (!currency || !email || !tag || !cost || !item) {
        throw new common_1.BadRequestError('Missing Attributes');
    }
    const existingItem = yield outgoings_model_1.Outgoings.findExistingItemByName(item);
    if (existingItem) {
        console.log(!!existingItem);
        throw new common_1.BadRequestError('Cannot create duplicate item please change the name');
    }
    const { id } = yield user_model_1.User.findByEmail(email);
    const addedItem = yield outgoings_model_1.Outgoings.insertNewRecord(item, currency, id, tag, cost);
    //remove the postgres id from the return as it is unused
    const outgoings = yield outgoings_model_1.Outgoings.findAll();
    console.log(outgoings);
    res.status(201).send(addedItem);
}));
