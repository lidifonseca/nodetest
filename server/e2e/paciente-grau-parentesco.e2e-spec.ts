import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import PacienteGrauParentesco from '../src/domain/paciente-grau-parentesco.entity';
import { PacienteGrauParentescoService } from '../src/service/paciente-grau-parentesco.service';

describe('PacienteGrauParentesco Controller', () => {
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
      .overrideProvider(PacienteGrauParentescoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all paciente-grau-parentescos ', async () => {
    const getEntities: PacienteGrauParentesco[] = (
      await request(app.getHttpServer())
        .get('/api/paciente-grau-parentescos')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET paciente-grau-parentescos by id', async () => {
    const getEntity: PacienteGrauParentesco = (
      await request(app.getHttpServer())
        .get('/api/paciente-grau-parentescos/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create paciente-grau-parentescos', async () => {
    const createdEntity: PacienteGrauParentesco = (
      await request(app.getHttpServer())
        .post('/api/paciente-grau-parentescos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update paciente-grau-parentescos', async () => {
    const updatedEntity: PacienteGrauParentesco = (
      await request(app.getHttpServer())
        .put('/api/paciente-grau-parentescos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE paciente-grau-parentescos', async () => {
    const deletedEntity: PacienteGrauParentesco = (
      await request(app.getHttpServer())
        .delete('/api/paciente-grau-parentescos/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
