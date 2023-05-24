import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { UserId } from 'DTO/blance.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/balance/:id')
  getBalance(@Param() { id }: UserId) {
    return this.appService.getBalance(id);
  }
}
