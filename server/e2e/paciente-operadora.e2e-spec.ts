import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import PacienteOperadora from '../src/domain/paciente-operadora.entity';
import { PacienteOperadoraService } from '../src/service/paciente-operadora.service';

describe('PacienteOperadora Controller', () => {
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
      .overrideProvider(PacienteOperadoraService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all paciente-operadoras ', async () => {
    const getEntities: PacienteOperadora[] = (
      await request(app.getHttpServer())
        .get('/api/paciente-operadoras')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET paciente-operadoras by id', async () => {
    const getEntity: PacienteOperadora = (
      await request(app.getHttpServer())
        .get('/api/paciente-operadoras/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create paciente-operadoras', async () => {
    const createdEntity: PacienteOperadora = (
      await request(app.getHttpServer())
        .post('/api/paciente-operadoras')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update paciente-operadoras', async () => {
    const updatedEntity: PacienteOperadora = (
      await request(app.getHttpServer())
        .put('/api/paciente-operadoras')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE paciente-operadoras', async () => {
    const deletedEntity: PacienteOperadora = (
      await request(app.getHttpServer())
        .delete('/api/paciente-operadoras/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
