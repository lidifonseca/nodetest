import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import FranquiaAreaAtuacao from '../src/domain/franquia-area-atuacao.entity';
import { FranquiaAreaAtuacaoService } from '../src/service/franquia-area-atuacao.service';

describe('FranquiaAreaAtuacao Controller', () => {
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
      .overrideProvider(FranquiaAreaAtuacaoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all franquia-area-atuacaos ', async () => {
    const getEntities: FranquiaAreaAtuacao[] = (
      await request(app.getHttpServer())
        .get('/api/franquia-area-atuacaos')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET franquia-area-atuacaos by id', async () => {
    const getEntity: FranquiaAreaAtuacao = (
      await request(app.getHttpServer())
        .get('/api/franquia-area-atuacaos/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create franquia-area-atuacaos', async () => {
    const createdEntity: FranquiaAreaAtuacao = (
      await request(app.getHttpServer())
        .post('/api/franquia-area-atuacaos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update franquia-area-atuacaos', async () => {
    const updatedEntity: FranquiaAreaAtuacao = (
      await request(app.getHttpServer())
        .put('/api/franquia-area-atuacaos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE franquia-area-atuacaos', async () => {
    const deletedEntity: FranquiaAreaAtuacao = (
      await request(app.getHttpServer())
        .delete('/api/franquia-area-atuacaos/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
