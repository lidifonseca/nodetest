import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import TipoProntuario from '../src/domain/tipo-prontuario.entity';
import { TipoProntuarioService } from '../src/service/tipo-prontuario.service';

describe('TipoProntuario Controller', () => {
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
      .overrideProvider(TipoProntuarioService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all tipo-prontuarios ', async () => {
    const getEntities: TipoProntuario[] = (
      await request(app.getHttpServer())
        .get('/api/tipo-prontuarios')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET tipo-prontuarios by id', async () => {
    const getEntity: TipoProntuario = (
      await request(app.getHttpServer())
        .get('/api/tipo-prontuarios/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create tipo-prontuarios', async () => {
    const createdEntity: TipoProntuario = (
      await request(app.getHttpServer())
        .post('/api/tipo-prontuarios')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update tipo-prontuarios', async () => {
    const updatedEntity: TipoProntuario = (
      await request(app.getHttpServer())
        .put('/api/tipo-prontuarios')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE tipo-prontuarios', async () => {
    const deletedEntity: TipoProntuario = (
      await request(app.getHttpServer())
        .delete('/api/tipo-prontuarios/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
