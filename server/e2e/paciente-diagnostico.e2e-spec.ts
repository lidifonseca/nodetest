import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import PacienteDiagnostico from '../src/domain/paciente-diagnostico.entity';
import { PacienteDiagnosticoService } from '../src/service/paciente-diagnostico.service';

describe('PacienteDiagnostico Controller', () => {
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
      .overrideProvider(PacienteDiagnosticoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all paciente-diagnosticos ', async () => {
    const getEntities: PacienteDiagnostico[] = (
      await request(app.getHttpServer())
        .get('/api/paciente-diagnosticos')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET paciente-diagnosticos by id', async () => {
    const getEntity: PacienteDiagnostico = (
      await request(app.getHttpServer())
        .get('/api/paciente-diagnosticos/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create paciente-diagnosticos', async () => {
    const createdEntity: PacienteDiagnostico = (
      await request(app.getHttpServer())
        .post('/api/paciente-diagnosticos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update paciente-diagnosticos', async () => {
    const updatedEntity: PacienteDiagnostico = (
      await request(app.getHttpServer())
        .put('/api/paciente-diagnosticos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE paciente-diagnosticos', async () => {
    const deletedEntity: PacienteDiagnostico = (
      await request(app.getHttpServer())
        .delete('/api/paciente-diagnosticos/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
