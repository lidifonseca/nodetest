import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import PadItemSorteioFeito from '../src/domain/pad-item-sorteio-feito.entity';
import { PadItemSorteioFeitoService } from '../src/service/pad-item-sorteio-feito.service';

describe('PadItemSorteioFeito Controller', () => {
  let app: INestApplication;

  const authGuardMock = { canActivate: (): any => true };
  const rolesGuardMock = { canActivate: (): any => true };
  const entityMock: any = {
    id: 'entityId'
  };

  const serviceMock = {
    findById: (): any => entityMock,
    findAndCount: (): any => [entityMock, 0],
    save: (): any => entityMock,
    update: (): any => entityMock,
    delete: (): any => entityMock
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .overrideGuard(RolesGuard)
      .useValue(rolesGuardMock)
      .overrideProvider(PadItemSorteioFeitoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all pad-item-sorteio-feitos ', async () => {
    const getEntities: PadItemSorteioFeito[] = (
      await request(app.getHttpServer())
        .get('/api/pad-item-sorteio-feitos')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET pad-item-sorteio-feitos by id', async () => {
    const getEntity: PadItemSorteioFeito = (
      await request(app.getHttpServer())
        .get('/api/pad-item-sorteio-feitos/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create pad-item-sorteio-feitos', async () => {
    const createdEntity: PadItemSorteioFeito = (
      await request(app.getHttpServer())
        .post('/api/pad-item-sorteio-feitos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update pad-item-sorteio-feitos', async () => {
    const updatedEntity: PadItemSorteioFeito = (
      await request(app.getHttpServer())
        .put('/api/pad-item-sorteio-feitos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE pad-item-sorteio-feitos', async () => {
    const deletedEntity: PadItemSorteioFeito = (
      await request(app.getHttpServer())
        .delete('/api/pad-item-sorteio-feitos/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
