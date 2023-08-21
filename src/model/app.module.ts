import { Module } from '@nestjs/common';
import { ClientsModule } from '../clients/clients.module';
import { MessagesModule } from '../messages/messages.module';
import { FinancesModule } from '../finances/finances.module';

@Module({
  imports: [ ClientsModule, MessagesModule, FinancesModule ],
})
export class AppModule { }
