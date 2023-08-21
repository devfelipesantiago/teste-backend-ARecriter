import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientsService } from './clients.service';
import { ClientEntity } from '../entities/client.entity';

describe('ClientsService', () => {
  let clientsService: ClientsService;
  let clientRepository: Repository<ClientEntity>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ClientsService,
        {
          provide: getRepositoryToken(ClientEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    clientsService = moduleRef.get<ClientsService>(ClientsService);
    clientRepository = moduleRef.get<Repository<ClientEntity>>(
      getRepositoryToken(ClientEntity),
    );
  });

  describe('createClient', () => {
    it('should create and save a new client', async () => {
      const clientData = new ClientEntity();
      clientData.name = 'John Doe';
      clientData.email = 'john.doe@example.com';
      clientData.phoneNumber = '+5511999999999';
      clientData.cpf = '12345678909';
      clientData.cnpj = '12345678901234';
      clientData.companyName = 'Acme Inc.';
      clientData.planType = 'prepaid';

      jest.spyOn(clientRepository, 'create').mockReturnValue(clientData);
      jest.spyOn(clientRepository, 'save').mockResolvedValue(clientData);

      const result = await clientsService.createClient(clientData);

      expect(result).toEqual(clientData);
      expect(clientRepository.create).toHaveBeenCalledWith(clientData);
      expect(clientRepository.save).toHaveBeenCalledWith(clientData);
    });
  });

  describe('getClientById', () => {
    it('should return the client with the given id', async () => {
      const clientId = 1;
      const clientData = new ClientEntity();
      clientData.id = clientId;
      clientData.name = 'John Doe';
      clientData.email = 'john.doe@example.com';
      clientData.phoneNumber = '+5511999999999';
      clientData.cpf = '12345678909';
      clientData.cnpj = '12345678901234';
      clientData.companyName = 'Acme Inc.';
      clientData.planType = 'prepaid';

      jest.spyOn(clientRepository, 'findOne').mockResolvedValue(clientData);

      const result = await clientsService.getClientById(clientId);

      expect(result).toEqual(clientData);
      expect(clientRepository.findOne).toHaveBeenCalledWith({ where: { id: clientId } });
    });
  });

  describe('updateClient', () => {
    it('should update the client with the given id and data', async () => {
      const clientId = 1;
      const updatedData = {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        phoneNumber: '+5511888888888',
        cpf: '98765432109',
        cnpj: '98765432109876',
        companyName: 'Globex Corp.',
        planType: 'postpaid' as 'prepaid' | 'postpaid',
      };

      const updatedClient = new ClientEntity();
      updatedClient.id = clientId;
      updatedClient.name = updatedData.name;
      updatedClient.email = updatedData.email;
      updatedClient.phoneNumber = updatedData.phoneNumber;
      updatedClient.cpf = updatedData.cpf;
      updatedClient.cnpj = updatedData.cnpj;
      updatedClient.companyName = updatedData.companyName;
      if (updatedData.planType === 'prepaid' || updatedData.planType === 'postpaid') {
        updatedClient.planType = updatedData.planType;
      }

      jest.spyOn(clientRepository, 'update').mockResolvedValue(undefined);
      jest.spyOn(clientRepository, 'findOne').mockResolvedValue(updatedClient);

      if (updatedData.planType === 'prepaid' || updatedData.planType === 'postpaid') {
        const result = await clientsService.updateClient(clientId, updatedData);

        expect(result).toEqual(updatedClient);
        expect(clientRepository.update).toHaveBeenCalledWith(clientId, updatedData);
        expect(clientRepository.findOne).toHaveBeenCalledWith({ where: { id: clientId } });
      }
    });
  });

  describe('deleteClient', () => {
    it('should delete the client with the given id', async () => {
      const clientId = 1;

      jest.spyOn(clientRepository, 'delete').mockResolvedValue(undefined);

      await clientsService.deleteClient(clientId);

      expect(clientRepository.delete).toHaveBeenCalledWith(clientId);
    });
  });
});
