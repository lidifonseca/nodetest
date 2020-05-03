import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import EspecialidadeOperadora from '../../domain/especialidade-operadora.entity';
import { EspecialidadeOperadoraService } from '../../service/especialidade-operadora.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/especialidade-operadoras')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('especialidade-operadoras')
export class EspecialidadeOperadoraController {
  logger = new Logger('EspecialidadeOperadoraController');

  constructor(private readonly especialidadeOperadoraService: EspecialidadeOperadoraService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: EspecialidadeOperadora
  })
  async getAll(@Req() req: Request): Promise<EspecialidadeOperadora[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.especialidadeOperadoraService.findAndCount(
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
    type: EspecialidadeOperadora
  })
  async getOne(@Param('id') id: string): Promise<EspecialidadeOperadora> {
    return await this.especialidadeOperadoraService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create especialidadeOperadora' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: EspecialidadeOperadora
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() especialidadeOperadora: EspecialidadeOperadora): Promise<EspecialidadeOperadora> {
    const created = await this.especialidadeOperadoraService.save(especialidadeOperadora);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'EspecialidadeOperadora', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update especialidadeOperadora' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: EspecialidadeOperadora
  })
  async put(@Req() req: Request, @Body() especialidadeOperadora: EspecialidadeOperadora): Promise<EspecialidadeOperadora> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'EspecialidadeOperadora', especialidadeOperadora.id);
    return await this.especialidadeOperadoraService.update(especialidadeOperadora);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete especialidadeOperadora' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<EspecialidadeOperadora> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'EspecialidadeOperadora', id);
    const toDelete = await this.especialidadeOperadoraService.findById(id);
    return await this.especialidadeOperadoraService.delete(toDelete);
  }
}
