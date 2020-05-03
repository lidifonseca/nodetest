import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import ProfissionalStatusAtualNew from '../src/domain/profissional-status-atual-new.entity';
import { ProfissionalStatusAtualNewService } from '../src/service/profissional-status-atual-new.service';

describe('ProfissionalStatusAtualNew Controller', () => {
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
      .overrideProvider(ProfissionalStatusAtualNewService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all profissional-status-atual-news ', async () => {
    const getEntities: ProfissionalStatusAtualNew[] = (
      await request(app.getHttpServer())
        .get('/api/profissional-status-atual-news')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET profissional-status-atual-news by id', async () => {
    const getEntity: ProfissionalStatusAtualNew = (
      await request(app.getHttpServer())
        .get('/api/profissional-status-atual-news/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create profissional-status-atual-news', async () => {
    const createdEntity: ProfissionalStatusAtualNew = (
      await request(app.getHttpServer())
        .post('/api/profissional-status-atual-news')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update profissional-status-atual-news', async () => {
    const updatedEntity: ProfissionalStatusAtualNew = (
      await request(app.getHttpServer())
        .put('/api/profissional-status-atual-news')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE profissional-status-atual-news', async () => {
    const deletedEntity: ProfissionalStatusAtualNew = (
      await request(app.getHttpServer())
        .delete('/api/profissional-status-atual-news/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
