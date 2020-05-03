import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import ProntuarioTipoManifestacao from '../src/domain/prontuario-tipo-manifestacao.entity';
import { ProntuarioTipoManifestacaoService } from '../src/service/prontuario-tipo-manifestacao.service';

describe('ProntuarioTipoManifestacao Controller', () => {
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
      .overrideProvider(ProntuarioTipoManifestacaoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all prontuario-tipo-manifestacaos ', async () => {
    const getEntities: ProntuarioTipoManifestacao[] = (
      await request(app.getHttpServer())
        .get('/api/prontuario-tipo-manifestacaos')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET prontuario-tipo-manifestacaos by id', async () => {
    const getEntity: ProntuarioTipoManifestacao = (
      await request(app.getHttpServer())
        .get('/api/prontuario-tipo-manifestacaos/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create prontuario-tipo-manifestacaos', async () => {
    const createdEntity: ProntuarioTipoManifestacao = (
      await request(app.getHttpServer())
        .post('/api/prontuario-tipo-manifestacaos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update prontuario-tipo-manifestacaos', async () => {
    const updatedEntity: ProntuarioTipoManifestacao = (
      await request(app.getHttpServer())
        .put('/api/prontuario-tipo-manifestacaos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE prontuario-tipo-manifestacaos', async () => {
    const deletedEntity: ProntuarioTipoManifestacao = (
      await request(app.getHttpServer())
        .delete('/api/prontuario-tipo-manifestacaos/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
