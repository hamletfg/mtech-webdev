import crypto from 'crypto';
import fs from 'fs';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFileName = 'output.enc';
const outputFileName = 'output.txt';
// Define the algorithm and password
const algorithm = 'aes-256-cbc';
const password = 'ILov3Mt3c!';

// Use the asyn `crypto.scrpt()` instead.
const key = crypto.scryptSync(password, 'salt', 32);
// The IV is usally passed along with the ciphertext
const iv = Buffer.alloc(16, 0); // Initialization vector

const inputFilePath = path.join(__dirname, inputFileName);
const outputFilePath = path.join(__dirname, outputFileName);

const decryptFile = (inputPath, outputPath) => {
  const readStream = fs.createReadStream(inputPath);
  const writeStream = fs.createWriteStream(outputPath);
  const decrypt = crypto.createDecipheriv(algorithm, key, iv);
  readStream.pipe(decrypt).pipe(writeStream);
  writeStream.on('finish', () => {
    console.log('File decrypted successfully.');
  });
};
decryptFile(inputFilePath, outputFilePath);
