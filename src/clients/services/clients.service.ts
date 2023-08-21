import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from '../entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) { }

  async createClient(clientData: ClientEntity): Promise<ClientEntity> {
    const newClient = this.clientRepository.create(clientData);
    return await this.clientRepository.save(newClient);
  }

  async getClientById(clientId: number): Promise<ClientEntity | undefined> {
    return await this.clientRepository.findOne({ where: { id: clientId } });
  }

  async updateClient(clientId: number, updatedData: Partial<ClientEntity>): Promise<ClientEntity | undefined> {
    await this.clientRepository.update(clientId, updatedData);
    return await this.clientRepository.findOne({ where: { id: clientId } });
  }

  async deleteClient(id: number): Promise<void> {
    await this.clientRepository.delete(id);
  }
}
