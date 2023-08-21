import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FinancesService } from '../services/finances.service';
import { FinancialOperationDto } from '../dto/financialOperation.dto';

@Controller('finances')
export class FinancesController {
  constructor(private readonly financesService: FinancesService) { }

  @Post('debit/:clientId')
  async debitClient(@Param('clientId') clientId: number, @Body() operationDto: FinancialOperationDto): Promise<void> {
    await this.financesService.debitClient(clientId, operationDto.amount);
  }
}
