import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpAuthService {
  async verifyAsync(token: string) {
    return { id: 1, role: 'admin' };
  }
}
