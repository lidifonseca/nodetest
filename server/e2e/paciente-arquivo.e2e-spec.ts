import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import PacienteArquivo from '../src/domain/paciente-arquivo.entity';
import { PacienteArquivoService } from '../src/service/paciente-arquivo.service';

describe('PacienteArquivo Controller', () => {
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
      .overrideProvider(PacienteArquivoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all paciente-arquivos ', async () => {
    const getEntities: PacienteArquivo[] = (
      await request(app.getHttpServer())
        .get('/api/paciente-arquivos')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET paciente-arquivos by id', async () => {
    const getEntity: PacienteArquivo = (
      await request(app.getHttpServer())
        .get('/api/paciente-arquivos/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create paciente-arquivos', async () => {
    const createdEntity: PacienteArquivo = (
      await request(app.getHttpServer())
        .post('/api/paciente-arquivos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update paciente-arquivos', async () => {
    const updatedEntity: PacienteArquivo = (
      await request(app.getHttpServer())
        .put('/api/paciente-arquivos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE paciente-arquivos', async () => {
    const deletedEntity: PacienteArquivo = (
      await request(app.getHttpServer())
        .delete('/api/paciente-arquivos/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
