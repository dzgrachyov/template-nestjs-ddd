import { Test, TestingModule } from '@nestjs/testing';
import { HttpAuthService } from './http-auth.service';

describe('HttpAuthService', () => {
  let service: HttpAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpAuthService],
    }).compile();

    service = module.get<HttpAuthService>(HttpAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
