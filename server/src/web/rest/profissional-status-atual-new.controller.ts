import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import ProfissionalStatusAtualNew from '../../domain/profissional-status-atual-new.entity';
import { ProfissionalStatusAtualNewService } from '../../service/profissional-status-atual-new.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/profissional-status-atual-news')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('profissional-status-atual-news')
export class ProfissionalStatusAtualNewController {
  logger = new Logger('ProfissionalStatusAtualNewController');

  constructor(private readonly profissionalStatusAtualNewService: ProfissionalStatusAtualNewService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ProfissionalStatusAtualNew
  })
  async getAll(@Req() req: Request): Promise<ProfissionalStatusAtualNew[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.profissionalStatusAtualNewService.findAndCount(
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
    type: ProfissionalStatusAtualNew
  })
  async getOne(@Param('id') id: string): Promise<ProfissionalStatusAtualNew> {
    return await this.profissionalStatusAtualNewService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create profissionalStatusAtualNew' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ProfissionalStatusAtualNew
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() profissionalStatusAtualNew: ProfissionalStatusAtualNew): Promise<ProfissionalStatusAtualNew> {
    console.info(profissionalStatusAtualNew);
    const created = await this.profissionalStatusAtualNewService.save(profissionalStatusAtualNew);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProfissionalStatusAtualNew', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update profissionalStatusAtualNew' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ProfissionalStatusAtualNew
  })
  async put(@Req() req: Request, @Body() profissionalStatusAtualNew: ProfissionalStatusAtualNew): Promise<ProfissionalStatusAtualNew> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProfissionalStatusAtualNew', profissionalStatusAtualNew.id);

    return await this.profissionalStatusAtualNewService.update(profissionalStatusAtualNew);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete profissionalStatusAtualNew' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<ProfissionalStatusAtualNew> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ProfissionalStatusAtualNew', id);
    const toDelete = await this.profissionalStatusAtualNewService.findById(id);
    return await this.profissionalStatusAtualNewService.delete(toDelete);
  }
}
