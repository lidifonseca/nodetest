import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import PacienteDispositivoComplexidade from '../src/domain/paciente-dispositivo-complexidade.entity';
import { PacienteDispositivoComplexidadeService } from '../src/service/paciente-dispositivo-complexidade.service';

describe('PacienteDispositivoComplexidade Controller', () => {
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
      .overrideProvider(PacienteDispositivoComplexidadeService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all paciente-dispositivo-complexidades ', async () => {
    const getEntities: PacienteDispositivoComplexidade[] = (
      await request(app.getHttpServer())
        .get('/api/paciente-dispositivo-complexidades')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET paciente-dispositivo-complexidades by id', async () => {
    const getEntity: PacienteDispositivoComplexidade = (
      await request(app.getHttpServer())
        .get('/api/paciente-dispositivo-complexidades/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create paciente-dispositivo-complexidades', async () => {
    const createdEntity: PacienteDispositivoComplexidade = (
      await request(app.getHttpServer())
        .post('/api/paciente-dispositivo-complexidades')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update paciente-dispositivo-complexidades', async () => {
    const updatedEntity: PacienteDispositivoComplexidade = (
      await request(app.getHttpServer())
        .put('/api/paciente-dispositivo-complexidades')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE paciente-dispositivo-complexidades', async () => {
    const deletedEntity: PacienteDispositivoComplexidade = (
      await request(app.getHttpServer())
        .delete('/api/paciente-dispositivo-complexidades/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
