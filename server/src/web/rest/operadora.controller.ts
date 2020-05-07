import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Operadora from '../../domain/operadora.entity';
import { OperadoraService } from '../../service/operadora.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/operadoras')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('operadoras')
export class OperadoraController {
  logger = new Logger('OperadoraController');

  constructor(private readonly operadoraService: OperadoraService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Operadora
  })
  async getAll(@Req() req: Request): Promise<Operadora[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.operadoraService.findAndCount(
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
    type: Operadora
  })
  async getOne(@Param('id') id: string): Promise<Operadora> {
    return await this.operadoraService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create operadora' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Operadora
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() operadora: Operadora): Promise<Operadora> {
    console.info(operadora);
    const created = await this.operadoraService.save(operadora);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Operadora', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update operadora' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Operadora
  })
  async put(@Req() req: Request, @Body() operadora: Operadora): Promise<Operadora> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Operadora', operadora.id);

    return await this.operadoraService.update(operadora);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete operadora' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Operadora> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Operadora', id);
    const toDelete = await this.operadoraService.findById(id);
    return await this.operadoraService.delete(toDelete);
  }
}
