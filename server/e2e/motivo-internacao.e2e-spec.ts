import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import MotivoInternacao from '../src/domain/motivo-internacao.entity';
import { MotivoInternacaoService } from '../src/service/motivo-internacao.service';

describe('MotivoInternacao Controller', () => {
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
      .overrideProvider(MotivoInternacaoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all motivo-internacaos ', async () => {
    const getEntities: MotivoInternacao[] = (
      await request(app.getHttpServer())
        .get('/api/motivo-internacaos')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET motivo-internacaos by id', async () => {
    const getEntity: MotivoInternacao = (
      await request(app.getHttpServer())
        .get('/api/motivo-internacaos/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create motivo-internacaos', async () => {
    const createdEntity: MotivoInternacao = (
      await request(app.getHttpServer())
        .post('/api/motivo-internacaos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update motivo-internacaos', async () => {
    const updatedEntity: MotivoInternacao = (
      await request(app.getHttpServer())
        .put('/api/motivo-internacaos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE motivo-internacaos', async () => {
    const deletedEntity: MotivoInternacao = (
      await request(app.getHttpServer())
        .delete('/api/motivo-internacaos/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
