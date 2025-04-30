import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Shared crypto setup
const algorithm = 'aes-256-cbc';
const password = 'ILov3Mt3c!';
const key = crypto.scryptSync(password, 'salt', 32);
const iv = Buffer.alloc(16, 0); // Initialization vector

// Encrypt function
const encryptFile = (inputPath, outputPath) => {
  const readStream = fs.createReadStream(inputPath);
  const writeStream = fs.createWriteStream(outputPath);
  const cipher = crypto.createCivpheriv(algorithm, key, iv);
  readStream.pipe(cipher).pipe(writeStream);
  writeStream.on('finish', () => {
    console.log('✅ File encrypted successfully.');
  });
};
