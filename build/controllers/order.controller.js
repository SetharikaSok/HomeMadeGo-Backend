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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
var prisma_1 = __importDefault(require("../services/prisma"));
exports.orderController = {
    createOrder: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var email, _a, totalAmount, kitchenId, menuItems, user, order, _i, menuItems_1, menuItem, menuItemId, quantity, orderItems, order2, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        email = req.email;
                        _a = req.body, totalAmount = _a.totalAmount, kitchenId = _a.kitchenId, menuItems = _a.menuItems;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 9, , 10]);
                        return [4 /*yield*/, prisma_1.default.user.findUnique({
                                where: {
                                    email: email
                                }
                            })];
                    case 2:
                        user = _b.sent();
                        return [4 /*yield*/, prisma_1.default.order.create({
                                data: {
                                    totalAmount: totalAmount,
                                    kitchenId: kitchenId,
                                    userId: user === null || user === void 0 ? void 0 : user.id,
                                },
                                include: {
                                    orderItem: true,
                                }
                            })];
                    case 3:
                        order = _b.sent();
                        _i = 0, menuItems_1 = menuItems;
                        _b.label = 4;
                    case 4:
                        if (!(_i < menuItems_1.length)) return [3 /*break*/, 7];
                        menuItem = menuItems_1[_i];
                        menuItemId = menuItem.menuItemId, quantity = menuItem.quantity;
                        return [4 /*yield*/, prisma_1.default.orderItem.create({
                                data: {
                                    quantity: quantity,
                                    orderId: order.id,
                                    menuItemId: menuItemId
                                }
                            })];
                    case 5:
                        orderItems = _b.sent();
                        _b.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7: return [4 /*yield*/, prisma_1.default.order.findFirst({
                            where: {
                                id: order.id
                            },
                            include: {
                                orderItem: true,
                            }
                        })];
                    case 8:
                        order2 = _b.sent();
                        return [2 /*return*/, res.json({ order: order2 })];
                    case 9:
                        err_1 = _b.sent();
                        console.log(err_1);
                        return [2 /*return*/, res.status(500).json({ msg: err_1 })];
                    case 10: return [2 /*return*/];
                }
            });
        });
    },
    findUniqueOrder: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var paramId, uniqueOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        paramId = req.params.id;
                        return [4 /*yield*/, prisma_1.default.order.findUnique({
                                where: {
                                    id: paramId
                                },
                                include: {
                                    orderItem: true,
                                }
                            })];
                    case 1:
                        uniqueOrder = _a.sent();
                        return [2 /*return*/, res.json({ uniqueOrder: uniqueOrder })];
                }
            });
        });
    },
    findAllOrder: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var allOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma_1.default.order.findMany({
                            include: {
                                orderItem: true,
                            }
                        })];
                    case 1:
                        allOrder = _a.sent();
                        return [2 /*return*/, res.json({ order: allOrder })];
                }
            });
        });
    }
};
