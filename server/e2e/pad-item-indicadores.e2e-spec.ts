import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import PadItemIndicadores from '../src/domain/pad-item-indicadores.entity';
import { PadItemIndicadoresService } from '../src/service/pad-item-indicadores.service';

describe('PadItemIndicadores Controller', () => {
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
      .overrideProvider(PadItemIndicadoresService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all pad-item-indicadores ', async () => {
    const getEntities: PadItemIndicadores[] = (
      await request(app.getHttpServer())
        .get('/api/pad-item-indicadores')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET pad-item-indicadores by id', async () => {
    const getEntity: PadItemIndicadores = (
      await request(app.getHttpServer())
        .get('/api/pad-item-indicadores/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create pad-item-indicadores', async () => {
    const createdEntity: PadItemIndicadores = (
      await request(app.getHttpServer())
        .post('/api/pad-item-indicadores')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update pad-item-indicadores', async () => {
    const updatedEntity: PadItemIndicadores = (
      await request(app.getHttpServer())
        .put('/api/pad-item-indicadores')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE pad-item-indicadores', async () => {
    const deletedEntity: PadItemIndicadores = (
      await request(app.getHttpServer())
        .delete('/api/pad-item-indicadores/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
