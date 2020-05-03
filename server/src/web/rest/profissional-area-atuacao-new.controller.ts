import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import ProfissionalAreaAtuacaoNew from '../../domain/profissional-area-atuacao-new.entity';
import { ProfissionalAreaAtuacaoNewService } from '../../service/profissional-area-atuacao-new.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/profissional-area-atuacao-news')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('profissional-area-atuacao-news')
export class ProfissionalAreaAtuacaoNewController {
  logger = new Logger('ProfissionalAreaAtuacaoNewController');

  constructor(private readonly profissionalAreaAtuacaoNewService: ProfissionalAreaAtuacaoNewService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ProfissionalAreaAtuacaoNew
  })
  async getAll(@Req() req: Request): Promise<ProfissionalAreaAtuacaoNew[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.profissionalAreaAtuacaoNewService.findAndCount(
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
    type: ProfissionalAreaAtuacaoNew
  })
  async getOne(@Param('id') id: string): Promise<ProfissionalAreaAtuacaoNew> {
    return await this.profissionalAreaAtuacaoNewService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create profissionalAreaAtuacaoNew' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ProfissionalAreaAtuacaoNew
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() profissionalAreaAtuacaoNew: ProfissionalAreaAtuacaoNew): Promise<ProfissionalAreaAtuacaoNew> {
    const created = await this.profissionalAreaAtuacaoNewService.save(profissionalAreaAtuacaoNew);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProfissionalAreaAtuacaoNew', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update profissionalAreaAtuacaoNew' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ProfissionalAreaAtuacaoNew
  })
  async put(@Req() req: Request, @Body() profissionalAreaAtuacaoNew: ProfissionalAreaAtuacaoNew): Promise<ProfissionalAreaAtuacaoNew> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProfissionalAreaAtuacaoNew', profissionalAreaAtuacaoNew.id);
    return await this.profissionalAreaAtuacaoNewService.update(profissionalAreaAtuacaoNew);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete profissionalAreaAtuacaoNew' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<ProfissionalAreaAtuacaoNew> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ProfissionalAreaAtuacaoNew', id);
    const toDelete = await this.profissionalAreaAtuacaoNewService.findById(id);
    return await this.profissionalAreaAtuacaoNewService.delete(toDelete);
  }
}
