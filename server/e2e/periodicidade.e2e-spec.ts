import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import Periodicidade from '../src/domain/periodicidade.entity';
import { PeriodicidadeService } from '../src/service/periodicidade.service';

describe('Periodicidade Controller', () => {
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
      .overrideProvider(PeriodicidadeService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all periodicidades ', async () => {
    const getEntities: Periodicidade[] = (
      await request(app.getHttpServer())
        .get('/api/periodicidades')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET periodicidades by id', async () => {
    const getEntity: Periodicidade = (
      await request(app.getHttpServer())
        .get('/api/periodicidades/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create periodicidades', async () => {
    const createdEntity: Periodicidade = (
      await request(app.getHttpServer())
        .post('/api/periodicidades')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update periodicidades', async () => {
    const updatedEntity: Periodicidade = (
      await request(app.getHttpServer())
        .put('/api/periodicidades')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE periodicidades', async () => {
    const deletedEntity: Periodicidade = (
      await request(app.getHttpServer())
        .delete('/api/periodicidades/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
