import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import CepbrCidade from '../src/domain/cepbr-cidade.entity';
import { CepbrCidadeService } from '../src/service/cepbr-cidade.service';

describe('CepbrCidade Controller', () => {
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
      .overrideProvider(CepbrCidadeService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all cepbr-cidades ', async () => {
    const getEntities: CepbrCidade[] = (
      await request(app.getHttpServer())
        .get('/api/cepbr-cidades')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET cepbr-cidades by id', async () => {
    const getEntity: CepbrCidade = (
      await request(app.getHttpServer())
        .get('/api/cepbr-cidades/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create cepbr-cidades', async () => {
    const createdEntity: CepbrCidade = (
      await request(app.getHttpServer())
        .post('/api/cepbr-cidades')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update cepbr-cidades', async () => {
    const updatedEntity: CepbrCidade = (
      await request(app.getHttpServer())
        .put('/api/cepbr-cidades')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE cepbr-cidades', async () => {
    const deletedEntity: CepbrCidade = (
      await request(app.getHttpServer())
        .delete('/api/cepbr-cidades/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
