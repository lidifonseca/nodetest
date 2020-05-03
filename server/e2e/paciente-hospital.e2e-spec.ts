import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import PacienteHospital from '../src/domain/paciente-hospital.entity';
import { PacienteHospitalService } from '../src/service/paciente-hospital.service';

describe('PacienteHospital Controller', () => {
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
      .overrideProvider(PacienteHospitalService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all paciente-hospitals ', async () => {
    const getEntities: PacienteHospital[] = (
      await request(app.getHttpServer())
        .get('/api/paciente-hospitals')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET paciente-hospitals by id', async () => {
    const getEntity: PacienteHospital = (
      await request(app.getHttpServer())
        .get('/api/paciente-hospitals/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create paciente-hospitals', async () => {
    const createdEntity: PacienteHospital = (
      await request(app.getHttpServer())
        .post('/api/paciente-hospitals')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update paciente-hospitals', async () => {
    const updatedEntity: PacienteHospital = (
      await request(app.getHttpServer())
        .put('/api/paciente-hospitals')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE paciente-hospitals', async () => {
    const deletedEntity: PacienteHospital = (
      await request(app.getHttpServer())
        .delete('/api/paciente-hospitals/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
