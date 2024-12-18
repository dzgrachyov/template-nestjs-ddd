import { Test, TestingModule } from '@nestjs/testing';
import { TemplateCalculationController } from './template-calculation.controller';
import { TemplateCalculationService } from './template-calculation.service';

describe('TemplateCalculationController', () => {
  let templateCalculationController: TemplateCalculationController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TemplateCalculationController],
      providers: [TemplateCalculationService],
    }).compile();

    templateCalculationController = app.get<TemplateCalculationController>(TemplateCalculationController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(templateCalculationController.getHello()).toBe('Hello World!');
    });
  });
});
