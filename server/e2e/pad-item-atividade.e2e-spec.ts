import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import PadItemAtividade from '../src/domain/pad-item-atividade.entity';
import { PadItemAtividadeService } from '../src/service/pad-item-atividade.service';

describe('PadItemAtividade Controller', () => {
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
      .overrideProvider(PadItemAtividadeService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all pad-item-atividades ', async () => {
    const getEntities: PadItemAtividade[] = (
      await request(app.getHttpServer())
        .get('/api/pad-item-atividades')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET pad-item-atividades by id', async () => {
    const getEntity: PadItemAtividade = (
      await request(app.getHttpServer())
        .get('/api/pad-item-atividades/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create pad-item-atividades', async () => {
    const createdEntity: PadItemAtividade = (
      await request(app.getHttpServer())
        .post('/api/pad-item-atividades')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update pad-item-atividades', async () => {
    const updatedEntity: PadItemAtividade = (
      await request(app.getHttpServer())
        .put('/api/pad-item-atividades')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE pad-item-atividades', async () => {
    const deletedEntity: PadItemAtividade = (
      await request(app.getHttpServer())
        .delete('/api/pad-item-atividades/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
