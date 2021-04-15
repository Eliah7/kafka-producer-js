import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Events } from './events.consts';
import { Services } from './services.consts';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
    {
      name: Services.TEST_SERVICE,
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'app-consumers',
        },
      },
    },
  ]),
  ],
  controllers: [AppController],
  providers: [AppService, Events, Services],
})
export class AppModule {}
