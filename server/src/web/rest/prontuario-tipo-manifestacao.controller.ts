import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import ProntuarioTipoManifestacao from '../../domain/prontuario-tipo-manifestacao.entity';
import { ProntuarioTipoManifestacaoService } from '../../service/prontuario-tipo-manifestacao.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/prontuario-tipo-manifestacaos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('prontuario-tipo-manifestacaos')
export class ProntuarioTipoManifestacaoController {
  logger = new Logger('ProntuarioTipoManifestacaoController');

  constructor(private readonly prontuarioTipoManifestacaoService: ProntuarioTipoManifestacaoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ProntuarioTipoManifestacao
  })
  async getAll(@Req() req: Request): Promise<ProntuarioTipoManifestacao[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.prontuarioTipoManifestacaoService.findAndCount(
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
    type: ProntuarioTipoManifestacao
  })
  async getOne(@Param('id') id: string): Promise<ProntuarioTipoManifestacao> {
    return await this.prontuarioTipoManifestacaoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create prontuarioTipoManifestacao' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ProntuarioTipoManifestacao
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() prontuarioTipoManifestacao: ProntuarioTipoManifestacao): Promise<ProntuarioTipoManifestacao> {
    const created = await this.prontuarioTipoManifestacaoService.save(prontuarioTipoManifestacao);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProntuarioTipoManifestacao', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update prontuarioTipoManifestacao' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ProntuarioTipoManifestacao
  })
  async put(@Req() req: Request, @Body() prontuarioTipoManifestacao: ProntuarioTipoManifestacao): Promise<ProntuarioTipoManifestacao> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProntuarioTipoManifestacao', prontuarioTipoManifestacao.id);
    return await this.prontuarioTipoManifestacaoService.update(prontuarioTipoManifestacao);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete prontuarioTipoManifestacao' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<ProntuarioTipoManifestacao> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ProntuarioTipoManifestacao', id);
    const toDelete = await this.prontuarioTipoManifestacaoService.findById(id);
    return await this.prontuarioTipoManifestacaoService.delete(toDelete);
  }
}
