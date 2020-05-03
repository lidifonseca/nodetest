import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import ProfissionalDispositivoAtual from '../src/domain/profissional-dispositivo-atual.entity';
import { ProfissionalDispositivoAtualService } from '../src/service/profissional-dispositivo-atual.service';

describe('ProfissionalDispositivoAtual Controller', () => {
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
      .overrideProvider(ProfissionalDispositivoAtualService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all profissional-dispositivo-atuals ', async () => {
    const getEntities: ProfissionalDispositivoAtual[] = (
      await request(app.getHttpServer())
        .get('/api/profissional-dispositivo-atuals')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET profissional-dispositivo-atuals by id', async () => {
    const getEntity: ProfissionalDispositivoAtual = (
      await request(app.getHttpServer())
        .get('/api/profissional-dispositivo-atuals/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create profissional-dispositivo-atuals', async () => {
    const createdEntity: ProfissionalDispositivoAtual = (
      await request(app.getHttpServer())
        .post('/api/profissional-dispositivo-atuals')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update profissional-dispositivo-atuals', async () => {
    const updatedEntity: ProfissionalDispositivoAtual = (
      await request(app.getHttpServer())
        .put('/api/profissional-dispositivo-atuals')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE profissional-dispositivo-atuals', async () => {
    const deletedEntity: ProfissionalDispositivoAtual = (
      await request(app.getHttpServer())
        .delete('/api/profissional-dispositivo-atuals/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
