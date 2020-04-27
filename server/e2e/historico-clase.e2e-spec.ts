import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import HistoricoClase from '../src/domain/historico-clase.entity';
import { HistoricoClaseService } from '../src/service/historico-clase.service';

describe('HistoricoClase Controller', () => {
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
      .overrideProvider(HistoricoClaseService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all historico-clases ', async () => {
    const getEntities: HistoricoClase[] = (
      await request(app.getHttpServer())
        .get('/api/historico-clases')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET historico-clases by id', async () => {
    const getEntity: HistoricoClase = (
      await request(app.getHttpServer())
        .get('/api/historico-clases/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create historico-clases', async () => {
    const createdEntity: HistoricoClase = (
      await request(app.getHttpServer())
        .post('/api/historico-clases')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update historico-clases', async () => {
    const updatedEntity: HistoricoClase = (
      await request(app.getHttpServer())
        .put('/api/historico-clases')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE historico-clases', async () => {
    const deletedEntity: HistoricoClase = (
      await request(app.getHttpServer())
        .delete('/api/historico-clases/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
