import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import ProfissionalCategoriaContrato from '../src/domain/profissional-categoria-contrato.entity';
import { ProfissionalCategoriaContratoService } from '../src/service/profissional-categoria-contrato.service';

describe('ProfissionalCategoriaContrato Controller', () => {
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
      .overrideProvider(ProfissionalCategoriaContratoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all profissional-categoria-contratoes ', async () => {
    const getEntities: ProfissionalCategoriaContrato[] = (
      await request(app.getHttpServer())
        .get('/api/profissional-categoria-contratoes')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET profissional-categoria-contratoes by id', async () => {
    const getEntity: ProfissionalCategoriaContrato = (
      await request(app.getHttpServer())
        .get('/api/profissional-categoria-contratoes/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create profissional-categoria-contratoes', async () => {
    const createdEntity: ProfissionalCategoriaContrato = (
      await request(app.getHttpServer())
        .post('/api/profissional-categoria-contratoes')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update profissional-categoria-contratoes', async () => {
    const updatedEntity: ProfissionalCategoriaContrato = (
      await request(app.getHttpServer())
        .put('/api/profissional-categoria-contratoes')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE profissional-categoria-contratoes', async () => {
    const deletedEntity: ProfissionalCategoriaContrato = (
      await request(app.getHttpServer())
        .delete('/api/profissional-categoria-contratoes/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
