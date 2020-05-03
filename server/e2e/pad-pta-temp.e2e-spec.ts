import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import PadPtaTemp from '../src/domain/pad-pta-temp.entity';
import { PadPtaTempService } from '../src/service/pad-pta-temp.service';

describe('PadPtaTemp Controller', () => {
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
      .overrideProvider(PadPtaTempService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all pad-pta-temps ', async () => {
    const getEntities: PadPtaTemp[] = (
      await request(app.getHttpServer())
        .get('/api/pad-pta-temps')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET pad-pta-temps by id', async () => {
    const getEntity: PadPtaTemp = (
      await request(app.getHttpServer())
        .get('/api/pad-pta-temps/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create pad-pta-temps', async () => {
    const createdEntity: PadPtaTemp = (
      await request(app.getHttpServer())
        .post('/api/pad-pta-temps')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update pad-pta-temps', async () => {
    const updatedEntity: PadPtaTemp = (
      await request(app.getHttpServer())
        .put('/api/pad-pta-temps')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE pad-pta-temps', async () => {
    const deletedEntity: PadPtaTemp = (
      await request(app.getHttpServer())
        .delete('/api/pad-pta-temps/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
