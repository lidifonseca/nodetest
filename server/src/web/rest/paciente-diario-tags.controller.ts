import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PacienteDiarioTags from '../../domain/paciente-diario-tags.entity';
import { PacienteDiarioTagsService } from '../../service/paciente-diario-tags.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/paciente-diario-tags')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('paciente-diario-tags')
export class PacienteDiarioTagsController {
  logger = new Logger('PacienteDiarioTagsController');

  constructor(private readonly pacienteDiarioTagsService: PacienteDiarioTagsService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PacienteDiarioTags
  })
  async getAll(@Req() req: Request): Promise<PacienteDiarioTags[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.pacienteDiarioTagsService.findAndCount(
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
    type: PacienteDiarioTags
  })
  async getOne(@Param('id') id: string): Promise<PacienteDiarioTags> {
    return await this.pacienteDiarioTagsService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create pacienteDiarioTags' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PacienteDiarioTags
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() pacienteDiarioTags: PacienteDiarioTags): Promise<PacienteDiarioTags> {
    console.info(pacienteDiarioTags);
    const created = await this.pacienteDiarioTagsService.save(pacienteDiarioTags);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacienteDiarioTags', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update pacienteDiarioTags' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PacienteDiarioTags
  })
  async put(@Req() req: Request, @Body() pacienteDiarioTags: PacienteDiarioTags): Promise<PacienteDiarioTags> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacienteDiarioTags', pacienteDiarioTags.id);

    return await this.pacienteDiarioTagsService.update(pacienteDiarioTags);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete pacienteDiarioTags' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PacienteDiarioTags> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PacienteDiarioTags', id);
    const toDelete = await this.pacienteDiarioTagsService.findById(id);
    return await this.pacienteDiarioTagsService.delete(toDelete);
  }
}
