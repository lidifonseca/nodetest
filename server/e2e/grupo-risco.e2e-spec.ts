import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import GrupoRisco from '../src/domain/grupo-risco.entity';
import { GrupoRiscoService } from '../src/service/grupo-risco.service';

describe('GrupoRisco Controller', () => {
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
      .overrideProvider(GrupoRiscoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all grupo-riscos ', async () => {
    const getEntities: GrupoRisco[] = (
      await request(app.getHttpServer())
        .get('/api/grupo-riscos')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET grupo-riscos by id', async () => {
    const getEntity: GrupoRisco = (
      await request(app.getHttpServer())
        .get('/api/grupo-riscos/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create grupo-riscos', async () => {
    const createdEntity: GrupoRisco = (
      await request(app.getHttpServer())
        .post('/api/grupo-riscos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update grupo-riscos', async () => {
    const updatedEntity: GrupoRisco = (
      await request(app.getHttpServer())
        .put('/api/grupo-riscos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE grupo-riscos', async () => {
    const deletedEntity: GrupoRisco = (
      await request(app.getHttpServer())
        .delete('/api/grupo-riscos/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
