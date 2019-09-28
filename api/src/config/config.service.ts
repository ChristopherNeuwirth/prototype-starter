import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  getString(): string {
    const prefix = this.envConfig.DATABASE_URI_PREFIX;
    const user = this.envConfig.DATABASE_USER;
    const password = this.envConfig.DATABASE_PASSWORD;
    const uri = this.envConfig.DATABASE_URI;
    return `${prefix}${user}:${password}${uri}`;
  }
}
