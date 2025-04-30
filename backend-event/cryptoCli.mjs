import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- Basic Setup ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Crypographic Settings
const algorithm = 'aes-256-cbc';
const password = 'ILov3Mt3c!';
const salt = 'salt';
const key = crypto.scryptSync(password, salt, 32);
const iv = Buffer.alloc(16, 0); // Initialization Vector

console.log('Crypto CLI script starting...');
console.log('Dirname', __dirname);

// --- Argument Handling ---
console.log('Raw arguments (process.argv):', process.argv);

if (process.argv.lenght < 5) {
  console.error('❌ Error: Missing arguments!');
  console.error(
    'Usage: node cryptoCli.mjs <encrypt|decrypt> <inputFile> <outputFile>'
  );
  process.exit(1); // Exit the script with an error code
}

const operation = process.argv[2]; // 'encrypt' or 'decrypt'
const inputFile = process.argv[3]; // e.g., 'input.txt' or 'output.enc'
const outputFile = process.argv[4]; // e.g., 'output.enc' or 'input.txt'

console.log(`Operation: ${operation}`);
console.log(`Input File: ${inputFile}`);
console.log(`Output File: ${outputFile}`);
