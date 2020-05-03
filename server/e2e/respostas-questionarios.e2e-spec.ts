import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import RespostasQuestionarios from '../src/domain/respostas-questionarios.entity';
import { RespostasQuestionariosService } from '../src/service/respostas-questionarios.service';

describe('RespostasQuestionarios Controller', () => {
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
      .overrideProvider(RespostasQuestionariosService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all respostas-questionarios ', async () => {
    const getEntities: RespostasQuestionarios[] = (
      await request(app.getHttpServer())
        .get('/api/respostas-questionarios')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET respostas-questionarios by id', async () => {
    const getEntity: RespostasQuestionarios = (
      await request(app.getHttpServer())
        .get('/api/respostas-questionarios/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create respostas-questionarios', async () => {
    const createdEntity: RespostasQuestionarios = (
      await request(app.getHttpServer())
        .post('/api/respostas-questionarios')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update respostas-questionarios', async () => {
    const updatedEntity: RespostasQuestionarios = (
      await request(app.getHttpServer())
        .put('/api/respostas-questionarios')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE respostas-questionarios', async () => {
    const deletedEntity: RespostasQuestionarios = (
      await request(app.getHttpServer())
        .delete('/api/respostas-questionarios/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
