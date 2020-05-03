import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Empresa from '../../domain/empresa.entity';
import { EmpresaService } from '../../service/empresa.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/empresas')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('empresas')
export class EmpresaController {
  logger = new Logger('EmpresaController');

  constructor(private readonly empresaService: EmpresaService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Empresa
  })
  async getAll(@Req() req: Request): Promise<Empresa[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.empresaService.findAndCount(
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
    type: Empresa
  })
  async getOne(@Param('id') id: string): Promise<Empresa> {
    return await this.empresaService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create empresa' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Empresa
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() empresa: Empresa): Promise<Empresa> {
    const created = await this.empresaService.save(empresa);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Empresa', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update empresa' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Empresa
  })
  async put(@Req() req: Request, @Body() empresa: Empresa): Promise<Empresa> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Empresa', empresa.id);
    return await this.empresaService.update(empresa);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete empresa' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Empresa> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Empresa', id);
    const toDelete = await this.empresaService.findById(id);
    return await this.empresaService.delete(toDelete);
  }
}
