import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import AcoesRespostas from '../../domain/acoes-respostas.entity';
import { AcoesRespostasService } from '../../service/acoes-respostas.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/acoes-respostas')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('acoes-respostas')
export class AcoesRespostasController {
  logger = new Logger('AcoesRespostasController');

  constructor(private readonly acoesRespostasService: AcoesRespostasService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: AcoesRespostas
  })
  async getAll(@Req() req: Request): Promise<AcoesRespostas[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.acoesRespostasService.findAndCount(
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
    type: AcoesRespostas
  })
  async getOne(@Param('id') id: string): Promise<AcoesRespostas> {
    return await this.acoesRespostasService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create acoesRespostas' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: AcoesRespostas
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() acoesRespostas: AcoesRespostas): Promise<AcoesRespostas> {
    console.info(acoesRespostas);
    const created = await this.acoesRespostasService.save(acoesRespostas);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'AcoesRespostas', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update acoesRespostas' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: AcoesRespostas
  })
  async put(@Req() req: Request, @Body() acoesRespostas: AcoesRespostas): Promise<AcoesRespostas> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'AcoesRespostas', acoesRespostas.id);

    return await this.acoesRespostasService.update(acoesRespostas);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete acoesRespostas' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<AcoesRespostas> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'AcoesRespostas', id);
    const toDelete = await this.acoesRespostasService.findById(id);
    return await this.acoesRespostasService.delete(toDelete);
  }
}
