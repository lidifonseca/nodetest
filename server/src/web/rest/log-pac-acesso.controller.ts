import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import LogPacAcesso from '../../domain/log-pac-acesso.entity';
import { LogPacAcessoService } from '../../service/log-pac-acesso.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/log-pac-acessos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('log-pac-acessos')
export class LogPacAcessoController {
  logger = new Logger('LogPacAcessoController');

  constructor(private readonly logPacAcessoService: LogPacAcessoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: LogPacAcesso
  })
  async getAll(@Req() req: Request): Promise<LogPacAcesso[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.logPacAcessoService.findAndCount(
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
    type: LogPacAcesso
  })
  async getOne(@Param('id') id: string): Promise<LogPacAcesso> {
    return await this.logPacAcessoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create logPacAcesso' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: LogPacAcesso
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() logPacAcesso: LogPacAcesso): Promise<LogPacAcesso> {
    console.info(logPacAcesso);
    const created = await this.logPacAcessoService.save(logPacAcesso);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'LogPacAcesso', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update logPacAcesso' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: LogPacAcesso
  })
  async put(@Req() req: Request, @Body() logPacAcesso: LogPacAcesso): Promise<LogPacAcesso> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'LogPacAcesso', logPacAcesso.id);

    return await this.logPacAcessoService.update(logPacAcesso);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete logPacAcesso' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<LogPacAcesso> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'LogPacAcesso', id);
    const toDelete = await this.logPacAcessoService.findById(id);
    return await this.logPacAcessoService.delete(toDelete);
  }
}
