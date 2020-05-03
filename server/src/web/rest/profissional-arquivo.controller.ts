import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import ProfissionalArquivo from '../../domain/profissional-arquivo.entity';
import { ProfissionalArquivoService } from '../../service/profissional-arquivo.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/profissional-arquivos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('profissional-arquivos')
export class ProfissionalArquivoController {
  logger = new Logger('ProfissionalArquivoController');

  constructor(private readonly profissionalArquivoService: ProfissionalArquivoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ProfissionalArquivo
  })
  async getAll(@Req() req: Request): Promise<ProfissionalArquivo[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.profissionalArquivoService.findAndCount(
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
    type: ProfissionalArquivo
  })
  async getOne(@Param('id') id: string): Promise<ProfissionalArquivo> {
    return await this.profissionalArquivoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create profissionalArquivo' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ProfissionalArquivo
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() profissionalArquivo: ProfissionalArquivo): Promise<ProfissionalArquivo> {
    const created = await this.profissionalArquivoService.save(profissionalArquivo);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProfissionalArquivo', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update profissionalArquivo' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ProfissionalArquivo
  })
  async put(@Req() req: Request, @Body() profissionalArquivo: ProfissionalArquivo): Promise<ProfissionalArquivo> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProfissionalArquivo', profissionalArquivo.id);
    return await this.profissionalArquivoService.update(profissionalArquivo);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete profissionalArquivo' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<ProfissionalArquivo> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ProfissionalArquivo', id);
    const toDelete = await this.profissionalArquivoService.findById(id);
    return await this.profissionalArquivoService.delete(toDelete);
  }
}
