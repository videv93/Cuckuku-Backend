import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { PostDTO } from '../src/service/dto/post.dto';
import { PostService } from '../src/service/post.service';

describe('Post Controller', () => {
    let app: INestApplication;

    const authGuardMock = { canActivate: (): any => true };
    const rolesGuardMock = { canActivate: (): any => true };
    const entityMock: any = {
        id: 'entityId',
    };

    const serviceMock = {
        findById: (): any => entityMock,
        findAndCount: (): any => [entityMock, 0],
        save: (): any => entityMock,
        update: (): any => entityMock,
        deleteById: (): any => entityMock,
    };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideGuard(AuthGuard)
            .useValue(authGuardMock)
            .overrideGuard(RolesGuard)
            .useValue(rolesGuardMock)
            .overrideProvider(PostService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all posts ', async () => {
        const getEntities: PostDTO[] = (await request(app.getHttpServer()).get('/api/posts').expect(200)).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET posts by id', async () => {
        const getEntity: PostDTO = (
            await request(app.getHttpServer())
                .get('/api/posts/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create posts', async () => {
        const createdEntity: PostDTO = (
            await request(app.getHttpServer()).post('/api/posts').send(entityMock).expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update posts', async () => {
        const updatedEntity: PostDTO = (
            await request(app.getHttpServer()).put('/api/posts').send(entityMock).expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update posts from id', async () => {
        const updatedEntity: PostDTO = (
            await request(app.getHttpServer())
                .put('/api/posts/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE posts', async () => {
        const deletedEntity: PostDTO = (
            await request(app.getHttpServer())
                .delete('/api/posts/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
