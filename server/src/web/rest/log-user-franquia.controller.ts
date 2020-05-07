import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import LogUserFranquia from '../../domain/log-user-franquia.entity';
import { LogUserFranquiaService } from '../../service/log-user-franquia.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/log-user-franquias')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('log-user-franquias')
export class LogUserFranquiaController {
  logger = new Logger('LogUserFranquiaController');

  constructor(private readonly logUserFranquiaService: LogUserFranquiaService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: LogUserFranquia
  })
  async getAll(@Req() req: Request): Promise<LogUserFranquia[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.logUserFranquiaService.findAndCount(
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
    type: LogUserFranquia
  })
  async getOne(@Param('id') id: string): Promise<LogUserFranquia> {
    return await this.logUserFranquiaService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create logUserFranquia' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: LogUserFranquia
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() logUserFranquia: LogUserFranquia): Promise<LogUserFranquia> {
    console.info(logUserFranquia);
    const created = await this.logUserFranquiaService.save(logUserFranquia);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'LogUserFranquia', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update logUserFranquia' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: LogUserFranquia
  })
  async put(@Req() req: Request, @Body() logUserFranquia: LogUserFranquia): Promise<LogUserFranquia> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'LogUserFranquia', logUserFranquia.id);

    return await this.logUserFranquiaService.update(logUserFranquia);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete logUserFranquia' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<LogUserFranquia> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'LogUserFranquia', id);
    const toDelete = await this.logUserFranquiaService.findById(id);
    return await this.logUserFranquiaService.delete(toDelete);
  }
}
