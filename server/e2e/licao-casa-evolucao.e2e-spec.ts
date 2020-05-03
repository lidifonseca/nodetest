import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import LicaoCasaEvolucao from '../src/domain/licao-casa-evolucao.entity';
import { LicaoCasaEvolucaoService } from '../src/service/licao-casa-evolucao.service';

describe('LicaoCasaEvolucao Controller', () => {
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
      .overrideProvider(LicaoCasaEvolucaoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all licao-casa-evolucaos ', async () => {
    const getEntities: LicaoCasaEvolucao[] = (
      await request(app.getHttpServer())
        .get('/api/licao-casa-evolucaos')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET licao-casa-evolucaos by id', async () => {
    const getEntity: LicaoCasaEvolucao = (
      await request(app.getHttpServer())
        .get('/api/licao-casa-evolucaos/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create licao-casa-evolucaos', async () => {
    const createdEntity: LicaoCasaEvolucao = (
      await request(app.getHttpServer())
        .post('/api/licao-casa-evolucaos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update licao-casa-evolucaos', async () => {
    const updatedEntity: LicaoCasaEvolucao = (
      await request(app.getHttpServer())
        .put('/api/licao-casa-evolucaos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE licao-casa-evolucaos', async () => {
    const deletedEntity: LicaoCasaEvolucao = (
      await request(app.getHttpServer())
        .delete('/api/licao-casa-evolucaos/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
