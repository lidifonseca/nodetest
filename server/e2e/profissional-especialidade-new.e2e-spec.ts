import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import ProfissionalEspecialidadeNew from '../src/domain/profissional-especialidade-new.entity';
import { ProfissionalEspecialidadeNewService } from '../src/service/profissional-especialidade-new.service';

describe('ProfissionalEspecialidadeNew Controller', () => {
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
      .overrideProvider(ProfissionalEspecialidadeNewService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all profissional-especialidade-news ', async () => {
    const getEntities: ProfissionalEspecialidadeNew[] = (
      await request(app.getHttpServer())
        .get('/api/profissional-especialidade-news')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET profissional-especialidade-news by id', async () => {
    const getEntity: ProfissionalEspecialidadeNew = (
      await request(app.getHttpServer())
        .get('/api/profissional-especialidade-news/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create profissional-especialidade-news', async () => {
    const createdEntity: ProfissionalEspecialidadeNew = (
      await request(app.getHttpServer())
        .post('/api/profissional-especialidade-news')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update profissional-especialidade-news', async () => {
    const updatedEntity: ProfissionalEspecialidadeNew = (
      await request(app.getHttpServer())
        .put('/api/profissional-especialidade-news')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE profissional-especialidade-news', async () => {
    const deletedEntity: ProfissionalEspecialidadeNew = (
      await request(app.getHttpServer())
        .delete('/api/profissional-especialidade-news/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
