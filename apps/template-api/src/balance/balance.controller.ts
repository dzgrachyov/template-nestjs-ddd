import { AuthRole, AuthRoles, HttpAuthGuard } from '@library/http-auth';
import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('balance')
export class BalanceController {
  constructor(@Inject('BALANCE_SERVICE') private client: ClientProxy,) { }

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  @Get()
  @UseGuards(HttpAuthGuard)
  @AuthRoles([AuthRole.Client])
  async calculateBalance() {
    const pattern = { type: 'balance_calculate', };
    const payload = { user: { id: 1, }, account_id: 1, };
    return lastValueFrom(this.client.send(pattern, payload));
  }
}
