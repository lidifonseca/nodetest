import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import TipoPreferenciaAtendimento from '../../domain/tipo-preferencia-atendimento.entity';
import { TipoPreferenciaAtendimentoService } from '../../service/tipo-preferencia-atendimento.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/tipo-preferencia-atendimentos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('tipo-preferencia-atendimentos')
export class TipoPreferenciaAtendimentoController {
  logger = new Logger('TipoPreferenciaAtendimentoController');

  constructor(private readonly tipoPreferenciaAtendimentoService: TipoPreferenciaAtendimentoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: TipoPreferenciaAtendimento
  })
  async getAll(@Req() req: Request): Promise<TipoPreferenciaAtendimento[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.tipoPreferenciaAtendimentoService.findAndCount(
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
    type: TipoPreferenciaAtendimento
  })
  async getOne(@Param('id') id: string): Promise<TipoPreferenciaAtendimento> {
    return await this.tipoPreferenciaAtendimentoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create tipoPreferenciaAtendimento' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: TipoPreferenciaAtendimento
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() tipoPreferenciaAtendimento: TipoPreferenciaAtendimento): Promise<TipoPreferenciaAtendimento> {
    const created = await this.tipoPreferenciaAtendimentoService.save(tipoPreferenciaAtendimento);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'TipoPreferenciaAtendimento', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update tipoPreferenciaAtendimento' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: TipoPreferenciaAtendimento
  })
  async put(@Req() req: Request, @Body() tipoPreferenciaAtendimento: TipoPreferenciaAtendimento): Promise<TipoPreferenciaAtendimento> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'TipoPreferenciaAtendimento', tipoPreferenciaAtendimento.id);
    return await this.tipoPreferenciaAtendimentoService.update(tipoPreferenciaAtendimento);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete tipoPreferenciaAtendimento' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<TipoPreferenciaAtendimento> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'TipoPreferenciaAtendimento', id);
    const toDelete = await this.tipoPreferenciaAtendimentoService.findById(id);
    return await this.tipoPreferenciaAtendimentoService.delete(toDelete);
  }
}
