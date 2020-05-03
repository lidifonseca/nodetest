import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import ControleDisparoAviso from '../../domain/controle-disparo-aviso.entity';
import { ControleDisparoAvisoService } from '../../service/controle-disparo-aviso.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/controle-disparo-avisos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('controle-disparo-avisos')
export class ControleDisparoAvisoController {
  logger = new Logger('ControleDisparoAvisoController');

  constructor(private readonly controleDisparoAvisoService: ControleDisparoAvisoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ControleDisparoAviso
  })
  async getAll(@Req() req: Request): Promise<ControleDisparoAviso[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.controleDisparoAvisoService.findAndCount(
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
    type: ControleDisparoAviso
  })
  async getOne(@Param('id') id: string): Promise<ControleDisparoAviso> {
    return await this.controleDisparoAvisoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create controleDisparoAviso' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ControleDisparoAviso
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() controleDisparoAviso: ControleDisparoAviso): Promise<ControleDisparoAviso> {
    const created = await this.controleDisparoAvisoService.save(controleDisparoAviso);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ControleDisparoAviso', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update controleDisparoAviso' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ControleDisparoAviso
  })
  async put(@Req() req: Request, @Body() controleDisparoAviso: ControleDisparoAviso): Promise<ControleDisparoAviso> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ControleDisparoAviso', controleDisparoAviso.id);
    return await this.controleDisparoAvisoService.update(controleDisparoAviso);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete controleDisparoAviso' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<ControleDisparoAviso> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ControleDisparoAviso', id);
    const toDelete = await this.controleDisparoAvisoService.findById(id);
    return await this.controleDisparoAvisoService.delete(toDelete);
  }
}
