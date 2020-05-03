import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import PadItemResultado from '../src/domain/pad-item-resultado.entity';
import { PadItemResultadoService } from '../src/service/pad-item-resultado.service';

describe('PadItemResultado Controller', () => {
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
      .overrideProvider(PadItemResultadoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all pad-item-resultados ', async () => {
    const getEntities: PadItemResultado[] = (
      await request(app.getHttpServer())
        .get('/api/pad-item-resultados')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET pad-item-resultados by id', async () => {
    const getEntity: PadItemResultado = (
      await request(app.getHttpServer())
        .get('/api/pad-item-resultados/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create pad-item-resultados', async () => {
    const createdEntity: PadItemResultado = (
      await request(app.getHttpServer())
        .post('/api/pad-item-resultados')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update pad-item-resultados', async () => {
    const updatedEntity: PadItemResultado = (
      await request(app.getHttpServer())
        .put('/api/pad-item-resultados')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE pad-item-resultados', async () => {
    const deletedEntity: PadItemResultado = (
      await request(app.getHttpServer())
        .delete('/api/pad-item-resultados/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
