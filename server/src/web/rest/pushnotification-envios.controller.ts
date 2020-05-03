import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PushnotificationEnvios from '../../domain/pushnotification-envios.entity';
import { PushnotificationEnviosService } from '../../service/pushnotification-envios.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/pushnotification-envios')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('pushnotification-envios')
export class PushnotificationEnviosController {
  logger = new Logger('PushnotificationEnviosController');

  constructor(private readonly pushnotificationEnviosService: PushnotificationEnviosService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PushnotificationEnvios
  })
  async getAll(@Req() req: Request): Promise<PushnotificationEnvios[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.pushnotificationEnviosService.findAndCount(
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
    type: PushnotificationEnvios
  })
  async getOne(@Param('id') id: string): Promise<PushnotificationEnvios> {
    return await this.pushnotificationEnviosService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create pushnotificationEnvios' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PushnotificationEnvios
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() pushnotificationEnvios: PushnotificationEnvios): Promise<PushnotificationEnvios> {
    const created = await this.pushnotificationEnviosService.save(pushnotificationEnvios);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PushnotificationEnvios', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update pushnotificationEnvios' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PushnotificationEnvios
  })
  async put(@Req() req: Request, @Body() pushnotificationEnvios: PushnotificationEnvios): Promise<PushnotificationEnvios> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PushnotificationEnvios', pushnotificationEnvios.id);
    return await this.pushnotificationEnviosService.update(pushnotificationEnvios);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete pushnotificationEnvios' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PushnotificationEnvios> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PushnotificationEnvios', id);
    const toDelete = await this.pushnotificationEnviosService.findById(id);
    return await this.pushnotificationEnviosService.delete(toDelete);
  }
}
