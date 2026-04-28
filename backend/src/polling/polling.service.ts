import { Injectable } from '@nestjs/common';
import { CreatePollingDto } from './dto/create-polling.dto';
import { UpdatePollingDto } from './dto/update-polling.dto';

@Injectable()
export class PollingService {
  create(createPollingDto: CreatePollingDto) {
    return 'This action adds a new polling';
  }

  findAll() {
    return `This action returns all polling`;
  }

  findOne(id: number) {
    return `This action returns a #${id} polling`;
  }

  update(id: number, updatePollingDto: UpdatePollingDto) {
    return `This action updates a #${id} polling`;
  }

  remove(id: number) {
    return `This action removes a #${id} polling`;
  }
}
