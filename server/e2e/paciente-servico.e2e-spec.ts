import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import PacienteServico from '../src/domain/paciente-servico.entity';
import { PacienteServicoService } from '../src/service/paciente-servico.service';

describe('PacienteServico Controller', () => {
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
      .overrideProvider(PacienteServicoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all paciente-servicos ', async () => {
    const getEntities: PacienteServico[] = (
      await request(app.getHttpServer())
        .get('/api/paciente-servicos')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET paciente-servicos by id', async () => {
    const getEntity: PacienteServico = (
      await request(app.getHttpServer())
        .get('/api/paciente-servicos/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create paciente-servicos', async () => {
    const createdEntity: PacienteServico = (
      await request(app.getHttpServer())
        .post('/api/paciente-servicos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update paciente-servicos', async () => {
    const updatedEntity: PacienteServico = (
      await request(app.getHttpServer())
        .put('/api/paciente-servicos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE paciente-servicos', async () => {
    const deletedEntity: PacienteServico = (
      await request(app.getHttpServer())
        .delete('/api/paciente-servicos/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
