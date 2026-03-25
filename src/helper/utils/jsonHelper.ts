// jsonHelper.ts
// Helper utilities for JSON operations

import * as fs from 'fs';
import * as path from 'path';

export const readJsonFile = (filePath: string): any => {
    const absolutePath = path.resolve(filePath);
    const rawData = fs.readFileSync(absolutePath, 'utf-8');
    return JSON.parse(rawData);
};

export const writeJsonFile = (filePath: string, data: any): void => {
    const absolutePath = path.resolve(filePath);
    fs.writeFileSync(absolutePath, JSON.stringify(data, null, 2), 'utf-8');
};
