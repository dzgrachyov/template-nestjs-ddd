import { Test, TestingModule } from '@nestjs/testing';
import { TemplateCommonService } from './template-common.service';

describe('TemplateCommonService', () => {
  let service: TemplateCommonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateCommonService],
    }).compile();

    service = module.get<TemplateCommonService>(TemplateCommonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
