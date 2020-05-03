import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import TipoEspecialidade from '../../domain/tipo-especialidade.entity';
import { TipoEspecialidadeService } from '../../service/tipo-especialidade.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/tipo-especialidades')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('tipo-especialidades')
export class TipoEspecialidadeController {
  logger = new Logger('TipoEspecialidadeController');

  constructor(private readonly tipoEspecialidadeService: TipoEspecialidadeService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: TipoEspecialidade
  })
  async getAll(@Req() req: Request): Promise<TipoEspecialidade[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.tipoEspecialidadeService.findAndCount(
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
    type: TipoEspecialidade
  })
  async getOne(@Param('id') id: string): Promise<TipoEspecialidade> {
    return await this.tipoEspecialidadeService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create tipoEspecialidade' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: TipoEspecialidade
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() tipoEspecialidade: TipoEspecialidade): Promise<TipoEspecialidade> {
    const created = await this.tipoEspecialidadeService.save(tipoEspecialidade);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'TipoEspecialidade', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update tipoEspecialidade' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: TipoEspecialidade
  })
  async put(@Req() req: Request, @Body() tipoEspecialidade: TipoEspecialidade): Promise<TipoEspecialidade> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'TipoEspecialidade', tipoEspecialidade.id);
    return await this.tipoEspecialidadeService.update(tipoEspecialidade);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete tipoEspecialidade' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<TipoEspecialidade> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'TipoEspecialidade', id);
    const toDelete = await this.tipoEspecialidadeService.findById(id);
    return await this.tipoEspecialidadeService.delete(toDelete);
  }
}
