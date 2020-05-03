import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import PacienteDiarioTags from '../src/domain/paciente-diario-tags.entity';
import { PacienteDiarioTagsService } from '../src/service/paciente-diario-tags.service';

describe('PacienteDiarioTags Controller', () => {
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
      .overrideProvider(PacienteDiarioTagsService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all paciente-diario-tags ', async () => {
    const getEntities: PacienteDiarioTags[] = (
      await request(app.getHttpServer())
        .get('/api/paciente-diario-tags')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET paciente-diario-tags by id', async () => {
    const getEntity: PacienteDiarioTags = (
      await request(app.getHttpServer())
        .get('/api/paciente-diario-tags/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create paciente-diario-tags', async () => {
    const createdEntity: PacienteDiarioTags = (
      await request(app.getHttpServer())
        .post('/api/paciente-diario-tags')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update paciente-diario-tags', async () => {
    const updatedEntity: PacienteDiarioTags = (
      await request(app.getHttpServer())
        .put('/api/paciente-diario-tags')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE paciente-diario-tags', async () => {
    const deletedEntity: PacienteDiarioTags = (
      await request(app.getHttpServer())
        .delete('/api/paciente-diario-tags/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
