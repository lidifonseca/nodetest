import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import FranquiaUsuario from '../src/domain/franquia-usuario.entity';
import { FranquiaUsuarioService } from '../src/service/franquia-usuario.service';

describe('FranquiaUsuario Controller', () => {
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
      .overrideProvider(FranquiaUsuarioService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all franquia-usuarios ', async () => {
    const getEntities: FranquiaUsuario[] = (
      await request(app.getHttpServer())
        .get('/api/franquia-usuarios')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET franquia-usuarios by id', async () => {
    const getEntity: FranquiaUsuario = (
      await request(app.getHttpServer())
        .get('/api/franquia-usuarios/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create franquia-usuarios', async () => {
    const createdEntity: FranquiaUsuario = (
      await request(app.getHttpServer())
        .post('/api/franquia-usuarios')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update franquia-usuarios', async () => {
    const updatedEntity: FranquiaUsuario = (
      await request(app.getHttpServer())
        .put('/api/franquia-usuarios')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE franquia-usuarios', async () => {
    const deletedEntity: FranquiaUsuario = (
      await request(app.getHttpServer())
        .delete('/api/franquia-usuarios/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
