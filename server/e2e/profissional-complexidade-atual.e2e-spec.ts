import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import ProfissionalComplexidadeAtual from '../src/domain/profissional-complexidade-atual.entity';
import { ProfissionalComplexidadeAtualService } from '../src/service/profissional-complexidade-atual.service';

describe('ProfissionalComplexidadeAtual Controller', () => {
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
      .overrideProvider(ProfissionalComplexidadeAtualService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all profissional-complexidade-atuals ', async () => {
    const getEntities: ProfissionalComplexidadeAtual[] = (
      await request(app.getHttpServer())
        .get('/api/profissional-complexidade-atuals')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET profissional-complexidade-atuals by id', async () => {
    const getEntity: ProfissionalComplexidadeAtual = (
      await request(app.getHttpServer())
        .get('/api/profissional-complexidade-atuals/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create profissional-complexidade-atuals', async () => {
    const createdEntity: ProfissionalComplexidadeAtual = (
      await request(app.getHttpServer())
        .post('/api/profissional-complexidade-atuals')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update profissional-complexidade-atuals', async () => {
    const updatedEntity: ProfissionalComplexidadeAtual = (
      await request(app.getHttpServer())
        .put('/api/profissional-complexidade-atuals')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE profissional-complexidade-atuals', async () => {
    const deletedEntity: ProfissionalComplexidadeAtual = (
      await request(app.getHttpServer())
        .delete('/api/profissional-complexidade-atuals/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
