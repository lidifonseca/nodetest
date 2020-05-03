import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import DiarioTags from '../src/domain/diario-tags.entity';
import { DiarioTagsService } from '../src/service/diario-tags.service';

describe('DiarioTags Controller', () => {
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
      .overrideProvider(DiarioTagsService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all diario-tags ', async () => {
    const getEntities: DiarioTags[] = (
      await request(app.getHttpServer())
        .get('/api/diario-tags')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET diario-tags by id', async () => {
    const getEntity: DiarioTags = (
      await request(app.getHttpServer())
        .get('/api/diario-tags/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create diario-tags', async () => {
    const createdEntity: DiarioTags = (
      await request(app.getHttpServer())
        .post('/api/diario-tags')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update diario-tags', async () => {
    const updatedEntity: DiarioTags = (
      await request(app.getHttpServer())
        .put('/api/diario-tags')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE diario-tags', async () => {
    const deletedEntity: DiarioTags = (
      await request(app.getHttpServer())
        .delete('/api/diario-tags/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
