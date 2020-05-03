import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import CepbrEstado from '../src/domain/cepbr-estado.entity';
import { CepbrEstadoService } from '../src/service/cepbr-estado.service';

describe('CepbrEstado Controller', () => {
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
      .overrideProvider(CepbrEstadoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all cepbr-estados ', async () => {
    const getEntities: CepbrEstado[] = (
      await request(app.getHttpServer())
        .get('/api/cepbr-estados')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET cepbr-estados by id', async () => {
    const getEntity: CepbrEstado = (
      await request(app.getHttpServer())
        .get('/api/cepbr-estados/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create cepbr-estados', async () => {
    const createdEntity: CepbrEstado = (
      await request(app.getHttpServer())
        .post('/api/cepbr-estados')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update cepbr-estados', async () => {
    const updatedEntity: CepbrEstado = (
      await request(app.getHttpServer())
        .put('/api/cepbr-estados')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE cepbr-estados', async () => {
    const deletedEntity: CepbrEstado = (
      await request(app.getHttpServer())
        .delete('/api/cepbr-estados/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
