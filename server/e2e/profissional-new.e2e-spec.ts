import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import ProfissionalNew from '../src/domain/profissional-new.entity';
import { ProfissionalNewService } from '../src/service/profissional-new.service';

describe('ProfissionalNew Controller', () => {
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
      .overrideProvider(ProfissionalNewService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all profissional-news ', async () => {
    const getEntities: ProfissionalNew[] = (
      await request(app.getHttpServer())
        .get('/api/profissional-news')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET profissional-news by id', async () => {
    const getEntity: ProfissionalNew = (
      await request(app.getHttpServer())
        .get('/api/profissional-news/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create profissional-news', async () => {
    const createdEntity: ProfissionalNew = (
      await request(app.getHttpServer())
        .post('/api/profissional-news')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update profissional-news', async () => {
    const updatedEntity: ProfissionalNew = (
      await request(app.getHttpServer())
        .put('/api/profissional-news')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE profissional-news', async () => {
    const deletedEntity: ProfissionalNew = (
      await request(app.getHttpServer())
        .delete('/api/profissional-news/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
