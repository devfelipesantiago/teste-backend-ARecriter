import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FinancialEntity } from '../entities/financial.entities';
import { ClientEntity } from 'src/clients/entities/client.entity';

@Injectable()
export class FinancesService {
  constructor(
    @InjectRepository(FinancialEntity)
    private readonly financialOperationRepository: Repository<FinancialEntity>,
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) { }

  async debitClient(clientId: number, amount: number): Promise<void> {
    const client = await this.clientRepository.findOne({ where: { id: clientId } });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    if (client.credits < amount) {
      throw new Error('Insufficient credits');
    }

    client.credits -= amount;

    await this.clientRepository.save(client);

    const operation = this.financialOperationRepository.create({
      client,
      type: 'debit',
      amount,
      timestamp: new Date(),
    });

    await this.financialOperationRepository.save(operation);
  }
}
