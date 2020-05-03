import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import ProfissionalHorario from '../../domain/profissional-horario.entity';
import { ProfissionalHorarioService } from '../../service/profissional-horario.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/profissional-horarios')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('profissional-horarios')
export class ProfissionalHorarioController {
  logger = new Logger('ProfissionalHorarioController');

  constructor(private readonly profissionalHorarioService: ProfissionalHorarioService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ProfissionalHorario
  })
  async getAll(@Req() req: Request): Promise<ProfissionalHorario[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.profissionalHorarioService.findAndCount(
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
    type: ProfissionalHorario
  })
  async getOne(@Param('id') id: string): Promise<ProfissionalHorario> {
    return await this.profissionalHorarioService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create profissionalHorario' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ProfissionalHorario
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() profissionalHorario: ProfissionalHorario): Promise<ProfissionalHorario> {
    const created = await this.profissionalHorarioService.save(profissionalHorario);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProfissionalHorario', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update profissionalHorario' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ProfissionalHorario
  })
  async put(@Req() req: Request, @Body() profissionalHorario: ProfissionalHorario): Promise<ProfissionalHorario> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProfissionalHorario', profissionalHorario.id);
    return await this.profissionalHorarioService.update(profissionalHorario);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete profissionalHorario' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<ProfissionalHorario> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ProfissionalHorario', id);
    const toDelete = await this.profissionalHorarioService.findById(id);
    return await this.profissionalHorarioService.delete(toDelete);
  }
}
