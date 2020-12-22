import { Injectable } from '@nestjs/common';

@Injectable()
export class SecureService {
  getSecureHello() {
    return {
      text: 'Hello, World.'
    };
  }
}
