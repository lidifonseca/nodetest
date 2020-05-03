import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import ProfissionalAreaAtuacao from '../src/domain/profissional-area-atuacao.entity';
import { ProfissionalAreaAtuacaoService } from '../src/service/profissional-area-atuacao.service';

describe('ProfissionalAreaAtuacao Controller', () => {
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
      .overrideProvider(ProfissionalAreaAtuacaoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all profissional-area-atuacaos ', async () => {
    const getEntities: ProfissionalAreaAtuacao[] = (
      await request(app.getHttpServer())
        .get('/api/profissional-area-atuacaos')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET profissional-area-atuacaos by id', async () => {
    const getEntity: ProfissionalAreaAtuacao = (
      await request(app.getHttpServer())
        .get('/api/profissional-area-atuacaos/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create profissional-area-atuacaos', async () => {
    const createdEntity: ProfissionalAreaAtuacao = (
      await request(app.getHttpServer())
        .post('/api/profissional-area-atuacaos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update profissional-area-atuacaos', async () => {
    const updatedEntity: ProfissionalAreaAtuacao = (
      await request(app.getHttpServer())
        .put('/api/profissional-area-atuacaos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE profissional-area-atuacaos', async () => {
    const deletedEntity: ProfissionalAreaAtuacao = (
      await request(app.getHttpServer())
        .delete('/api/profissional-area-atuacaos/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
