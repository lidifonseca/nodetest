import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import UnidadeMedida from '../../domain/unidade-medida.entity';
import { UnidadeMedidaService } from '../../service/unidade-medida.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/unidade-medidas')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('unidade-medidas')
export class UnidadeMedidaController {
  logger = new Logger('UnidadeMedidaController');

  constructor(private readonly unidadeMedidaService: UnidadeMedidaService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: UnidadeMedida
  })
  async getAll(@Req() req: Request): Promise<UnidadeMedida[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.unidadeMedidaService.findAndCount(
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
    type: UnidadeMedida
  })
  async getOne(@Param('id') id: string): Promise<UnidadeMedida> {
    return await this.unidadeMedidaService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create unidadeMedida' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: UnidadeMedida
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() unidadeMedida: UnidadeMedida): Promise<UnidadeMedida> {
    console.info(unidadeMedida);
    const created = await this.unidadeMedidaService.save(unidadeMedida);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'UnidadeMedida', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update unidadeMedida' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: UnidadeMedida
  })
  async put(@Req() req: Request, @Body() unidadeMedida: UnidadeMedida): Promise<UnidadeMedida> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'UnidadeMedida', unidadeMedida.id);

    return await this.unidadeMedidaService.update(unidadeMedida);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete unidadeMedida' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<UnidadeMedida> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'UnidadeMedida', id);
    const toDelete = await this.unidadeMedidaService.findById(id);
    return await this.unidadeMedidaService.delete(toDelete);
  }
}
