import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import TempoExperiencia from '../../domain/tempo-experiencia.entity';
import { TempoExperienciaService } from '../../service/tempo-experiencia.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/tempo-experiencias')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('tempo-experiencias')
export class TempoExperienciaController {
  logger = new Logger('TempoExperienciaController');

  constructor(private readonly tempoExperienciaService: TempoExperienciaService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: TempoExperiencia
  })
  async getAll(@Req() req: Request): Promise<TempoExperiencia[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.tempoExperienciaService.findAndCount(
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
    type: TempoExperiencia
  })
  async getOne(@Param('id') id: string): Promise<TempoExperiencia> {
    return await this.tempoExperienciaService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create tempoExperiencia' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: TempoExperiencia
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() tempoExperiencia: TempoExperiencia): Promise<TempoExperiencia> {
    const created = await this.tempoExperienciaService.save(tempoExperiencia);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'TempoExperiencia', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update tempoExperiencia' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: TempoExperiencia
  })
  async put(@Req() req: Request, @Body() tempoExperiencia: TempoExperiencia): Promise<TempoExperiencia> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'TempoExperiencia', tempoExperiencia.id);
    return await this.tempoExperienciaService.update(tempoExperiencia);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete tempoExperiencia' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<TempoExperiencia> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'TempoExperiencia', id);
    const toDelete = await this.tempoExperienciaService.findById(id);
    return await this.tempoExperienciaService.delete(toDelete);
  }
}
