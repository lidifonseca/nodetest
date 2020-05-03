import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import UnidadeEasy from '../src/domain/unidade-easy.entity';
import { UnidadeEasyService } from '../src/service/unidade-easy.service';

describe('UnidadeEasy Controller', () => {
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
      .overrideProvider(UnidadeEasyService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all unidade-easies ', async () => {
    const getEntities: UnidadeEasy[] = (
      await request(app.getHttpServer())
        .get('/api/unidade-easies')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET unidade-easies by id', async () => {
    const getEntity: UnidadeEasy = (
      await request(app.getHttpServer())
        .get('/api/unidade-easies/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create unidade-easies', async () => {
    const createdEntity: UnidadeEasy = (
      await request(app.getHttpServer())
        .post('/api/unidade-easies')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update unidade-easies', async () => {
    const updatedEntity: UnidadeEasy = (
      await request(app.getHttpServer())
        .put('/api/unidade-easies')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE unidade-easies', async () => {
    const deletedEntity: UnidadeEasy = (
      await request(app.getHttpServer())
        .delete('/api/unidade-easies/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
