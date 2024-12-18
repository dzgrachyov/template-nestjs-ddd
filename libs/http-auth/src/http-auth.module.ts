import { Module } from '@nestjs/common';
import { HttpAuthService } from './http-auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: "123",
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [HttpAuthService],
  exports: [HttpAuthService],
})
export class HttpAuthModule { }
