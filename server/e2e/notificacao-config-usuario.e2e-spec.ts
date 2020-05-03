import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import NotificacaoConfigUsuario from '../src/domain/notificacao-config-usuario.entity';
import { NotificacaoConfigUsuarioService } from '../src/service/notificacao-config-usuario.service';

describe('NotificacaoConfigUsuario Controller', () => {
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
      .overrideProvider(NotificacaoConfigUsuarioService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all notificacao-config-usuarios ', async () => {
    const getEntities: NotificacaoConfigUsuario[] = (
      await request(app.getHttpServer())
        .get('/api/notificacao-config-usuarios')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET notificacao-config-usuarios by id', async () => {
    const getEntity: NotificacaoConfigUsuario = (
      await request(app.getHttpServer())
        .get('/api/notificacao-config-usuarios/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create notificacao-config-usuarios', async () => {
    const createdEntity: NotificacaoConfigUsuario = (
      await request(app.getHttpServer())
        .post('/api/notificacao-config-usuarios')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update notificacao-config-usuarios', async () => {
    const updatedEntity: NotificacaoConfigUsuario = (
      await request(app.getHttpServer())
        .put('/api/notificacao-config-usuarios')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE notificacao-config-usuarios', async () => {
    const deletedEntity: NotificacaoConfigUsuario = (
      await request(app.getHttpServer())
        .delete('/api/notificacao-config-usuarios/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
