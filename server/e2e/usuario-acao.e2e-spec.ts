import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import UsuarioAcao from '../src/domain/usuario-acao.entity';
import { UsuarioAcaoService } from '../src/service/usuario-acao.service';

describe('UsuarioAcao Controller', () => {
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
      .overrideProvider(UsuarioAcaoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all usuario-acaos ', async () => {
    const getEntities: UsuarioAcao[] = (
      await request(app.getHttpServer())
        .get('/api/usuario-acaos')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET usuario-acaos by id', async () => {
    const getEntity: UsuarioAcao = (
      await request(app.getHttpServer())
        .get('/api/usuario-acaos/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create usuario-acaos', async () => {
    const createdEntity: UsuarioAcao = (
      await request(app.getHttpServer())
        .post('/api/usuario-acaos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update usuario-acaos', async () => {
    const updatedEntity: UsuarioAcao = (
      await request(app.getHttpServer())
        .put('/api/usuario-acaos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE usuario-acaos', async () => {
    const deletedEntity: UsuarioAcao = (
      await request(app.getHttpServer())
        .delete('/api/usuario-acaos/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
