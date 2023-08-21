import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialEntity } from './entities/financial.entities';
import { FinancesService } from './services/finances.service';
import { FinancesController } from './controllers/finances.controller';
import { ClientEntity } from 'src/clients/entities/client.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ FinancialEntity, ClientEntity ]) ],
  providers: [ FinancesService ],
  controllers: [ FinancesController ],
})
export class FinancesModule { }
