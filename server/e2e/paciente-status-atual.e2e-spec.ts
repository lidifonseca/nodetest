import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import PacienteStatusAtual from '../src/domain/paciente-status-atual.entity';
import { PacienteStatusAtualService } from '../src/service/paciente-status-atual.service';

describe('PacienteStatusAtual Controller', () => {
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
      .overrideProvider(PacienteStatusAtualService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all paciente-status-atuals ', async () => {
    const getEntities: PacienteStatusAtual[] = (
      await request(app.getHttpServer())
        .get('/api/paciente-status-atuals')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET paciente-status-atuals by id', async () => {
    const getEntity: PacienteStatusAtual = (
      await request(app.getHttpServer())
        .get('/api/paciente-status-atuals/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create paciente-status-atuals', async () => {
    const createdEntity: PacienteStatusAtual = (
      await request(app.getHttpServer())
        .post('/api/paciente-status-atuals')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update paciente-status-atuals', async () => {
    const updatedEntity: PacienteStatusAtual = (
      await request(app.getHttpServer())
        .put('/api/paciente-status-atuals')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE paciente-status-atuals', async () => {
    const deletedEntity: PacienteStatusAtual = (
      await request(app.getHttpServer())
        .delete('/api/paciente-status-atuals/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
