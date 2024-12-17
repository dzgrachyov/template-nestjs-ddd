import { Injectable } from '@nestjs/common';

@Injectable()
export class TemplateApiService {
  getHello(): string {
    return 'Hello World!';
  }
}
