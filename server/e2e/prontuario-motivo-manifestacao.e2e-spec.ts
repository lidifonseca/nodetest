import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import ProntuarioMotivoManifestacao from '../src/domain/prontuario-motivo-manifestacao.entity';
import { ProntuarioMotivoManifestacaoService } from '../src/service/prontuario-motivo-manifestacao.service';

describe('ProntuarioMotivoManifestacao Controller', () => {
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
      .overrideProvider(ProntuarioMotivoManifestacaoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all prontuario-motivo-manifestacaos ', async () => {
    const getEntities: ProntuarioMotivoManifestacao[] = (
      await request(app.getHttpServer())
        .get('/api/prontuario-motivo-manifestacaos')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET prontuario-motivo-manifestacaos by id', async () => {
    const getEntity: ProntuarioMotivoManifestacao = (
      await request(app.getHttpServer())
        .get('/api/prontuario-motivo-manifestacaos/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create prontuario-motivo-manifestacaos', async () => {
    const createdEntity: ProntuarioMotivoManifestacao = (
      await request(app.getHttpServer())
        .post('/api/prontuario-motivo-manifestacaos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update prontuario-motivo-manifestacaos', async () => {
    const updatedEntity: ProntuarioMotivoManifestacao = (
      await request(app.getHttpServer())
        .put('/api/prontuario-motivo-manifestacaos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE prontuario-motivo-manifestacaos', async () => {
    const deletedEntity: ProntuarioMotivoManifestacao = (
      await request(app.getHttpServer())
        .delete('/api/prontuario-motivo-manifestacaos/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
