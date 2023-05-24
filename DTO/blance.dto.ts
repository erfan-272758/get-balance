import { Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';
export class UserId {
  @Expose()
  @IsNumber()
  id: number;
}
