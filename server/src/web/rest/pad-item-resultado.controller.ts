import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PadItemResultado from '../../domain/pad-item-resultado.entity';
import { PadItemResultadoService } from '../../service/pad-item-resultado.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/pad-item-resultados')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('pad-item-resultados')
export class PadItemResultadoController {
  logger = new Logger('PadItemResultadoController');

  constructor(private readonly padItemResultadoService: PadItemResultadoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PadItemResultado
  })
  async getAll(@Req() req: Request): Promise<PadItemResultado[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.padItemResultadoService.findAndCount(
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
    type: PadItemResultado
  })
  async getOne(@Param('id') id: string): Promise<PadItemResultado> {
    return await this.padItemResultadoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create padItemResultado' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PadItemResultado
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() padItemResultado: PadItemResultado): Promise<PadItemResultado> {
    console.info(padItemResultado);
    const created = await this.padItemResultadoService.save(padItemResultado);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PadItemResultado', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update padItemResultado' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PadItemResultado
  })
  async put(@Req() req: Request, @Body() padItemResultado: PadItemResultado): Promise<PadItemResultado> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PadItemResultado', padItemResultado.id);

    return await this.padItemResultadoService.update(padItemResultado);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete padItemResultado' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PadItemResultado> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PadItemResultado', id);
    const toDelete = await this.padItemResultadoService.findById(id);
    return await this.padItemResultadoService.delete(toDelete);
  }
}
