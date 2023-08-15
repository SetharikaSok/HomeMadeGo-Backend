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
exports.kitchenController = void 0;
var prisma_1 = __importDefault(require("../services/prisma"));
var image_controller_1 = require("./image.controller");
exports.kitchenController = {
    createKitchen: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var email, _a, name, address1, address2, city, state, country, zipcode, latitude, longitude, contact, cuisineType, imgUrl, image_location, kitchen;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        email = req.email;
                        _a = req.body, name = _a.name, address1 = _a.address1, address2 = _a.address2, city = _a.city, state = _a.state, country = _a.country, zipcode = _a.zipcode, latitude = _a.latitude, longitude = _a.longitude, contact = _a.contact, cuisineType = _a.cuisineType, imgUrl = _a.imgUrl;
                        // find lat/lon of created kitchen
                        //file
                        if (!req.file) {
                            return [2 /*return*/, res.status(400).send('No file uploaded.')];
                        }
                        return [4 /*yield*/, image_controller_1.imageController.upload(req.file)];
                    case 1:
                        image_location = _b.sent();
                        if (!email) return [3 /*break*/, 3];
                        return [4 /*yield*/, prisma_1.default.kitchen.create({
                                data: {
                                    name: name,
                                    address1: address1,
                                    address2: address2,
                                    city: city,
                                    state: state,
                                    country: country,
                                    zipcode: zipcode,
                                    latitude: latitude,
                                    longitude: longitude,
                                    contactNumber: contact,
                                    cuisineType: cuisineType,
                                    email: email,
                                    imgUrl: image_location
                                },
                                include: {
                                    menuItems: true,
                                    orders: true
                                }
                            })];
                    case 2:
                        kitchen = _b.sent();
                        return [2 /*return*/, res.json({ kitchen: kitchen })];
                    case 3: return [2 /*return*/, res.status(404).json({ "message": "Kitchen not found" })];
                }
            });
        });
    },
    findUniqueKitchen: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var paramId, uniqueKitchen;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        paramId = req.params.id;
                        return [4 /*yield*/, prisma_1.default.kitchen.findUnique({
                                where: {
                                    id: paramId,
                                }
                            })];
                    case 1:
                        uniqueKitchen = _a.sent();
                        return [2 /*return*/, res.json({ uniqueKitchen: uniqueKitchen })];
                }
            });
        });
    },
    findAllKitchens: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var kitchens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma_1.default.kitchen.findMany()];
                    case 1:
                        kitchens = _a.sent();
                        return [2 /*return*/, res.json(kitchens)];
                }
            });
        });
    },
    deleteKitchen: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var paramId, deletedKitchen;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        paramId = req.params.id;
                        return [4 /*yield*/, prisma_1.default.kitchen.delete({
                                where: {
                                    id: paramId,
                                }
                            })];
                    case 1:
                        deletedKitchen = _a.sent();
                        return [2 /*return*/, res.json({ deletedKitchen: deletedKitchen })];
                }
            });
        });
    },
    deleteAll: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var tableNames, _i, tableNames_1, tableName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tableNames = ['Kitchen', 'MenuItem', 'User', 'Order', 'OrderItem'];
                        _i = 0, tableNames_1 = tableNames;
                        _a.label = 1;
                    case 1:
                        if (!(_i < tableNames_1.length)) return [3 /*break*/, 4];
                        tableName = tableNames_1[_i];
                        return [4 /*yield*/, prisma_1.default.$queryRawUnsafe("Truncate \"".concat(tableName, "\" restart identity cascade;"))];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, res.json({ deletedAll: "" })];
                }
            });
        });
    }
};
//# sourceMappingURL=kitchen.controller.js.map