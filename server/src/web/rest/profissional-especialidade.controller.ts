import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import ProfissionalEspecialidade from '../../domain/profissional-especialidade.entity';
import { ProfissionalEspecialidadeService } from '../../service/profissional-especialidade.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/profissional-especialidades')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('profissional-especialidades')
export class ProfissionalEspecialidadeController {
  logger = new Logger('ProfissionalEspecialidadeController');

  constructor(private readonly profissionalEspecialidadeService: ProfissionalEspecialidadeService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ProfissionalEspecialidade
  })
  async getAll(@Req() req: Request): Promise<ProfissionalEspecialidade[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.profissionalEspecialidadeService.findAndCount(
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
    type: ProfissionalEspecialidade
  })
  async getOne(@Param('id') id: string): Promise<ProfissionalEspecialidade> {
    return await this.profissionalEspecialidadeService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create profissionalEspecialidade' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ProfissionalEspecialidade
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() profissionalEspecialidade: ProfissionalEspecialidade): Promise<ProfissionalEspecialidade> {
    const created = await this.profissionalEspecialidadeService.save(profissionalEspecialidade);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProfissionalEspecialidade', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update profissionalEspecialidade' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ProfissionalEspecialidade
  })
  async put(@Req() req: Request, @Body() profissionalEspecialidade: ProfissionalEspecialidade): Promise<ProfissionalEspecialidade> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProfissionalEspecialidade', profissionalEspecialidade.id);
    return await this.profissionalEspecialidadeService.update(profissionalEspecialidade);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete profissionalEspecialidade' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<ProfissionalEspecialidade> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ProfissionalEspecialidade', id);
    const toDelete = await this.profissionalEspecialidadeService.findById(id);
    return await this.profissionalEspecialidadeService.delete(toDelete);
  }
}
