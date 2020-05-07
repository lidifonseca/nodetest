import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import DiarioTags from '../../domain/diario-tags.entity';
import { DiarioTagsService } from '../../service/diario-tags.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/diario-tags')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('diario-tags')
export class DiarioTagsController {
  logger = new Logger('DiarioTagsController');

  constructor(private readonly diarioTagsService: DiarioTagsService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: DiarioTags
  })
  async getAll(@Req() req: Request): Promise<DiarioTags[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.diarioTagsService.findAndCount(
      {
        skip: +pageRequest.page * pageRequest.size,
        take: +pageRequest.size,
        order: pageRequest.sort.asOrder()
      },
      filters
    );
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: DiarioTags
  })
  async getOne(@Param('id') id: string): Promise<DiarioTags> {
    return await this.diarioTagsService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create diarioTags' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: DiarioTags
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() diarioTags: DiarioTags): Promise<DiarioTags> {
    console.info(diarioTags);
    const created = await this.diarioTagsService.save(diarioTags);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'DiarioTags', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update diarioTags' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: DiarioTags
  })
  async put(@Req() req: Request, @Body() diarioTags: DiarioTags): Promise<DiarioTags> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'DiarioTags', diarioTags.id);

    return await this.diarioTagsService.update(diarioTags);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete diarioTags' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<DiarioTags> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'DiarioTags', id);
    const toDelete = await this.diarioTagsService.findById(id);
    return await this.diarioTagsService.delete(toDelete);
  }
}
