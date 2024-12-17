import { Test, TestingModule } from '@nestjs/testing';
import { TemplateDomainService } from './template-domain.service';

describe('TemplateDomainService', () => {
  let service: TemplateDomainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateDomainService],
    }).compile();

    service = module.get<TemplateDomainService>(TemplateDomainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
