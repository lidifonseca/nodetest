import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Especialidade from '../../domain/especialidade.entity';
import { EspecialidadeService } from '../../service/especialidade.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/especialidades')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('especialidades')
export class EspecialidadeController {
  logger = new Logger('EspecialidadeController');

  constructor(private readonly especialidadeService: EspecialidadeService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Especialidade
  })
  async getAll(@Req() req: Request): Promise<Especialidade[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.especialidadeService.findAndCount(
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
    type: Especialidade
  })
  async getOne(@Param('id') id: string): Promise<Especialidade> {
    return await this.especialidadeService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create especialidade' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Especialidade
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() especialidade: Especialidade): Promise<Especialidade> {
    console.info(especialidade);
    const created = await this.especialidadeService.save(especialidade);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Especialidade', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update especialidade' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Especialidade
  })
  async put(@Req() req: Request, @Body() especialidade: Especialidade): Promise<Especialidade> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Especialidade', especialidade.id);

    return await this.especialidadeService.update(especialidade);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete especialidade' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Especialidade> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Especialidade', id);
    const toDelete = await this.especialidadeService.findById(id);
    return await this.especialidadeService.delete(toDelete);
  }
}
