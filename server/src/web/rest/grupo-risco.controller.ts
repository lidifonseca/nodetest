import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import GrupoRisco from '../../domain/grupo-risco.entity';
import { GrupoRiscoService } from '../../service/grupo-risco.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/grupo-riscos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('grupo-riscos')
export class GrupoRiscoController {
  logger = new Logger('GrupoRiscoController');

  constructor(private readonly grupoRiscoService: GrupoRiscoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: GrupoRisco
  })
  async getAll(@Req() req: Request): Promise<GrupoRisco[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.grupoRiscoService.findAndCount(
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
    type: GrupoRisco
  })
  async getOne(@Param('id') id: string): Promise<GrupoRisco> {
    return await this.grupoRiscoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create grupoRisco' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: GrupoRisco
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() grupoRisco: GrupoRisco): Promise<GrupoRisco> {
    const created = await this.grupoRiscoService.save(grupoRisco);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'GrupoRisco', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update grupoRisco' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: GrupoRisco
  })
  async put(@Req() req: Request, @Body() grupoRisco: GrupoRisco): Promise<GrupoRisco> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'GrupoRisco', grupoRisco.id);
    return await this.grupoRiscoService.update(grupoRisco);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete grupoRisco' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<GrupoRisco> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'GrupoRisco', id);
    const toDelete = await this.grupoRiscoService.findById(id);
    return await this.grupoRiscoService.delete(toDelete);
  }
}
