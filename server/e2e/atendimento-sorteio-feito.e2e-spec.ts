import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import AtendimentoSorteioFeito from '../src/domain/atendimento-sorteio-feito.entity';
import { AtendimentoSorteioFeitoService } from '../src/service/atendimento-sorteio-feito.service';

describe('AtendimentoSorteioFeito Controller', () => {
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
      .overrideProvider(AtendimentoSorteioFeitoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all atendimento-sorteio-feitos ', async () => {
    const getEntities: AtendimentoSorteioFeito[] = (
      await request(app.getHttpServer())
        .get('/api/atendimento-sorteio-feitos')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET atendimento-sorteio-feitos by id', async () => {
    const getEntity: AtendimentoSorteioFeito = (
      await request(app.getHttpServer())
        .get('/api/atendimento-sorteio-feitos/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create atendimento-sorteio-feitos', async () => {
    const createdEntity: AtendimentoSorteioFeito = (
      await request(app.getHttpServer())
        .post('/api/atendimento-sorteio-feitos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update atendimento-sorteio-feitos', async () => {
    const updatedEntity: AtendimentoSorteioFeito = (
      await request(app.getHttpServer())
        .put('/api/atendimento-sorteio-feitos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE atendimento-sorteio-feitos', async () => {
    const deletedEntity: AtendimentoSorteioFeito = (
      await request(app.getHttpServer())
        .delete('/api/atendimento-sorteio-feitos/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
