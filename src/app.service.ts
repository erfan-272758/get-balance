import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Balance } from 'Entity/balance.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Balance) private balanceRepo: Repository<Balance>,
  ) {}
  async getBalance(id: number) {
    const b = await this.balanceRepo.findOne({ where: { user_id: id } });
    if (!b) throw new NotFoundException();
    return { balance: b.balance };
  }
}
