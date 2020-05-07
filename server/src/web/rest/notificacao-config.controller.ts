import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import NotificacaoConfig from '../../domain/notificacao-config.entity';
import { NotificacaoConfigService } from '../../service/notificacao-config.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/notificacao-configs')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('notificacao-configs')
export class NotificacaoConfigController {
  logger = new Logger('NotificacaoConfigController');

  constructor(private readonly notificacaoConfigService: NotificacaoConfigService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: NotificacaoConfig
  })
  async getAll(@Req() req: Request): Promise<NotificacaoConfig[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.notificacaoConfigService.findAndCount(
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
    type: NotificacaoConfig
  })
  async getOne(@Param('id') id: string): Promise<NotificacaoConfig> {
    return await this.notificacaoConfigService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create notificacaoConfig' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: NotificacaoConfig
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() notificacaoConfig: NotificacaoConfig): Promise<NotificacaoConfig> {
    console.info(notificacaoConfig);
    const created = await this.notificacaoConfigService.save(notificacaoConfig);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'NotificacaoConfig', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update notificacaoConfig' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: NotificacaoConfig
  })
  async put(@Req() req: Request, @Body() notificacaoConfig: NotificacaoConfig): Promise<NotificacaoConfig> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'NotificacaoConfig', notificacaoConfig.id);

    return await this.notificacaoConfigService.update(notificacaoConfig);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete notificacaoConfig' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<NotificacaoConfig> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'NotificacaoConfig', id);
    const toDelete = await this.notificacaoConfigService.findById(id);
    return await this.notificacaoConfigService.delete(toDelete);
  }
}
