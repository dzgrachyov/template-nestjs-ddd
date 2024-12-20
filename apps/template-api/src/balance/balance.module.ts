import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpAuthModule } from '@library/http-auth';
import balance_service_client_config from 'config/balance-service-client.config';

@Module({
  imports: [
    HttpAuthModule,
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: 'BALANCE_SERVICE',
        useFactory: balance_service_client_config,
        inject: [ConfigService],
      },
    ])
  ],
  providers: [BalanceService],
  controllers: [BalanceController]
})
export class BalanceModule { }
