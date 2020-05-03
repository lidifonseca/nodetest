import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import ProfissionalEspecialidadeNew from '../../domain/profissional-especialidade-new.entity';
import { ProfissionalEspecialidadeNewService } from '../../service/profissional-especialidade-new.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/profissional-especialidade-news')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('profissional-especialidade-news')
export class ProfissionalEspecialidadeNewController {
  logger = new Logger('ProfissionalEspecialidadeNewController');

  constructor(private readonly profissionalEspecialidadeNewService: ProfissionalEspecialidadeNewService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ProfissionalEspecialidadeNew
  })
  async getAll(@Req() req: Request): Promise<ProfissionalEspecialidadeNew[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.profissionalEspecialidadeNewService.findAndCount(
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
    type: ProfissionalEspecialidadeNew
  })
  async getOne(@Param('id') id: string): Promise<ProfissionalEspecialidadeNew> {
    return await this.profissionalEspecialidadeNewService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create profissionalEspecialidadeNew' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ProfissionalEspecialidadeNew
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(
    @Req() req: Request,
    @Body() profissionalEspecialidadeNew: ProfissionalEspecialidadeNew
  ): Promise<ProfissionalEspecialidadeNew> {
    const created = await this.profissionalEspecialidadeNewService.save(profissionalEspecialidadeNew);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProfissionalEspecialidadeNew', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update profissionalEspecialidadeNew' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ProfissionalEspecialidadeNew
  })
  async put(
    @Req() req: Request,
    @Body() profissionalEspecialidadeNew: ProfissionalEspecialidadeNew
  ): Promise<ProfissionalEspecialidadeNew> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProfissionalEspecialidadeNew', profissionalEspecialidadeNew.id);
    return await this.profissionalEspecialidadeNewService.update(profissionalEspecialidadeNew);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete profissionalEspecialidadeNew' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<ProfissionalEspecialidadeNew> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ProfissionalEspecialidadeNew', id);
    const toDelete = await this.profissionalEspecialidadeNewService.findById(id);
    return await this.profissionalEspecialidadeNewService.delete(toDelete);
  }
}
