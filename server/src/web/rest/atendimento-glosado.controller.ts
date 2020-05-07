import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import AtendimentoGlosado from '../../domain/atendimento-glosado.entity';
import { AtendimentoGlosadoService } from '../../service/atendimento-glosado.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/atendimento-glosados')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('atendimento-glosados')
export class AtendimentoGlosadoController {
  logger = new Logger('AtendimentoGlosadoController');

  constructor(private readonly atendimentoGlosadoService: AtendimentoGlosadoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: AtendimentoGlosado
  })
  async getAll(@Req() req: Request): Promise<AtendimentoGlosado[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.atendimentoGlosadoService.findAndCount(
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
    type: AtendimentoGlosado
  })
  async getOne(@Param('id') id: string): Promise<AtendimentoGlosado> {
    return await this.atendimentoGlosadoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create atendimentoGlosado' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: AtendimentoGlosado
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() atendimentoGlosado: AtendimentoGlosado): Promise<AtendimentoGlosado> {
    console.info(atendimentoGlosado);
    const created = await this.atendimentoGlosadoService.save(atendimentoGlosado);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'AtendimentoGlosado', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update atendimentoGlosado' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: AtendimentoGlosado
  })
  async put(@Req() req: Request, @Body() atendimentoGlosado: AtendimentoGlosado): Promise<AtendimentoGlosado> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'AtendimentoGlosado', atendimentoGlosado.id);

    return await this.atendimentoGlosadoService.update(atendimentoGlosado);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete atendimentoGlosado' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<AtendimentoGlosado> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'AtendimentoGlosado', id);
    const toDelete = await this.atendimentoGlosadoService.findById(id);
    return await this.atendimentoGlosadoService.delete(toDelete);
  }
}
