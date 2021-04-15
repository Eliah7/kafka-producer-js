import { Controller, Get, Inject, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Events } from './events.consts';
import { ClientProxy } from '@nestjs/microservices';
import { Services } from './services.consts';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              @Inject(Services.TEST_SERVICE) private appMicroService: ClientProxy) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/tests/event')
  async emitParams(@Param('name') name: string) {
    this.appMicroService.emit<number>(Events.TEST_EVENT, {
      "id": "1234",
      "name": `${name}`,
      "data": ""
    }).subscribe(value => {
        console.log("VALUE: " + value.toString())
      },
      error => {
        console.warn(error)
      });
  }
}
