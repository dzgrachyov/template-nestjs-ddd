import { Injectable } from '@nestjs/common';

@Injectable()
export class TemplateCalculationService {
  getHello(): string {
    return 'Hello World!';
  }
}
