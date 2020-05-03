import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import AtendimentoAtividades from '../src/domain/atendimento-atividades.entity';
import { AtendimentoAtividadesService } from '../src/service/atendimento-atividades.service';

describe('AtendimentoAtividades Controller', () => {
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
      .overrideProvider(AtendimentoAtividadesService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all atendimento-atividades ', async () => {
    const getEntities: AtendimentoAtividades[] = (
      await request(app.getHttpServer())
        .get('/api/atendimento-atividades')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET atendimento-atividades by id', async () => {
    const getEntity: AtendimentoAtividades = (
      await request(app.getHttpServer())
        .get('/api/atendimento-atividades/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create atendimento-atividades', async () => {
    const createdEntity: AtendimentoAtividades = (
      await request(app.getHttpServer())
        .post('/api/atendimento-atividades')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update atendimento-atividades', async () => {
    const updatedEntity: AtendimentoAtividades = (
      await request(app.getHttpServer())
        .put('/api/atendimento-atividades')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE atendimento-atividades', async () => {
    const deletedEntity: AtendimentoAtividades = (
      await request(app.getHttpServer())
        .delete('/api/atendimento-atividades/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
