import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import AtendimentoAtividades from '../../domain/atendimento-atividades.entity';
import { AtendimentoAtividadesService } from '../../service/atendimento-atividades.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/atendimento-atividades')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('atendimento-atividades')
export class AtendimentoAtividadesController {
  logger = new Logger('AtendimentoAtividadesController');

  constructor(private readonly atendimentoAtividadesService: AtendimentoAtividadesService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: AtendimentoAtividades
  })
  async getAll(@Req() req: Request): Promise<AtendimentoAtividades[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.atendimentoAtividadesService.findAndCount(
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
    type: AtendimentoAtividades
  })
  async getOne(@Param('id') id: string): Promise<AtendimentoAtividades> {
    return await this.atendimentoAtividadesService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create atendimentoAtividades' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: AtendimentoAtividades
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() atendimentoAtividades: AtendimentoAtividades): Promise<AtendimentoAtividades> {
    console.info(atendimentoAtividades);
    const created = await this.atendimentoAtividadesService.save(atendimentoAtividades);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'AtendimentoAtividades', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update atendimentoAtividades' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: AtendimentoAtividades
  })
  async put(@Req() req: Request, @Body() atendimentoAtividades: AtendimentoAtividades): Promise<AtendimentoAtividades> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'AtendimentoAtividades', atendimentoAtividades.id);

    return await this.atendimentoAtividadesService.update(atendimentoAtividades);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete atendimentoAtividades' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<AtendimentoAtividades> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'AtendimentoAtividades', id);
    const toDelete = await this.atendimentoAtividadesService.findById(id);
    return await this.atendimentoAtividadesService.delete(toDelete);
  }
}
