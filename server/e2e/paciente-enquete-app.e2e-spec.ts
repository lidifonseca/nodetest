import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import PacienteEnqueteApp from '../src/domain/paciente-enquete-app.entity';
import { PacienteEnqueteAppService } from '../src/service/paciente-enquete-app.service';

describe('PacienteEnqueteApp Controller', () => {
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
      .overrideProvider(PacienteEnqueteAppService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all paciente-enquete-apps ', async () => {
    const getEntities: PacienteEnqueteApp[] = (
      await request(app.getHttpServer())
        .get('/api/paciente-enquete-apps')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET paciente-enquete-apps by id', async () => {
    const getEntity: PacienteEnqueteApp = (
      await request(app.getHttpServer())
        .get('/api/paciente-enquete-apps/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create paciente-enquete-apps', async () => {
    const createdEntity: PacienteEnqueteApp = (
      await request(app.getHttpServer())
        .post('/api/paciente-enquete-apps')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update paciente-enquete-apps', async () => {
    const updatedEntity: PacienteEnqueteApp = (
      await request(app.getHttpServer())
        .put('/api/paciente-enquete-apps')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE paciente-enquete-apps', async () => {
    const deletedEntity: PacienteEnqueteApp = (
      await request(app.getHttpServer())
        .delete('/api/paciente-enquete-apps/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
