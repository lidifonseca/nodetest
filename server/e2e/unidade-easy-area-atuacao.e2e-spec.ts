import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import UnidadeEasyAreaAtuacao from '../src/domain/unidade-easy-area-atuacao.entity';
import { UnidadeEasyAreaAtuacaoService } from '../src/service/unidade-easy-area-atuacao.service';

describe('UnidadeEasyAreaAtuacao Controller', () => {
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
      .overrideProvider(UnidadeEasyAreaAtuacaoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all unidade-easy-area-atuacaos ', async () => {
    const getEntities: UnidadeEasyAreaAtuacao[] = (
      await request(app.getHttpServer())
        .get('/api/unidade-easy-area-atuacaos')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET unidade-easy-area-atuacaos by id', async () => {
    const getEntity: UnidadeEasyAreaAtuacao = (
      await request(app.getHttpServer())
        .get('/api/unidade-easy-area-atuacaos/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create unidade-easy-area-atuacaos', async () => {
    const createdEntity: UnidadeEasyAreaAtuacao = (
      await request(app.getHttpServer())
        .post('/api/unidade-easy-area-atuacaos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update unidade-easy-area-atuacaos', async () => {
    const updatedEntity: UnidadeEasyAreaAtuacao = (
      await request(app.getHttpServer())
        .put('/api/unidade-easy-area-atuacaos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE unidade-easy-area-atuacaos', async () => {
    const deletedEntity: UnidadeEasyAreaAtuacao = (
      await request(app.getHttpServer())
        .delete('/api/unidade-easy-area-atuacaos/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
