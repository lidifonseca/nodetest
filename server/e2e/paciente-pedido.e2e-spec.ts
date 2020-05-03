import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import PacientePedido from '../src/domain/paciente-pedido.entity';
import { PacientePedidoService } from '../src/service/paciente-pedido.service';

describe('PacientePedido Controller', () => {
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
      .overrideProvider(PacientePedidoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all paciente-pedidos ', async () => {
    const getEntities: PacientePedido[] = (
      await request(app.getHttpServer())
        .get('/api/paciente-pedidos')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET paciente-pedidos by id', async () => {
    const getEntity: PacientePedido = (
      await request(app.getHttpServer())
        .get('/api/paciente-pedidos/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create paciente-pedidos', async () => {
    const createdEntity: PacientePedido = (
      await request(app.getHttpServer())
        .post('/api/paciente-pedidos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update paciente-pedidos', async () => {
    const updatedEntity: PacientePedido = (
      await request(app.getHttpServer())
        .put('/api/paciente-pedidos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE paciente-pedidos', async () => {
    const deletedEntity: PacientePedido = (
      await request(app.getHttpServer())
        .delete('/api/paciente-pedidos/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
