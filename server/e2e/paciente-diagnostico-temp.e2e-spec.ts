import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import PacienteDiagnosticoTemp from '../src/domain/paciente-diagnostico-temp.entity';
import { PacienteDiagnosticoTempService } from '../src/service/paciente-diagnostico-temp.service';

describe('PacienteDiagnosticoTemp Controller', () => {
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
      .overrideProvider(PacienteDiagnosticoTempService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all paciente-diagnostico-temps ', async () => {
    const getEntities: PacienteDiagnosticoTemp[] = (
      await request(app.getHttpServer())
        .get('/api/paciente-diagnostico-temps')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET paciente-diagnostico-temps by id', async () => {
    const getEntity: PacienteDiagnosticoTemp = (
      await request(app.getHttpServer())
        .get('/api/paciente-diagnostico-temps/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create paciente-diagnostico-temps', async () => {
    const createdEntity: PacienteDiagnosticoTemp = (
      await request(app.getHttpServer())
        .post('/api/paciente-diagnostico-temps')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update paciente-diagnostico-temps', async () => {
    const updatedEntity: PacienteDiagnosticoTemp = (
      await request(app.getHttpServer())
        .put('/api/paciente-diagnostico-temps')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE paciente-diagnostico-temps', async () => {
    const deletedEntity: PacienteDiagnosticoTemp = (
      await request(app.getHttpServer())
        .delete('/api/paciente-diagnostico-temps/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
