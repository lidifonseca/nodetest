import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import ProfissionalDispositivoComplexidadeAtual from '../src/domain/profissional-dispositivo-complexidade-atual.entity';
import { ProfissionalDispositivoComplexidadeAtualService } from '../src/service/profissional-dispositivo-complexidade-atual.service';

describe('ProfissionalDispositivoComplexidadeAtual Controller', () => {
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
      .overrideProvider(ProfissionalDispositivoComplexidadeAtualService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all profissional-dispositivo-complexidade-atuals ', async () => {
    const getEntities: ProfissionalDispositivoComplexidadeAtual[] = (
      await request(app.getHttpServer())
        .get('/api/profissional-dispositivo-complexidade-atuals')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET profissional-dispositivo-complexidade-atuals by id', async () => {
    const getEntity: ProfissionalDispositivoComplexidadeAtual = (
      await request(app.getHttpServer())
        .get('/api/profissional-dispositivo-complexidade-atuals/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create profissional-dispositivo-complexidade-atuals', async () => {
    const createdEntity: ProfissionalDispositivoComplexidadeAtual = (
      await request(app.getHttpServer())
        .post('/api/profissional-dispositivo-complexidade-atuals')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update profissional-dispositivo-complexidade-atuals', async () => {
    const updatedEntity: ProfissionalDispositivoComplexidadeAtual = (
      await request(app.getHttpServer())
        .put('/api/profissional-dispositivo-complexidade-atuals')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE profissional-dispositivo-complexidade-atuals', async () => {
    const deletedEntity: ProfissionalDispositivoComplexidadeAtual = (
      await request(app.getHttpServer())
        .delete('/api/profissional-dispositivo-complexidade-atuals/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
