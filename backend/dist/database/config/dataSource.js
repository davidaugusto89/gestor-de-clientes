"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv = __importStar(require("dotenv"));
const usuario_entity_1 = require("../../usuarios/entities/usuario.entity");
const cliente_entity_1 = require("../../clientes/entities/cliente.entity");
// Carregar as variáveis de ambiente
dotenv.config();
var DatabaseType;
(function (DatabaseType) {
    DatabaseType["MYSQL"] = "mysql";
    DatabaseType["MARIADB"] = "mariadb";
    DatabaseType["POSTGRES"] = "postgres";
    DatabaseType["SQLITE"] = "sqlite";
    DatabaseType["MSSQL"] = "mssql";
})(DatabaseType || (DatabaseType = {}));
exports.AppDataSource = new typeorm_1.DataSource({
    type: process.env.DB_TYPE || DatabaseType.MARIADB,
    host: process.env.DB_HOST || 'database',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || 'user',
    password: process.env.DB_PASS || 'userpassword',
    database: process.env.DB_NAME || 'app_db',
    entities: [usuario_entity_1.UsuarioEntity, cliente_entity_1.ClienteEntity],
    migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
    synchronize: false,
    logging: process.env.NODE_ENV !== 'production',
});
