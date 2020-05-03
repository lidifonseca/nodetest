import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Servico from '../../domain/servico.entity';
import { ServicoService } from '../../service/servico.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/servicos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('servicos')
export class ServicoController {
  logger = new Logger('ServicoController');

  constructor(private readonly servicoService: ServicoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Servico
  })
  async getAll(@Req() req: Request): Promise<Servico[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.servicoService.findAndCount(
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
    type: Servico
  })
  async getOne(@Param('id') id: string): Promise<Servico> {
    return await this.servicoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create servico' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Servico
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() servico: Servico): Promise<Servico> {
    const created = await this.servicoService.save(servico);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Servico', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update servico' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Servico
  })
  async put(@Req() req: Request, @Body() servico: Servico): Promise<Servico> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Servico', servico.id);
    return await this.servicoService.update(servico);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete servico' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Servico> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Servico', id);
    const toDelete = await this.servicoService.findById(id);
    return await this.servicoService.delete(toDelete);
  }
}
