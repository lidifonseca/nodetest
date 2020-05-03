import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import TipoOperadora from '../src/domain/tipo-operadora.entity';
import { TipoOperadoraService } from '../src/service/tipo-operadora.service';

describe('TipoOperadora Controller', () => {
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
      .overrideProvider(TipoOperadoraService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all tipo-operadoras ', async () => {
    const getEntities: TipoOperadora[] = (
      await request(app.getHttpServer())
        .get('/api/tipo-operadoras')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET tipo-operadoras by id', async () => {
    const getEntity: TipoOperadora = (
      await request(app.getHttpServer())
        .get('/api/tipo-operadoras/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create tipo-operadoras', async () => {
    const createdEntity: TipoOperadora = (
      await request(app.getHttpServer())
        .post('/api/tipo-operadoras')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update tipo-operadoras', async () => {
    const updatedEntity: TipoOperadora = (
      await request(app.getHttpServer())
        .put('/api/tipo-operadoras')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE tipo-operadoras', async () => {
    const deletedEntity: TipoOperadora = (
      await request(app.getHttpServer())
        .delete('/api/tipo-operadoras/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
