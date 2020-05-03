import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import PacienteCaracteristicaAtual from '../src/domain/paciente-caracteristica-atual.entity';
import { PacienteCaracteristicaAtualService } from '../src/service/paciente-caracteristica-atual.service';

describe('PacienteCaracteristicaAtual Controller', () => {
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
      .overrideProvider(PacienteCaracteristicaAtualService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all paciente-caracteristica-atuals ', async () => {
    const getEntities: PacienteCaracteristicaAtual[] = (
      await request(app.getHttpServer())
        .get('/api/paciente-caracteristica-atuals')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET paciente-caracteristica-atuals by id', async () => {
    const getEntity: PacienteCaracteristicaAtual = (
      await request(app.getHttpServer())
        .get('/api/paciente-caracteristica-atuals/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create paciente-caracteristica-atuals', async () => {
    const createdEntity: PacienteCaracteristicaAtual = (
      await request(app.getHttpServer())
        .post('/api/paciente-caracteristica-atuals')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update paciente-caracteristica-atuals', async () => {
    const updatedEntity: PacienteCaracteristicaAtual = (
      await request(app.getHttpServer())
        .put('/api/paciente-caracteristica-atuals')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE paciente-caracteristica-atuals', async () => {
    const deletedEntity: PacienteCaracteristicaAtual = (
      await request(app.getHttpServer())
        .delete('/api/paciente-caracteristica-atuals/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
