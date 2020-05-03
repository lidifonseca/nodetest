import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import IndicadoresValores from '../src/domain/indicadores-valores.entity';
import { IndicadoresValoresService } from '../src/service/indicadores-valores.service';

describe('IndicadoresValores Controller', () => {
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
      .overrideProvider(IndicadoresValoresService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all indicadores-valores ', async () => {
    const getEntities: IndicadoresValores[] = (
      await request(app.getHttpServer())
        .get('/api/indicadores-valores')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET indicadores-valores by id', async () => {
    const getEntity: IndicadoresValores = (
      await request(app.getHttpServer())
        .get('/api/indicadores-valores/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create indicadores-valores', async () => {
    const createdEntity: IndicadoresValores = (
      await request(app.getHttpServer())
        .post('/api/indicadores-valores')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update indicadores-valores', async () => {
    const updatedEntity: IndicadoresValores = (
      await request(app.getHttpServer())
        .put('/api/indicadores-valores')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE indicadores-valores', async () => {
    const deletedEntity: IndicadoresValores = (
      await request(app.getHttpServer())
        .delete('/api/indicadores-valores/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
