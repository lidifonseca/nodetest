import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import CepbrEstado from '../../domain/cepbr-estado.entity';
import { CepbrEstadoService } from '../../service/cepbr-estado.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/cepbr-estados')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('cepbr-estados')
export class CepbrEstadoController {
  logger = new Logger('CepbrEstadoController');

  constructor(private readonly cepbrEstadoService: CepbrEstadoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: CepbrEstado
  })
  async getAll(@Req() req: Request): Promise<CepbrEstado[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.cepbrEstadoService.findAndCount(
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
    type: CepbrEstado
  })
  async getOne(@Param('id') id: string): Promise<CepbrEstado> {
    return await this.cepbrEstadoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create cepbrEstado' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CepbrEstado
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() cepbrEstado: CepbrEstado): Promise<CepbrEstado> {
    const created = await this.cepbrEstadoService.save(cepbrEstado);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'CepbrEstado', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update cepbrEstado' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: CepbrEstado
  })
  async put(@Req() req: Request, @Body() cepbrEstado: CepbrEstado): Promise<CepbrEstado> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'CepbrEstado', cepbrEstado.id);
    return await this.cepbrEstadoService.update(cepbrEstado);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete cepbrEstado' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<CepbrEstado> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'CepbrEstado', id);
    const toDelete = await this.cepbrEstadoService.findById(id);
    return await this.cepbrEstadoService.delete(toDelete);
  }
}
