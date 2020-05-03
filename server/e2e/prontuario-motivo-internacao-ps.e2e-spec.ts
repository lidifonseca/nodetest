import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import ProntuarioMotivoInternacaoPs from '../src/domain/prontuario-motivo-internacao-ps.entity';
import { ProntuarioMotivoInternacaoPsService } from '../src/service/prontuario-motivo-internacao-ps.service';

describe('ProntuarioMotivoInternacaoPs Controller', () => {
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
      .overrideProvider(ProntuarioMotivoInternacaoPsService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all prontuario-motivo-internacao-ps ', async () => {
    const getEntities: ProntuarioMotivoInternacaoPs[] = (
      await request(app.getHttpServer())
        .get('/api/prontuario-motivo-internacao-ps')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET prontuario-motivo-internacao-ps by id', async () => {
    const getEntity: ProntuarioMotivoInternacaoPs = (
      await request(app.getHttpServer())
        .get('/api/prontuario-motivo-internacao-ps/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create prontuario-motivo-internacao-ps', async () => {
    const createdEntity: ProntuarioMotivoInternacaoPs = (
      await request(app.getHttpServer())
        .post('/api/prontuario-motivo-internacao-ps')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update prontuario-motivo-internacao-ps', async () => {
    const updatedEntity: ProntuarioMotivoInternacaoPs = (
      await request(app.getHttpServer())
        .put('/api/prontuario-motivo-internacao-ps')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE prontuario-motivo-internacao-ps', async () => {
    const deletedEntity: ProntuarioMotivoInternacaoPs = (
      await request(app.getHttpServer())
        .delete('/api/prontuario-motivo-internacao-ps/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
