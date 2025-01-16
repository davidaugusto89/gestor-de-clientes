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
const dataSource_1 = require("./config/dataSource");
const fs_1 = require("fs");
const path_1 = require("path");
(async () => {
    try {
        // Inicialize o DataSource
        const dataSource = await dataSource_1.AppDataSource.initialize();
        console.log('Database connected.');
        // Caminho para os arquivos de seeders
        const seedersPath = (0, path_1.join)(__dirname, 'seeders');
        // Carregar dinamicamente todos os arquivos na pasta `seeders`
        const seederFiles = (0, fs_1.readdirSync)(seedersPath).filter((file) => file.endsWith('.ts') || file.endsWith('.js'));
        // Executar cada seeder
        for (const file of seederFiles) {
            const { default: seederFunction } = await Promise.resolve(`${(0, path_1.join)(seedersPath, file)}`).then(s => __importStar(require(s)));
            console.log(`Executando seeder: ${file}`);
            await seederFunction(dataSource);
        }
        console.log('Todos os seeders foram executados com sucesso.');
        process.exit(0);
    }
    catch (error) {
        console.error('Erro ao executar seeders:', error);
        process.exit(1);
    }
})();
