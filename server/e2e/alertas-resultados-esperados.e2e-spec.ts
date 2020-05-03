import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import AlertasResultadosEsperados from '../src/domain/alertas-resultados-esperados.entity';
import { AlertasResultadosEsperadosService } from '../src/service/alertas-resultados-esperados.service';

describe('AlertasResultadosEsperados Controller', () => {
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
      .overrideProvider(AlertasResultadosEsperadosService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all alertas-resultados-esperados ', async () => {
    const getEntities: AlertasResultadosEsperados[] = (
      await request(app.getHttpServer())
        .get('/api/alertas-resultados-esperados')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET alertas-resultados-esperados by id', async () => {
    const getEntity: AlertasResultadosEsperados = (
      await request(app.getHttpServer())
        .get('/api/alertas-resultados-esperados/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create alertas-resultados-esperados', async () => {
    const createdEntity: AlertasResultadosEsperados = (
      await request(app.getHttpServer())
        .post('/api/alertas-resultados-esperados')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update alertas-resultados-esperados', async () => {
    const updatedEntity: AlertasResultadosEsperados = (
      await request(app.getHttpServer())
        .put('/api/alertas-resultados-esperados')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE alertas-resultados-esperados', async () => {
    const deletedEntity: AlertasResultadosEsperados = (
      await request(app.getHttpServer())
        .delete('/api/alertas-resultados-esperados/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
