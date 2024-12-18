import { HttpAuthGuard } from './http-auth.guard';

describe('HttpAuthGuard', () => {
  it('should be defined', () => {
    expect(new HttpAuthGuard()).toBeDefined();
  });
});
