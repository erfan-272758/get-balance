import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { AppService } from 'src/app.service';

describe('Balance', () => {
  let app: INestApplication;
  const balanceService = { getBalance: (id: number) => ({ balance: 500 }) };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AppService)
      .useValue(balanceService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`GET /balance/:user_id uer balances`, () => {
    return request(app.getHttpServer())
      .get('/balance/12')
      .expect(200)
      .expect({
        data: balanceService.getBalance(12),
      });
  });
  it(`GET /balance/:user_id wrong id`, () => {
    return request(app.getHttpServer()).get('/balance/12a').expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
