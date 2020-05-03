import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import TempoExperiencia from '../src/domain/tempo-experiencia.entity';
import { TempoExperienciaService } from '../src/service/tempo-experiencia.service';

describe('TempoExperiencia Controller', () => {
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
      .overrideProvider(TempoExperienciaService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all tempo-experiencias ', async () => {
    const getEntities: TempoExperiencia[] = (
      await request(app.getHttpServer())
        .get('/api/tempo-experiencias')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET tempo-experiencias by id', async () => {
    const getEntity: TempoExperiencia = (
      await request(app.getHttpServer())
        .get('/api/tempo-experiencias/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create tempo-experiencias', async () => {
    const createdEntity: TempoExperiencia = (
      await request(app.getHttpServer())
        .post('/api/tempo-experiencias')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update tempo-experiencias', async () => {
    const updatedEntity: TempoExperiencia = (
      await request(app.getHttpServer())
        .put('/api/tempo-experiencias')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE tempo-experiencias', async () => {
    const deletedEntity: TempoExperiencia = (
      await request(app.getHttpServer())
        .delete('/api/tempo-experiencias/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
