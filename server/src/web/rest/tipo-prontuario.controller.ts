import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import TipoProntuario from '../../domain/tipo-prontuario.entity';
import { TipoProntuarioService } from '../../service/tipo-prontuario.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/tipo-prontuarios')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('tipo-prontuarios')
export class TipoProntuarioController {
  logger = new Logger('TipoProntuarioController');

  constructor(private readonly tipoProntuarioService: TipoProntuarioService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: TipoProntuario
  })
  async getAll(@Req() req: Request): Promise<TipoProntuario[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.tipoProntuarioService.findAndCount(
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
    type: TipoProntuario
  })
  async getOne(@Param('id') id: string): Promise<TipoProntuario> {
    return await this.tipoProntuarioService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create tipoProntuario' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: TipoProntuario
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() tipoProntuario: TipoProntuario): Promise<TipoProntuario> {
    const created = await this.tipoProntuarioService.save(tipoProntuario);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'TipoProntuario', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update tipoProntuario' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: TipoProntuario
  })
  async put(@Req() req: Request, @Body() tipoProntuario: TipoProntuario): Promise<TipoProntuario> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'TipoProntuario', tipoProntuario.id);
    return await this.tipoProntuarioService.update(tipoProntuario);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete tipoProntuario' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<TipoProntuario> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'TipoProntuario', id);
    const toDelete = await this.tipoProntuarioService.findById(id);
    return await this.tipoProntuarioService.delete(toDelete);
  }
}
