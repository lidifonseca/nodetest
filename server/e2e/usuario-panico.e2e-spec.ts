import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import UsuarioPanico from '../src/domain/usuario-panico.entity';
import { UsuarioPanicoService } from '../src/service/usuario-panico.service';

describe('UsuarioPanico Controller', () => {
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
      .overrideProvider(UsuarioPanicoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all usuario-panicos ', async () => {
    const getEntities: UsuarioPanico[] = (
      await request(app.getHttpServer())
        .get('/api/usuario-panicos')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET usuario-panicos by id', async () => {
    const getEntity: UsuarioPanico = (
      await request(app.getHttpServer())
        .get('/api/usuario-panicos/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create usuario-panicos', async () => {
    const createdEntity: UsuarioPanico = (
      await request(app.getHttpServer())
        .post('/api/usuario-panicos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update usuario-panicos', async () => {
    const updatedEntity: UsuarioPanico = (
      await request(app.getHttpServer())
        .put('/api/usuario-panicos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE usuario-panicos', async () => {
    const deletedEntity: UsuarioPanico = (
      await request(app.getHttpServer())
        .delete('/api/usuario-panicos/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
