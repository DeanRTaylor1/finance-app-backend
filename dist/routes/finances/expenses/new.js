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
exports.expensesNewRouter = void 0;
const express_1 = __importDefault(require("express"));
const common_1 = require("../../../common");
const expenses_model_1 = require("../../../models/postgres/expenses-model");
const user_model_1 = require("../../../models/postgres/user-model");
const router = express_1.default.Router();
exports.expensesNewRouter = router;
router.post('/api/finances/expenses', common_1.requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { item, cost, currency, tag, dateSpent, email } = req.body;
    console.log(req.body);
    if (!item || !cost || !currency || !tag || !dateSpent || !email) {
        throw new common_1.BadRequestError('Missing Attributes');
    }
    const { id } = yield user_model_1.User.findByEmail(email);
    const result = yield expenses_model_1.Expenses.insertNewExpense(item, cost, currency, tag, dateSpent, id);
    console.log(result);
    res.send(result);
}));
