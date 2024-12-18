import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HttpAuthService } from './http-auth.service';
import { HttpAuthGuard } from './http-auth.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: "123",
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [HttpAuthService, HttpAuthGuard],
  exports: [HttpAuthService, HttpAuthGuard],
})
export class HttpAuthModule { }
