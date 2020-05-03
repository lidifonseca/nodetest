import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import ProntuarioTipoMotivo from '../../domain/prontuario-tipo-motivo.entity';
import { ProntuarioTipoMotivoService } from '../../service/prontuario-tipo-motivo.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/prontuario-tipo-motivos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('prontuario-tipo-motivos')
export class ProntuarioTipoMotivoController {
  logger = new Logger('ProntuarioTipoMotivoController');

  constructor(private readonly prontuarioTipoMotivoService: ProntuarioTipoMotivoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ProntuarioTipoMotivo
  })
  async getAll(@Req() req: Request): Promise<ProntuarioTipoMotivo[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.prontuarioTipoMotivoService.findAndCount(
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
    type: ProntuarioTipoMotivo
  })
  async getOne(@Param('id') id: string): Promise<ProntuarioTipoMotivo> {
    return await this.prontuarioTipoMotivoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create prontuarioTipoMotivo' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ProntuarioTipoMotivo
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() prontuarioTipoMotivo: ProntuarioTipoMotivo): Promise<ProntuarioTipoMotivo> {
    const created = await this.prontuarioTipoMotivoService.save(prontuarioTipoMotivo);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProntuarioTipoMotivo', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update prontuarioTipoMotivo' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ProntuarioTipoMotivo
  })
  async put(@Req() req: Request, @Body() prontuarioTipoMotivo: ProntuarioTipoMotivo): Promise<ProntuarioTipoMotivo> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProntuarioTipoMotivo', prontuarioTipoMotivo.id);
    return await this.prontuarioTipoMotivoService.update(prontuarioTipoMotivo);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete prontuarioTipoMotivo' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<ProntuarioTipoMotivo> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ProntuarioTipoMotivo', id);
    const toDelete = await this.prontuarioTipoMotivoService.findById(id);
    return await this.prontuarioTipoMotivoService.delete(toDelete);
  }
}
