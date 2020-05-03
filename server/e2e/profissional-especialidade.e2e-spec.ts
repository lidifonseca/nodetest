import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import ProfissionalEspecialidade from '../src/domain/profissional-especialidade.entity';
import { ProfissionalEspecialidadeService } from '../src/service/profissional-especialidade.service';

describe('ProfissionalEspecialidade Controller', () => {
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
      .overrideProvider(ProfissionalEspecialidadeService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all profissional-especialidades ', async () => {
    const getEntities: ProfissionalEspecialidade[] = (
      await request(app.getHttpServer())
        .get('/api/profissional-especialidades')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET profissional-especialidades by id', async () => {
    const getEntity: ProfissionalEspecialidade = (
      await request(app.getHttpServer())
        .get('/api/profissional-especialidades/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create profissional-especialidades', async () => {
    const createdEntity: ProfissionalEspecialidade = (
      await request(app.getHttpServer())
        .post('/api/profissional-especialidades')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update profissional-especialidades', async () => {
    const updatedEntity: ProfissionalEspecialidade = (
      await request(app.getHttpServer())
        .put('/api/profissional-especialidades')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE profissional-especialidades', async () => {
    const deletedEntity: ProfissionalEspecialidade = (
      await request(app.getHttpServer())
        .delete('/api/profissional-especialidades/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
