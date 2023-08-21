import { Test } from '@nestjs/testing';
import { ClientsController } from './clients.controller';
import { ClientsService } from '../services/clients.service';
import { CreateClientDto, UpdateClientDto, ClientDto } from '../dto/client.dto';
import { ClientEntity } from '../entities/client.entity';

describe('ClientsController', () => {
  let clientsController: ClientsController;
  let clientsService: ClientsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ ClientsController ],
      providers: [
        {
          provide: ClientsService,
          useValue: {
            createClient: jest.fn(),
            getClientById: jest.fn(),
            updateClient: jest.fn(),
            deleteClient: jest.fn(),
          },
        },
      ],
    }).compile();

    clientsController = moduleRef.get<ClientsController>(ClientsController);
    clientsService = moduleRef.get<ClientsService>(ClientsService);
  });

  describe('createClient', () => {
    it('should call the createClient method of the clients service', async () => {
      const createClientDto: CreateClientDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: '+5511999999999',
        cpf: '12345678909',
        cnpj: '12345678901234',
        companyName: 'Acme Inc.',
        planType: 'prepaid',
      };
      const newClient = new ClientEntity();
      newClient.name = createClientDto.name;
      newClient.email = createClientDto.email;
      newClient.phoneNumber = createClientDto.phoneNumber;
      newClient.cpf = createClientDto.cpf;
      newClient.cnpj = createClientDto.cnpj;
      newClient.companyName = createClientDto.companyName;
      newClient.planType = createClientDto.planType;

      await clientsController.createClient(createClientDto);

      expect(clientsService.createClient).toHaveBeenCalledWith(newClient);
    });
  });

  describe('getClient', () => {
    it('should call the getClientById method of the clients service', async () => {
      const id = 1;

      await clientsController.getClient(id);

      expect(clientsService.getClientById).toHaveBeenCalledWith(id);
    });
  });

  describe('updateClient', () => {
    it('should call the updateClient method of the clients service', async () => {
      const id = 1;
      const updateClientDto: UpdateClientDto = {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        phoneNumber: '+5511888888888',
        cpf: '98765432109',
        cnpj: '98765432109876',
        companyName: 'Globex Corp.',
        planType: 'postpaid',
      };

      await clientsController.updateClient(id, updateClientDto);

      expect(clientsService.updateClient).toHaveBeenCalledWith(id, updateClientDto);
    });
  });

  describe('deleteClient', () => {
    it('should call the deleteClient method of the clients service', async () => {
      const id = 1;

      await clientsController.deleteClient(id);

      expect(clientsService.deleteClient).toHaveBeenCalledWith(id);
    });
  });
});
