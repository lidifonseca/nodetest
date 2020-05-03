import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import MotivoInternacao from '../../domain/motivo-internacao.entity';
import { MotivoInternacaoService } from '../../service/motivo-internacao.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/motivo-internacaos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('motivo-internacaos')
export class MotivoInternacaoController {
  logger = new Logger('MotivoInternacaoController');

  constructor(private readonly motivoInternacaoService: MotivoInternacaoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: MotivoInternacao
  })
  async getAll(@Req() req: Request): Promise<MotivoInternacao[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.motivoInternacaoService.findAndCount(
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
    type: MotivoInternacao
  })
  async getOne(@Param('id') id: string): Promise<MotivoInternacao> {
    return await this.motivoInternacaoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create motivoInternacao' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: MotivoInternacao
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() motivoInternacao: MotivoInternacao): Promise<MotivoInternacao> {
    const created = await this.motivoInternacaoService.save(motivoInternacao);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'MotivoInternacao', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update motivoInternacao' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: MotivoInternacao
  })
  async put(@Req() req: Request, @Body() motivoInternacao: MotivoInternacao): Promise<MotivoInternacao> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'MotivoInternacao', motivoInternacao.id);
    return await this.motivoInternacaoService.update(motivoInternacao);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete motivoInternacao' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<MotivoInternacao> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'MotivoInternacao', id);
    const toDelete = await this.motivoInternacaoService.findById(id);
    return await this.motivoInternacaoService.delete(toDelete);
  }
}
