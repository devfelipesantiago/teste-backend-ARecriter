import { Module } from '@nestjs/common';
import { ClientsModule } from '../clients/clients.module';
import { FinancesModule } from '../finances/finances.module';

@Module({
  imports: [ ClientsModule, FinancesModule ],
})
export class AppModule { }
