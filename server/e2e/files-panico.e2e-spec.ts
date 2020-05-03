import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import FilesPanico from '../src/domain/files-panico.entity';
import { FilesPanicoService } from '../src/service/files-panico.service';

describe('FilesPanico Controller', () => {
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
      .overrideProvider(FilesPanicoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all files-panicos ', async () => {
    const getEntities: FilesPanico[] = (
      await request(app.getHttpServer())
        .get('/api/files-panicos')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET files-panicos by id', async () => {
    const getEntity: FilesPanico = (
      await request(app.getHttpServer())
        .get('/api/files-panicos/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create files-panicos', async () => {
    const createdEntity: FilesPanico = (
      await request(app.getHttpServer())
        .post('/api/files-panicos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update files-panicos', async () => {
    const updatedEntity: FilesPanico = (
      await request(app.getHttpServer())
        .put('/api/files-panicos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE files-panicos', async () => {
    const deletedEntity: FilesPanico = (
      await request(app.getHttpServer())
        .delete('/api/files-panicos/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
