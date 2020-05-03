import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import ModulosPad from '../src/domain/modulos-pad.entity';
import { ModulosPadService } from '../src/service/modulos-pad.service';

describe('ModulosPad Controller', () => {
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
      .overrideProvider(ModulosPadService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all modulos-pads ', async () => {
    const getEntities: ModulosPad[] = (
      await request(app.getHttpServer())
        .get('/api/modulos-pads')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET modulos-pads by id', async () => {
    const getEntity: ModulosPad = (
      await request(app.getHttpServer())
        .get('/api/modulos-pads/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create modulos-pads', async () => {
    const createdEntity: ModulosPad = (
      await request(app.getHttpServer())
        .post('/api/modulos-pads')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update modulos-pads', async () => {
    const updatedEntity: ModulosPad = (
      await request(app.getHttpServer())
        .put('/api/modulos-pads')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE modulos-pads', async () => {
    const deletedEntity: ModulosPad = (
      await request(app.getHttpServer())
        .delete('/api/modulos-pads/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
