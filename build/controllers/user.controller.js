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
exports.userController = void 0;
var prisma_1 = __importDefault(require("../services/prisma"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var JWT_KEY = "mykey123";
exports.userController = {
    authmiddleware: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var token, verified;
            return __generator(this, function (_a) {
                try {
                    token = req.header('token');
                    if (!token)
                        return [2 /*return*/, res.status(401).json({ "msg": "No auth token. Access denied." })];
                    verified = jsonwebtoken_1.default.verify(token, JWT_KEY);
                    if (!verified) {
                        return [2 /*return*/, res.status(401).json({ "msg": "Token verification failed." })];
                    }
                    req.email = verified.email;
                    next();
                }
                catch (e) {
                    res.status(500).json({ "msg": "error token" });
                }
                return [2 /*return*/];
            });
        });
    },
    createUser: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, fname, lname, email, password, address, usertype, hash_password, webtoken, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, fname = _a.fname, lname = _a.lname, email = _a.email, password = _a.password, address = _a.address, usertype = _a.usertype;
                        return [4 /*yield*/, bcryptjs_1.default.hash(password, 12)];
                    case 1:
                        hash_password = _b.sent();
                        webtoken = jsonwebtoken_1.default.sign({ "email": email }, JWT_KEY);
                        return [4 /*yield*/, prisma_1.default.user.create({
                                data: {
                                    fname: fname,
                                    lname: lname,
                                    email: email,
                                    password: hash_password,
                                    webtoken: webtoken,
                                    address: address,
                                },
                                include: {
                                    orders: true
                                }
                            })];
                    case 2:
                        user = _b.sent();
                        // do not show hashpassword
                        user.password = "";
                        return [2 /*return*/, res.json({ user: user })];
                }
            });
        });
    },
    loginUser: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, prisma_1.default.user.findUnique({
                                where: {
                                    email: email
                                }
                            })];
                    case 1:
                        user = _b.sent();
                        if (user && bcryptjs_1.default.compareSync(password, user.password)) {
                            user.password = "";
                            return [2 /*return*/, res.json(user)];
                        }
                        return [2 /*return*/, res.status(400).json({ "error_message": "Email or Password didn't match" })];
                }
            });
        });
    },
    dashboard: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var email;
            return __generator(this, function (_a) {
                email = req.email;
                return [2 /*return*/];
            });
        });
    },
    index: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma_1.default.user.findMany()];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, res.json(users)];
                }
            });
        });
    },
    findUniqueUser: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var paramId, uniqueUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        paramId = req.params.id;
                        return [4 /*yield*/, prisma_1.default.user.findUnique({
                                where: {
                                    id: paramId,
                                }
                            })];
                    case 1:
                        uniqueUser = _a.sent();
                        return [2 /*return*/, res.json({ uniqueUser: uniqueUser })];
                }
            });
        });
    },
    updateUser: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var paramId, address, updateUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        paramId = req.params.id;
                        address = req.body.address;
                        return [4 /*yield*/, prisma_1.default.user.update({
                                data: {
                                    address: address,
                                },
                                where: {
                                    id: paramId,
                                }
                            })];
                    case 1:
                        updateUser = _a.sent();
                        return [2 /*return*/, res.json({ updateUser: updateUser })];
                }
            });
        });
    },
    deleteUser: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var paramId, deletedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        paramId = req.params.id;
                        return [4 /*yield*/, prisma_1.default.user.delete({
                                where: {
                                    id: paramId,
                                }
                            })];
                    case 1:
                        deletedUser = _a.sent();
                        return [2 /*return*/, res.json({ deletedUser: deletedUser })];
                }
            });
        });
    }
};
//# sourceMappingURL=user.controller.js.map