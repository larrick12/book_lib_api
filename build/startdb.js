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
const query_1 = __importDefault(require("./db/query"));
const models_1 = require("./db/models");
// dropAllTables();
function db_table_checker() {
    return __awaiter(this, void 0, void 0, function* () {
        let tbname = `SELECT EXISTS (SELECT bookuser FROM information_schema.tables WHERE table_name = bookuser)`;
        try {
            let ch = yield (0, query_1.default)(tbname);
            if (ch != null) {
                console.log(ch);
            }
        }
        catch (error) {
            if (error) {
                console.log('----> creating tables...');
                yield (0, models_1.createAllTables)();
            }
            else {
                throw new Error(error);
            }
        }
    });
}
db_table_checker();
// export default db_table_checker
//# sourceMappingURL=startdb.js.map