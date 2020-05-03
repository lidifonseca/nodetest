import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import GrauParentesco from '../src/domain/grau-parentesco.entity';
import { GrauParentescoService } from '../src/service/grau-parentesco.service';

describe('GrauParentesco Controller', () => {
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
      .overrideProvider(GrauParentescoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all grau-parentescos ', async () => {
    const getEntities: GrauParentesco[] = (
      await request(app.getHttpServer())
        .get('/api/grau-parentescos')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET grau-parentescos by id', async () => {
    const getEntity: GrauParentesco = (
      await request(app.getHttpServer())
        .get('/api/grau-parentescos/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create grau-parentescos', async () => {
    const createdEntity: GrauParentesco = (
      await request(app.getHttpServer())
        .post('/api/grau-parentescos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update grau-parentescos', async () => {
    const updatedEntity: GrauParentesco = (
      await request(app.getHttpServer())
        .put('/api/grau-parentescos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE grau-parentescos', async () => {
    const deletedEntity: GrauParentesco = (
      await request(app.getHttpServer())
        .delete('/api/grau-parentescos/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
