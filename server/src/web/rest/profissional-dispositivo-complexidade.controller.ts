import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import ProfissionalDispositivoComplexidade from '../../domain/profissional-dispositivo-complexidade.entity';
import { ProfissionalDispositivoComplexidadeService } from '../../service/profissional-dispositivo-complexidade.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/profissional-dispositivo-complexidades')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('profissional-dispositivo-complexidades')
export class ProfissionalDispositivoComplexidadeController {
  logger = new Logger('ProfissionalDispositivoComplexidadeController');

  constructor(private readonly profissionalDispositivoComplexidadeService: ProfissionalDispositivoComplexidadeService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ProfissionalDispositivoComplexidade
  })
  async getAll(@Req() req: Request): Promise<ProfissionalDispositivoComplexidade[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.profissionalDispositivoComplexidadeService.findAndCount(
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
    type: ProfissionalDispositivoComplexidade
  })
  async getOne(@Param('id') id: string): Promise<ProfissionalDispositivoComplexidade> {
    return await this.profissionalDispositivoComplexidadeService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create profissionalDispositivoComplexidade' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ProfissionalDispositivoComplexidade
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(
    @Req() req: Request,
    @Body() profissionalDispositivoComplexidade: ProfissionalDispositivoComplexidade
  ): Promise<ProfissionalDispositivoComplexidade> {
    console.info(profissionalDispositivoComplexidade);
    const created = await this.profissionalDispositivoComplexidadeService.save(profissionalDispositivoComplexidade);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProfissionalDispositivoComplexidade', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update profissionalDispositivoComplexidade' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ProfissionalDispositivoComplexidade
  })
  async put(
    @Req() req: Request,
    @Body() profissionalDispositivoComplexidade: ProfissionalDispositivoComplexidade
  ): Promise<ProfissionalDispositivoComplexidade> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProfissionalDispositivoComplexidade', profissionalDispositivoComplexidade.id);

    return await this.profissionalDispositivoComplexidadeService.update(profissionalDispositivoComplexidade);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete profissionalDispositivoComplexidade' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<ProfissionalDispositivoComplexidade> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ProfissionalDispositivoComplexidade', id);
    const toDelete = await this.profissionalDispositivoComplexidadeService.findById(id);
    return await this.profissionalDispositivoComplexidadeService.delete(toDelete);
  }
}
