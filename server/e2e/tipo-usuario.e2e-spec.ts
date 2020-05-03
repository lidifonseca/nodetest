import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import TipoUsuario from '../src/domain/tipo-usuario.entity';
import { TipoUsuarioService } from '../src/service/tipo-usuario.service';

describe('TipoUsuario Controller', () => {
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
      .overrideProvider(TipoUsuarioService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all tipo-usuarios ', async () => {
    const getEntities: TipoUsuario[] = (
      await request(app.getHttpServer())
        .get('/api/tipo-usuarios')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET tipo-usuarios by id', async () => {
    const getEntity: TipoUsuario = (
      await request(app.getHttpServer())
        .get('/api/tipo-usuarios/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create tipo-usuarios', async () => {
    const createdEntity: TipoUsuario = (
      await request(app.getHttpServer())
        .post('/api/tipo-usuarios')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update tipo-usuarios', async () => {
    const updatedEntity: TipoUsuario = (
      await request(app.getHttpServer())
        .put('/api/tipo-usuarios')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE tipo-usuarios', async () => {
    const deletedEntity: TipoUsuario = (
      await request(app.getHttpServer())
        .delete('/api/tipo-usuarios/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
