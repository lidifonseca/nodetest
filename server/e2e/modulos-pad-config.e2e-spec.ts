import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import ModulosPadConfig from '../src/domain/modulos-pad-config.entity';
import { ModulosPadConfigService } from '../src/service/modulos-pad-config.service';

describe('ModulosPadConfig Controller', () => {
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
      .overrideProvider(ModulosPadConfigService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all modulos-pad-configs ', async () => {
    const getEntities: ModulosPadConfig[] = (
      await request(app.getHttpServer())
        .get('/api/modulos-pad-configs')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET modulos-pad-configs by id', async () => {
    const getEntity: ModulosPadConfig = (
      await request(app.getHttpServer())
        .get('/api/modulos-pad-configs/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create modulos-pad-configs', async () => {
    const createdEntity: ModulosPadConfig = (
      await request(app.getHttpServer())
        .post('/api/modulos-pad-configs')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update modulos-pad-configs', async () => {
    const updatedEntity: ModulosPadConfig = (
      await request(app.getHttpServer())
        .put('/api/modulos-pad-configs')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE modulos-pad-configs', async () => {
    const deletedEntity: ModulosPadConfig = (
      await request(app.getHttpServer())
        .delete('/api/modulos-pad-configs/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
