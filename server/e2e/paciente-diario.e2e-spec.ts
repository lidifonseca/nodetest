import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import PacienteDiario from '../src/domain/paciente-diario.entity';
import { PacienteDiarioService } from '../src/service/paciente-diario.service';

describe('PacienteDiario Controller', () => {
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
      .overrideProvider(PacienteDiarioService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all paciente-diarios ', async () => {
    const getEntities: PacienteDiario[] = (
      await request(app.getHttpServer())
        .get('/api/paciente-diarios')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET paciente-diarios by id', async () => {
    const getEntity: PacienteDiario = (
      await request(app.getHttpServer())
        .get('/api/paciente-diarios/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create paciente-diarios', async () => {
    const createdEntity: PacienteDiario = (
      await request(app.getHttpServer())
        .post('/api/paciente-diarios')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update paciente-diarios', async () => {
    const updatedEntity: PacienteDiario = (
      await request(app.getHttpServer())
        .put('/api/paciente-diarios')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE paciente-diarios', async () => {
    const deletedEntity: PacienteDiario = (
      await request(app.getHttpServer())
        .delete('/api/paciente-diarios/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
