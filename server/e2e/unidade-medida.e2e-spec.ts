import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import UnidadeMedida from '../src/domain/unidade-medida.entity';
import { UnidadeMedidaService } from '../src/service/unidade-medida.service';

describe('UnidadeMedida Controller', () => {
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
      .overrideProvider(UnidadeMedidaService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all unidade-medidas ', async () => {
    const getEntities: UnidadeMedida[] = (
      await request(app.getHttpServer())
        .get('/api/unidade-medidas')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET unidade-medidas by id', async () => {
    const getEntity: UnidadeMedida = (
      await request(app.getHttpServer())
        .get('/api/unidade-medidas/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create unidade-medidas', async () => {
    const createdEntity: UnidadeMedida = (
      await request(app.getHttpServer())
        .post('/api/unidade-medidas')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update unidade-medidas', async () => {
    const updatedEntity: UnidadeMedida = (
      await request(app.getHttpServer())
        .put('/api/unidade-medidas')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE unidade-medidas', async () => {
    const deletedEntity: UnidadeMedida = (
      await request(app.getHttpServer())
        .delete('/api/unidade-medidas/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
