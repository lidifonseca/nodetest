import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import ProfissionalFranquia from '../../domain/profissional-franquia.entity';
import { ProfissionalFranquiaService } from '../../service/profissional-franquia.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/profissional-franquias')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('profissional-franquias')
export class ProfissionalFranquiaController {
  logger = new Logger('ProfissionalFranquiaController');

  constructor(private readonly profissionalFranquiaService: ProfissionalFranquiaService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ProfissionalFranquia
  })
  async getAll(@Req() req: Request): Promise<ProfissionalFranquia[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.profissionalFranquiaService.findAndCount(
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
    type: ProfissionalFranquia
  })
  async getOne(@Param('id') id: string): Promise<ProfissionalFranquia> {
    return await this.profissionalFranquiaService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create profissionalFranquia' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ProfissionalFranquia
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() profissionalFranquia: ProfissionalFranquia): Promise<ProfissionalFranquia> {
    const created = await this.profissionalFranquiaService.save(profissionalFranquia);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProfissionalFranquia', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update profissionalFranquia' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ProfissionalFranquia
  })
  async put(@Req() req: Request, @Body() profissionalFranquia: ProfissionalFranquia): Promise<ProfissionalFranquia> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProfissionalFranquia', profissionalFranquia.id);
    return await this.profissionalFranquiaService.update(profissionalFranquia);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete profissionalFranquia' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<ProfissionalFranquia> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ProfissionalFranquia', id);
    const toDelete = await this.profissionalFranquiaService.findById(id);
    return await this.profissionalFranquiaService.delete(toDelete);
  }
}
