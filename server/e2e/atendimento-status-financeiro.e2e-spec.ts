import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import AtendimentoStatusFinanceiro from '../src/domain/atendimento-status-financeiro.entity';
import { AtendimentoStatusFinanceiroService } from '../src/service/atendimento-status-financeiro.service';

describe('AtendimentoStatusFinanceiro Controller', () => {
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
      .overrideProvider(AtendimentoStatusFinanceiroService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all atendimento-status-financeiros ', async () => {
    const getEntities: AtendimentoStatusFinanceiro[] = (
      await request(app.getHttpServer())
        .get('/api/atendimento-status-financeiros')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET atendimento-status-financeiros by id', async () => {
    const getEntity: AtendimentoStatusFinanceiro = (
      await request(app.getHttpServer())
        .get('/api/atendimento-status-financeiros/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create atendimento-status-financeiros', async () => {
    const createdEntity: AtendimentoStatusFinanceiro = (
      await request(app.getHttpServer())
        .post('/api/atendimento-status-financeiros')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update atendimento-status-financeiros', async () => {
    const updatedEntity: AtendimentoStatusFinanceiro = (
      await request(app.getHttpServer())
        .put('/api/atendimento-status-financeiros')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE atendimento-status-financeiros', async () => {
    const deletedEntity: AtendimentoStatusFinanceiro = (
      await request(app.getHttpServer())
        .delete('/api/atendimento-status-financeiros/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
