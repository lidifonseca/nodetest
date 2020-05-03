import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import TipoExame from '../../domain/tipo-exame.entity';
import { TipoExameService } from '../../service/tipo-exame.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/tipo-exames')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('tipo-exames')
export class TipoExameController {
  logger = new Logger('TipoExameController');

  constructor(private readonly tipoExameService: TipoExameService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: TipoExame
  })
  async getAll(@Req() req: Request): Promise<TipoExame[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.tipoExameService.findAndCount(
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
    type: TipoExame
  })
  async getOne(@Param('id') id: string): Promise<TipoExame> {
    return await this.tipoExameService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create tipoExame' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: TipoExame
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() tipoExame: TipoExame): Promise<TipoExame> {
    const created = await this.tipoExameService.save(tipoExame);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'TipoExame', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update tipoExame' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: TipoExame
  })
  async put(@Req() req: Request, @Body() tipoExame: TipoExame): Promise<TipoExame> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'TipoExame', tipoExame.id);
    return await this.tipoExameService.update(tipoExame);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete tipoExame' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<TipoExame> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'TipoExame', id);
    const toDelete = await this.tipoExameService.findById(id);
    return await this.tipoExameService.delete(toDelete);
  }
}
