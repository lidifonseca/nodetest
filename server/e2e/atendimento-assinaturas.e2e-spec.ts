import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import AtendimentoAssinaturas from '../src/domain/atendimento-assinaturas.entity';
import { AtendimentoAssinaturasService } from '../src/service/atendimento-assinaturas.service';

describe('AtendimentoAssinaturas Controller', () => {
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
      .overrideProvider(AtendimentoAssinaturasService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all atendimento-assinaturas ', async () => {
    const getEntities: AtendimentoAssinaturas[] = (
      await request(app.getHttpServer())
        .get('/api/atendimento-assinaturas')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET atendimento-assinaturas by id', async () => {
    const getEntity: AtendimentoAssinaturas = (
      await request(app.getHttpServer())
        .get('/api/atendimento-assinaturas/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create atendimento-assinaturas', async () => {
    const createdEntity: AtendimentoAssinaturas = (
      await request(app.getHttpServer())
        .post('/api/atendimento-assinaturas')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update atendimento-assinaturas', async () => {
    const updatedEntity: AtendimentoAssinaturas = (
      await request(app.getHttpServer())
        .put('/api/atendimento-assinaturas')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE atendimento-assinaturas', async () => {
    const deletedEntity: AtendimentoAssinaturas = (
      await request(app.getHttpServer())
        .delete('/api/atendimento-assinaturas/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
