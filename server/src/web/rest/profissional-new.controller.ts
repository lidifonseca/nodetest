import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import ProfissionalNew from '../../domain/profissional-new.entity';
import { ProfissionalNewService } from '../../service/profissional-new.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/profissional-news')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('profissional-news')
export class ProfissionalNewController {
  logger = new Logger('ProfissionalNewController');

  constructor(private readonly profissionalNewService: ProfissionalNewService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ProfissionalNew
  })
  async getAll(@Req() req: Request): Promise<ProfissionalNew[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.profissionalNewService.findAndCount(
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
    type: ProfissionalNew
  })
  async getOne(@Param('id') id: string): Promise<ProfissionalNew> {
    return await this.profissionalNewService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create profissionalNew' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ProfissionalNew
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() profissionalNew: ProfissionalNew): Promise<ProfissionalNew> {
    const created = await this.profissionalNewService.save(profissionalNew);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProfissionalNew', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update profissionalNew' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ProfissionalNew
  })
  async put(@Req() req: Request, @Body() profissionalNew: ProfissionalNew): Promise<ProfissionalNew> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProfissionalNew', profissionalNew.id);
    return await this.profissionalNewService.update(profissionalNew);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete profissionalNew' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<ProfissionalNew> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ProfissionalNew', id);
    const toDelete = await this.profissionalNewService.findById(id);
    return await this.profissionalNewService.delete(toDelete);
  }
}
