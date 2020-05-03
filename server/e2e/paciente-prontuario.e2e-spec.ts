import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import PacienteProntuario from '../src/domain/paciente-prontuario.entity';
import { PacienteProntuarioService } from '../src/service/paciente-prontuario.service';

describe('PacienteProntuario Controller', () => {
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
      .overrideProvider(PacienteProntuarioService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all paciente-prontuarios ', async () => {
    const getEntities: PacienteProntuario[] = (
      await request(app.getHttpServer())
        .get('/api/paciente-prontuarios')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET paciente-prontuarios by id', async () => {
    const getEntity: PacienteProntuario = (
      await request(app.getHttpServer())
        .get('/api/paciente-prontuarios/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create paciente-prontuarios', async () => {
    const createdEntity: PacienteProntuario = (
      await request(app.getHttpServer())
        .post('/api/paciente-prontuarios')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update paciente-prontuarios', async () => {
    const updatedEntity: PacienteProntuario = (
      await request(app.getHttpServer())
        .put('/api/paciente-prontuarios')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE paciente-prontuarios', async () => {
    const deletedEntity: PacienteProntuario = (
      await request(app.getHttpServer())
        .delete('/api/paciente-prontuarios/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
