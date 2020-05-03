import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import NotificacaoConfig from '../src/domain/notificacao-config.entity';
import { NotificacaoConfigService } from '../src/service/notificacao-config.service';

describe('NotificacaoConfig Controller', () => {
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
      .overrideProvider(NotificacaoConfigService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all notificacao-configs ', async () => {
    const getEntities: NotificacaoConfig[] = (
      await request(app.getHttpServer())
        .get('/api/notificacao-configs')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET notificacao-configs by id', async () => {
    const getEntity: NotificacaoConfig = (
      await request(app.getHttpServer())
        .get('/api/notificacao-configs/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create notificacao-configs', async () => {
    const createdEntity: NotificacaoConfig = (
      await request(app.getHttpServer())
        .post('/api/notificacao-configs')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update notificacao-configs', async () => {
    const updatedEntity: NotificacaoConfig = (
      await request(app.getHttpServer())
        .put('/api/notificacao-configs')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE notificacao-configs', async () => {
    const deletedEntity: NotificacaoConfig = (
      await request(app.getHttpServer())
        .delete('/api/notificacao-configs/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
