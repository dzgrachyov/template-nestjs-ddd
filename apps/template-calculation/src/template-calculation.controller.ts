import { Controller, Get } from '@nestjs/common';
import { TemplateCalculationService } from './template-calculation.service';
import { User } from '@prisma/client';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class TemplateCalculationController {
  constructor(private readonly templateCalculationService: TemplateCalculationService) { }

  @Get()
  getHello(): string {
    return this.templateCalculationService.getHello();
  }

  @MessagePattern({ type: 'balance_calculate', })
  async calculateBalance(@Payload() data: { user: Pick<User, 'id'>, account_id: number }) {
    const transactions = [{ id: 0, amount: 100 }, { id: 1, amount: -50 }];
    const balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    const { user, account_id } = data;
    return {
      user_id: user.id,
      account_id,
      balance,
    };
  }

  @EventPattern('event_balance_calculated')
  async handleBudgetCalculated(data: Record<string, unknown>) {
    // business logic
  }
}
