import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import PacienteMotivoInternacao from '../src/domain/paciente-motivo-internacao.entity';
import { PacienteMotivoInternacaoService } from '../src/service/paciente-motivo-internacao.service';

describe('PacienteMotivoInternacao Controller', () => {
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
      .overrideProvider(PacienteMotivoInternacaoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all paciente-motivo-internacaos ', async () => {
    const getEntities: PacienteMotivoInternacao[] = (
      await request(app.getHttpServer())
        .get('/api/paciente-motivo-internacaos')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET paciente-motivo-internacaos by id', async () => {
    const getEntity: PacienteMotivoInternacao = (
      await request(app.getHttpServer())
        .get('/api/paciente-motivo-internacaos/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create paciente-motivo-internacaos', async () => {
    const createdEntity: PacienteMotivoInternacao = (
      await request(app.getHttpServer())
        .post('/api/paciente-motivo-internacaos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update paciente-motivo-internacaos', async () => {
    const updatedEntity: PacienteMotivoInternacao = (
      await request(app.getHttpServer())
        .put('/api/paciente-motivo-internacaos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE paciente-motivo-internacaos', async () => {
    const deletedEntity: PacienteMotivoInternacao = (
      await request(app.getHttpServer())
        .delete('/api/paciente-motivo-internacaos/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
