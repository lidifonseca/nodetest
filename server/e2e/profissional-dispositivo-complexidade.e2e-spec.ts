import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import ProfissionalDispositivoComplexidade from '../src/domain/profissional-dispositivo-complexidade.entity';
import { ProfissionalDispositivoComplexidadeService } from '../src/service/profissional-dispositivo-complexidade.service';

describe('ProfissionalDispositivoComplexidade Controller', () => {
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
      .overrideProvider(ProfissionalDispositivoComplexidadeService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all profissional-dispositivo-complexidades ', async () => {
    const getEntities: ProfissionalDispositivoComplexidade[] = (
      await request(app.getHttpServer())
        .get('/api/profissional-dispositivo-complexidades')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET profissional-dispositivo-complexidades by id', async () => {
    const getEntity: ProfissionalDispositivoComplexidade = (
      await request(app.getHttpServer())
        .get('/api/profissional-dispositivo-complexidades/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create profissional-dispositivo-complexidades', async () => {
    const createdEntity: ProfissionalDispositivoComplexidade = (
      await request(app.getHttpServer())
        .post('/api/profissional-dispositivo-complexidades')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update profissional-dispositivo-complexidades', async () => {
    const updatedEntity: ProfissionalDispositivoComplexidade = (
      await request(app.getHttpServer())
        .put('/api/profissional-dispositivo-complexidades')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE profissional-dispositivo-complexidades', async () => {
    const deletedEntity: ProfissionalDispositivoComplexidade = (
      await request(app.getHttpServer())
        .delete('/api/profissional-dispositivo-complexidades/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
