import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  cpf: string;

  @Column()
  cnpj: string;

  @Column()
  companyName: string;

  @Column()
  planType: 'prepaid' | 'postpaid';

  @Column({ nullable: true })
  credits?: number;

  @Column({ nullable: true })
  maxLimit?: number;
}
