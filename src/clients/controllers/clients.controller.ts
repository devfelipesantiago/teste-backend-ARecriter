import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ClientsService } from '../services/clients.service';
import { CreateClientDto, UpdateClientDto, ClientDto } from '../dto/client.dto';
import { ClientEntity } from '../entities/client.entity';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) { }

  @Post()
  async createClient(@Body() createClientDto: CreateClientDto): Promise<ClientDto> {
    const newClient = new ClientEntity(); // Criar uma nova instância da entidade
    newClient.name = createClientDto.name;
    newClient.email = createClientDto.email;
    newClient.phoneNumber = createClientDto.phoneNumber;
    newClient.cpf = createClientDto.cpf;
    newClient.cnpj = createClientDto.cnpj;
    newClient.companyName = createClientDto.companyName;
    newClient.planType = createClientDto.planType;

    return this.clientsService.createClient(newClient);
  }

  @Get(':id')
  async getClient(@Param('id') id: number): Promise<ClientDto | undefined> {
    return this.clientsService.getClientById(id);
  }

  @Put(':id')
  async updateClient(@Param('id') id: number, @Body() updateClientDto: UpdateClientDto): Promise<ClientDto | undefined> {
    return this.clientsService.updateClient(id, updateClientDto);
  }

  @Delete(':id')
  async deleteClient(@Param('id') id: number): Promise<void> {
    await this.clientsService.deleteClient(id);
  }
}
