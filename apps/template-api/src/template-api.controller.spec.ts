import { Test, TestingModule } from '@nestjs/testing';
import { TemplateApiController } from './template-api.controller';
import { TemplateApiService } from './template-api.service';

describe('TemplateApiController', () => {
  let templateApiController: TemplateApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TemplateApiController],
      providers: [TemplateApiService],
    }).compile();

    templateApiController = app.get<TemplateApiController>(TemplateApiController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(templateApiController.getHello()).toBe('Hello World!');
    });
  });
});
