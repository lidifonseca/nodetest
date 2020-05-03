import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import PushnotificationEnvios from '../src/domain/pushnotification-envios.entity';
import { PushnotificationEnviosService } from '../src/service/pushnotification-envios.service';

describe('PushnotificationEnvios Controller', () => {
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
      .overrideProvider(PushnotificationEnviosService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all pushnotification-envios ', async () => {
    const getEntities: PushnotificationEnvios[] = (
      await request(app.getHttpServer())
        .get('/api/pushnotification-envios')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET pushnotification-envios by id', async () => {
    const getEntity: PushnotificationEnvios = (
      await request(app.getHttpServer())
        .get('/api/pushnotification-envios/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create pushnotification-envios', async () => {
    const createdEntity: PushnotificationEnvios = (
      await request(app.getHttpServer())
        .post('/api/pushnotification-envios')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update pushnotification-envios', async () => {
    const updatedEntity: PushnotificationEnvios = (
      await request(app.getHttpServer())
        .put('/api/pushnotification-envios')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE pushnotification-envios', async () => {
    const deletedEntity: PushnotificationEnvios = (
      await request(app.getHttpServer())
        .delete('/api/pushnotification-envios/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
