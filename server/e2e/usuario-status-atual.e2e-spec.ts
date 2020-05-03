import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import UsuarioStatusAtual from '../src/domain/usuario-status-atual.entity';
import { UsuarioStatusAtualService } from '../src/service/usuario-status-atual.service';

describe('UsuarioStatusAtual Controller', () => {
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
      .overrideProvider(UsuarioStatusAtualService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all usuario-status-atuals ', async () => {
    const getEntities: UsuarioStatusAtual[] = (
      await request(app.getHttpServer())
        .get('/api/usuario-status-atuals')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET usuario-status-atuals by id', async () => {
    const getEntity: UsuarioStatusAtual = (
      await request(app.getHttpServer())
        .get('/api/usuario-status-atuals/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create usuario-status-atuals', async () => {
    const createdEntity: UsuarioStatusAtual = (
      await request(app.getHttpServer())
        .post('/api/usuario-status-atuals')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update usuario-status-atuals', async () => {
    const updatedEntity: UsuarioStatusAtual = (
      await request(app.getHttpServer())
        .put('/api/usuario-status-atuals')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE usuario-status-atuals', async () => {
    const deletedEntity: UsuarioStatusAtual = (
      await request(app.getHttpServer())
        .delete('/api/usuario-status-atuals/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
