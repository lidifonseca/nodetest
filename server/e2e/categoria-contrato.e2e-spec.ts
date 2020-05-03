import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import CategoriaContrato from '../src/domain/categoria-contrato.entity';
import { CategoriaContratoService } from '../src/service/categoria-contrato.service';

describe('CategoriaContrato Controller', () => {
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
      .overrideProvider(CategoriaContratoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all categoria-contratoes ', async () => {
    const getEntities: CategoriaContrato[] = (
      await request(app.getHttpServer())
        .get('/api/categoria-contratoes')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET categoria-contratoes by id', async () => {
    const getEntity: CategoriaContrato = (
      await request(app.getHttpServer())
        .get('/api/categoria-contratoes/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create categoria-contratoes', async () => {
    const createdEntity: CategoriaContrato = (
      await request(app.getHttpServer())
        .post('/api/categoria-contratoes')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update categoria-contratoes', async () => {
    const updatedEntity: CategoriaContrato = (
      await request(app.getHttpServer())
        .put('/api/categoria-contratoes')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE categoria-contratoes', async () => {
    const deletedEntity: CategoriaContrato = (
      await request(app.getHttpServer())
        .delete('/api/categoria-contratoes/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
