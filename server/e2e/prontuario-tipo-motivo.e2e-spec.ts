import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import ProntuarioTipoMotivo from '../src/domain/prontuario-tipo-motivo.entity';
import { ProntuarioTipoMotivoService } from '../src/service/prontuario-tipo-motivo.service';

describe('ProntuarioTipoMotivo Controller', () => {
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
      .overrideProvider(ProntuarioTipoMotivoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all prontuario-tipo-motivos ', async () => {
    const getEntities: ProntuarioTipoMotivo[] = (
      await request(app.getHttpServer())
        .get('/api/prontuario-tipo-motivos')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET prontuario-tipo-motivos by id', async () => {
    const getEntity: ProntuarioTipoMotivo = (
      await request(app.getHttpServer())
        .get('/api/prontuario-tipo-motivos/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create prontuario-tipo-motivos', async () => {
    const createdEntity: ProntuarioTipoMotivo = (
      await request(app.getHttpServer())
        .post('/api/prontuario-tipo-motivos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update prontuario-tipo-motivos', async () => {
    const updatedEntity: ProntuarioTipoMotivo = (
      await request(app.getHttpServer())
        .put('/api/prontuario-tipo-motivos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE prontuario-tipo-motivos', async () => {
    const deletedEntity: ProntuarioTipoMotivo = (
      await request(app.getHttpServer())
        .delete('/api/prontuario-tipo-motivos/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
