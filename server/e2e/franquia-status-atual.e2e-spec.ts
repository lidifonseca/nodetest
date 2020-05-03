import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import FranquiaStatusAtual from '../src/domain/franquia-status-atual.entity';
import { FranquiaStatusAtualService } from '../src/service/franquia-status-atual.service';

describe('FranquiaStatusAtual Controller', () => {
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
      .overrideProvider(FranquiaStatusAtualService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all franquia-status-atuals ', async () => {
    const getEntities: FranquiaStatusAtual[] = (
      await request(app.getHttpServer())
        .get('/api/franquia-status-atuals')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET franquia-status-atuals by id', async () => {
    const getEntity: FranquiaStatusAtual = (
      await request(app.getHttpServer())
        .get('/api/franquia-status-atuals/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create franquia-status-atuals', async () => {
    const createdEntity: FranquiaStatusAtual = (
      await request(app.getHttpServer())
        .post('/api/franquia-status-atuals')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update franquia-status-atuals', async () => {
    const updatedEntity: FranquiaStatusAtual = (
      await request(app.getHttpServer())
        .put('/api/franquia-status-atuals')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE franquia-status-atuals', async () => {
    const deletedEntity: FranquiaStatusAtual = (
      await request(app.getHttpServer())
        .delete('/api/franquia-status-atuals/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
