import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import ReportEmailAtendimento from '../src/domain/report-email-atendimento.entity';
import { ReportEmailAtendimentoService } from '../src/service/report-email-atendimento.service';

describe('ReportEmailAtendimento Controller', () => {
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
      .overrideProvider(ReportEmailAtendimentoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all report-email-atendimentos ', async () => {
    const getEntities: ReportEmailAtendimento[] = (
      await request(app.getHttpServer())
        .get('/api/report-email-atendimentos')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET report-email-atendimentos by id', async () => {
    const getEntity: ReportEmailAtendimento = (
      await request(app.getHttpServer())
        .get('/api/report-email-atendimentos/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create report-email-atendimentos', async () => {
    const createdEntity: ReportEmailAtendimento = (
      await request(app.getHttpServer())
        .post('/api/report-email-atendimentos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update report-email-atendimentos', async () => {
    const updatedEntity: ReportEmailAtendimento = (
      await request(app.getHttpServer())
        .put('/api/report-email-atendimentos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE report-email-atendimentos', async () => {
    const deletedEntity: ReportEmailAtendimento = (
      await request(app.getHttpServer())
        .delete('/api/report-email-atendimentos/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
