import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import EspecialidadeOperadora from '../src/domain/especialidade-operadora.entity';
import { EspecialidadeOperadoraService } from '../src/service/especialidade-operadora.service';

describe('EspecialidadeOperadora Controller', () => {
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
      .overrideProvider(EspecialidadeOperadoraService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all especialidade-operadoras ', async () => {
    const getEntities: EspecialidadeOperadora[] = (
      await request(app.getHttpServer())
        .get('/api/especialidade-operadoras')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET especialidade-operadoras by id', async () => {
    const getEntity: EspecialidadeOperadora = (
      await request(app.getHttpServer())
        .get('/api/especialidade-operadoras/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create especialidade-operadoras', async () => {
    const createdEntity: EspecialidadeOperadora = (
      await request(app.getHttpServer())
        .post('/api/especialidade-operadoras')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update especialidade-operadoras', async () => {
    const updatedEntity: EspecialidadeOperadora = (
      await request(app.getHttpServer())
        .put('/api/especialidade-operadoras')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE especialidade-operadoras', async () => {
    const deletedEntity: EspecialidadeOperadora = (
      await request(app.getHttpServer())
        .delete('/api/especialidade-operadoras/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
