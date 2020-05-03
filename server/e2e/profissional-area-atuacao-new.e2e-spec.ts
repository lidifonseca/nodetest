import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import ProfissionalAreaAtuacaoNew from '../src/domain/profissional-area-atuacao-new.entity';
import { ProfissionalAreaAtuacaoNewService } from '../src/service/profissional-area-atuacao-new.service';

describe('ProfissionalAreaAtuacaoNew Controller', () => {
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
      .overrideProvider(ProfissionalAreaAtuacaoNewService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all profissional-area-atuacao-news ', async () => {
    const getEntities: ProfissionalAreaAtuacaoNew[] = (
      await request(app.getHttpServer())
        .get('/api/profissional-area-atuacao-news')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET profissional-area-atuacao-news by id', async () => {
    const getEntity: ProfissionalAreaAtuacaoNew = (
      await request(app.getHttpServer())
        .get('/api/profissional-area-atuacao-news/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create profissional-area-atuacao-news', async () => {
    const createdEntity: ProfissionalAreaAtuacaoNew = (
      await request(app.getHttpServer())
        .post('/api/profissional-area-atuacao-news')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update profissional-area-atuacao-news', async () => {
    const updatedEntity: ProfissionalAreaAtuacaoNew = (
      await request(app.getHttpServer())
        .put('/api/profissional-area-atuacao-news')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE profissional-area-atuacao-news', async () => {
    const deletedEntity: ProfissionalAreaAtuacaoNew = (
      await request(app.getHttpServer())
        .delete('/api/profissional-area-atuacao-news/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
