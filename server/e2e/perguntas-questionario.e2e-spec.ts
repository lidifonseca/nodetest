import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import PerguntasQuestionario from '../src/domain/perguntas-questionario.entity';
import { PerguntasQuestionarioService } from '../src/service/perguntas-questionario.service';

describe('PerguntasQuestionario Controller', () => {
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
      .overrideProvider(PerguntasQuestionarioService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all perguntas-questionarios ', async () => {
    const getEntities: PerguntasQuestionario[] = (
      await request(app.getHttpServer())
        .get('/api/perguntas-questionarios')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET perguntas-questionarios by id', async () => {
    const getEntity: PerguntasQuestionario = (
      await request(app.getHttpServer())
        .get('/api/perguntas-questionarios/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create perguntas-questionarios', async () => {
    const createdEntity: PerguntasQuestionario = (
      await request(app.getHttpServer())
        .post('/api/perguntas-questionarios')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update perguntas-questionarios', async () => {
    const updatedEntity: PerguntasQuestionario = (
      await request(app.getHttpServer())
        .put('/api/perguntas-questionarios')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE perguntas-questionarios', async () => {
    const deletedEntity: PerguntasQuestionario = (
      await request(app.getHttpServer())
        .delete('/api/perguntas-questionarios/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
