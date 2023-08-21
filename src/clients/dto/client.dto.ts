export class CreateClientDto {
  name: string;
  email: string;
  phoneNumber: string;
  cpf: string;
  cnpj: string;
  companyName: string;
  planType: 'prepaid' | 'postpaid';
}

export class UpdateClientDto {
  name?: string;
  email?: string;
  phoneNumber?: string;
  cpf?: string;
  cnpj?: string;
  companyName?: string;
  planType?: 'prepaid' | 'postpaid';
}

export class ClientDto {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  cpf: string;
  cnpj: string;
  companyName: string;
  planType: 'prepaid' | 'postpaid';
  credits?: number;
  maxLimit?: number;
}