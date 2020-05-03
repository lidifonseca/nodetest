import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PadItemCepRecusado from '../../domain/pad-item-cep-recusado.entity';
import { PadItemCepRecusadoService } from '../../service/pad-item-cep-recusado.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/pad-item-cep-recusados')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('pad-item-cep-recusados')
export class PadItemCepRecusadoController {
  logger = new Logger('PadItemCepRecusadoController');

  constructor(private readonly padItemCepRecusadoService: PadItemCepRecusadoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PadItemCepRecusado
  })
  async getAll(@Req() req: Request): Promise<PadItemCepRecusado[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.padItemCepRecusadoService.findAndCount(
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
    type: PadItemCepRecusado
  })
  async getOne(@Param('id') id: string): Promise<PadItemCepRecusado> {
    return await this.padItemCepRecusadoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create padItemCepRecusado' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PadItemCepRecusado
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() padItemCepRecusado: PadItemCepRecusado): Promise<PadItemCepRecusado> {
    const created = await this.padItemCepRecusadoService.save(padItemCepRecusado);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PadItemCepRecusado', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update padItemCepRecusado' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PadItemCepRecusado
  })
  async put(@Req() req: Request, @Body() padItemCepRecusado: PadItemCepRecusado): Promise<PadItemCepRecusado> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PadItemCepRecusado', padItemCepRecusado.id);
    return await this.padItemCepRecusadoService.update(padItemCepRecusado);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete padItemCepRecusado' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PadItemCepRecusado> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PadItemCepRecusado', id);
    const toDelete = await this.padItemCepRecusadoService.findById(id);
    return await this.padItemCepRecusadoService.delete(toDelete);
  }
}
