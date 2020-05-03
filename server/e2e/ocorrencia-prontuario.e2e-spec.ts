import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import OcorrenciaProntuario from '../src/domain/ocorrencia-prontuario.entity';
import { OcorrenciaProntuarioService } from '../src/service/ocorrencia-prontuario.service';

describe('OcorrenciaProntuario Controller', () => {
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
      .overrideProvider(OcorrenciaProntuarioService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all ocorrencia-prontuarios ', async () => {
    const getEntities: OcorrenciaProntuario[] = (
      await request(app.getHttpServer())
        .get('/api/ocorrencia-prontuarios')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET ocorrencia-prontuarios by id', async () => {
    const getEntity: OcorrenciaProntuario = (
      await request(app.getHttpServer())
        .get('/api/ocorrencia-prontuarios/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create ocorrencia-prontuarios', async () => {
    const createdEntity: OcorrenciaProntuario = (
      await request(app.getHttpServer())
        .post('/api/ocorrencia-prontuarios')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update ocorrencia-prontuarios', async () => {
    const updatedEntity: OcorrenciaProntuario = (
      await request(app.getHttpServer())
        .put('/api/ocorrencia-prontuarios')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE ocorrencia-prontuarios', async () => {
    const deletedEntity: OcorrenciaProntuario = (
      await request(app.getHttpServer())
        .delete('/api/ocorrencia-prontuarios/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
