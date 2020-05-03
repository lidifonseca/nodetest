import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import ControleDisparoAviso from '../src/domain/controle-disparo-aviso.entity';
import { ControleDisparoAvisoService } from '../src/service/controle-disparo-aviso.service';

describe('ControleDisparoAviso Controller', () => {
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
      .overrideProvider(ControleDisparoAvisoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all controle-disparo-avisos ', async () => {
    const getEntities: ControleDisparoAviso[] = (
      await request(app.getHttpServer())
        .get('/api/controle-disparo-avisos')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET controle-disparo-avisos by id', async () => {
    const getEntity: ControleDisparoAviso = (
      await request(app.getHttpServer())
        .get('/api/controle-disparo-avisos/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create controle-disparo-avisos', async () => {
    const createdEntity: ControleDisparoAviso = (
      await request(app.getHttpServer())
        .post('/api/controle-disparo-avisos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update controle-disparo-avisos', async () => {
    const updatedEntity: ControleDisparoAviso = (
      await request(app.getHttpServer())
        .put('/api/controle-disparo-avisos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE controle-disparo-avisos', async () => {
    const deletedEntity: ControleDisparoAviso = (
      await request(app.getHttpServer())
        .delete('/api/controle-disparo-avisos/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
