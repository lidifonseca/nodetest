import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import PacienteComplexidadeAtual from '../src/domain/paciente-complexidade-atual.entity';
import { PacienteComplexidadeAtualService } from '../src/service/paciente-complexidade-atual.service';

describe('PacienteComplexidadeAtual Controller', () => {
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
      .overrideProvider(PacienteComplexidadeAtualService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all paciente-complexidade-atuals ', async () => {
    const getEntities: PacienteComplexidadeAtual[] = (
      await request(app.getHttpServer())
        .get('/api/paciente-complexidade-atuals')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET paciente-complexidade-atuals by id', async () => {
    const getEntity: PacienteComplexidadeAtual = (
      await request(app.getHttpServer())
        .get('/api/paciente-complexidade-atuals/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create paciente-complexidade-atuals', async () => {
    const createdEntity: PacienteComplexidadeAtual = (
      await request(app.getHttpServer())
        .post('/api/paciente-complexidade-atuals')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update paciente-complexidade-atuals', async () => {
    const updatedEntity: PacienteComplexidadeAtual = (
      await request(app.getHttpServer())
        .put('/api/paciente-complexidade-atuals')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE paciente-complexidade-atuals', async () => {
    const deletedEntity: PacienteComplexidadeAtual = (
      await request(app.getHttpServer())
        .delete('/api/paciente-complexidade-atuals/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
