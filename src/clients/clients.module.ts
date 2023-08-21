import { Module } from '@nestjs/common';
import { ClientsController } from './controllers/clients.controller';
import { ClientsService } from './services/clients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from 'src/clients/entities/client.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'docker-postgres',
      port: 5432,
      username: 'root',
      password: 'password',
      database: 'bcbdb',
      entities: [ ClientEntity ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([ ClientEntity ]),
  ],
  controllers: [ ClientsController ],
  providers: [ ClientsService ],
  exports: [ ClientsService ],
})
export class ClientsModule { }
