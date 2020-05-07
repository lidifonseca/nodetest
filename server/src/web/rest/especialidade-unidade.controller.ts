import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import EspecialidadeUnidade from '../../domain/especialidade-unidade.entity';
import { EspecialidadeUnidadeService } from '../../service/especialidade-unidade.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/especialidade-unidades')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('especialidade-unidades')
export class EspecialidadeUnidadeController {
  logger = new Logger('EspecialidadeUnidadeController');

  constructor(private readonly especialidadeUnidadeService: EspecialidadeUnidadeService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: EspecialidadeUnidade
  })
  async getAll(@Req() req: Request): Promise<EspecialidadeUnidade[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.especialidadeUnidadeService.findAndCount(
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
    type: EspecialidadeUnidade
  })
  async getOne(@Param('id') id: string): Promise<EspecialidadeUnidade> {
    return await this.especialidadeUnidadeService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create especialidadeUnidade' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: EspecialidadeUnidade
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() especialidadeUnidade: EspecialidadeUnidade): Promise<EspecialidadeUnidade> {
    console.info(especialidadeUnidade);
    const created = await this.especialidadeUnidadeService.save(especialidadeUnidade);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'EspecialidadeUnidade', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update especialidadeUnidade' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: EspecialidadeUnidade
  })
  async put(@Req() req: Request, @Body() especialidadeUnidade: EspecialidadeUnidade): Promise<EspecialidadeUnidade> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'EspecialidadeUnidade', especialidadeUnidade.id);

    return await this.especialidadeUnidadeService.update(especialidadeUnidade);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete especialidadeUnidade' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<EspecialidadeUnidade> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'EspecialidadeUnidade', id);
    const toDelete = await this.especialidadeUnidadeService.findById(id);
    return await this.especialidadeUnidadeService.delete(toDelete);
  }
}
