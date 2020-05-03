import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import UsuarioPainelGerencial from '../src/domain/usuario-painel-gerencial.entity';
import { UsuarioPainelGerencialService } from '../src/service/usuario-painel-gerencial.service';

describe('UsuarioPainelGerencial Controller', () => {
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
      .overrideProvider(UsuarioPainelGerencialService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all usuario-painel-gerencials ', async () => {
    const getEntities: UsuarioPainelGerencial[] = (
      await request(app.getHttpServer())
        .get('/api/usuario-painel-gerencials')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET usuario-painel-gerencials by id', async () => {
    const getEntity: UsuarioPainelGerencial = (
      await request(app.getHttpServer())
        .get('/api/usuario-painel-gerencials/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create usuario-painel-gerencials', async () => {
    const createdEntity: UsuarioPainelGerencial = (
      await request(app.getHttpServer())
        .post('/api/usuario-painel-gerencials')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update usuario-painel-gerencials', async () => {
    const updatedEntity: UsuarioPainelGerencial = (
      await request(app.getHttpServer())
        .put('/api/usuario-painel-gerencials')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE usuario-painel-gerencials', async () => {
    const deletedEntity: UsuarioPainelGerencial = (
      await request(app.getHttpServer())
        .delete('/api/usuario-painel-gerencials/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
