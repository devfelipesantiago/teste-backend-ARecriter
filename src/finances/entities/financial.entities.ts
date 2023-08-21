import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ClientEntity } from 'src/clients/entities/client.entity';

@Entity()
export class FinancialEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ClientEntity)
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;

  @Column()
  type: 'credit' | 'debit';

  @Column()
  amount: number;

  @Column()
  timestamp: Date;
}
