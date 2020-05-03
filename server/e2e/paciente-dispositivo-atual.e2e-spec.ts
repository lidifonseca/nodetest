import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import PacienteDispositivoAtual from '../src/domain/paciente-dispositivo-atual.entity';
import { PacienteDispositivoAtualService } from '../src/service/paciente-dispositivo-atual.service';

describe('PacienteDispositivoAtual Controller', () => {
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
      .overrideProvider(PacienteDispositivoAtualService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all paciente-dispositivo-atuals ', async () => {
    const getEntities: PacienteDispositivoAtual[] = (
      await request(app.getHttpServer())
        .get('/api/paciente-dispositivo-atuals')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET paciente-dispositivo-atuals by id', async () => {
    const getEntity: PacienteDispositivoAtual = (
      await request(app.getHttpServer())
        .get('/api/paciente-dispositivo-atuals/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create paciente-dispositivo-atuals', async () => {
    const createdEntity: PacienteDispositivoAtual = (
      await request(app.getHttpServer())
        .post('/api/paciente-dispositivo-atuals')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update paciente-dispositivo-atuals', async () => {
    const updatedEntity: PacienteDispositivoAtual = (
      await request(app.getHttpServer())
        .put('/api/paciente-dispositivo-atuals')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE paciente-dispositivo-atuals', async () => {
    const deletedEntity: PacienteDispositivoAtual = (
      await request(app.getHttpServer())
        .delete('/api/paciente-dispositivo-atuals/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
