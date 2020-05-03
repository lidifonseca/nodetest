import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import CepbrBairro from '../src/domain/cepbr-bairro.entity';
import { CepbrBairroService } from '../src/service/cepbr-bairro.service';

describe('CepbrBairro Controller', () => {
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
      .overrideProvider(CepbrBairroService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all cepbr-bairros ', async () => {
    const getEntities: CepbrBairro[] = (
      await request(app.getHttpServer())
        .get('/api/cepbr-bairros')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET cepbr-bairros by id', async () => {
    const getEntity: CepbrBairro = (
      await request(app.getHttpServer())
        .get('/api/cepbr-bairros/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create cepbr-bairros', async () => {
    const createdEntity: CepbrBairro = (
      await request(app.getHttpServer())
        .post('/api/cepbr-bairros')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update cepbr-bairros', async () => {
    const updatedEntity: CepbrBairro = (
      await request(app.getHttpServer())
        .put('/api/cepbr-bairros')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE cepbr-bairros', async () => {
    const deletedEntity: CepbrBairro = (
      await request(app.getHttpServer())
        .delete('/api/cepbr-bairros/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
