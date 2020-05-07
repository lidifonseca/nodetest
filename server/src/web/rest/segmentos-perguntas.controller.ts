import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import SegmentosPerguntas from '../../domain/segmentos-perguntas.entity';
import { SegmentosPerguntasService } from '../../service/segmentos-perguntas.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/segmentos-perguntas')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('segmentos-perguntas')
export class SegmentosPerguntasController {
  logger = new Logger('SegmentosPerguntasController');

  constructor(private readonly segmentosPerguntasService: SegmentosPerguntasService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: SegmentosPerguntas
  })
  async getAll(@Req() req: Request): Promise<SegmentosPerguntas[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.segmentosPerguntasService.findAndCount(
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
    type: SegmentosPerguntas
  })
  async getOne(@Param('id') id: string): Promise<SegmentosPerguntas> {
    return await this.segmentosPerguntasService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create segmentosPerguntas' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: SegmentosPerguntas
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() segmentosPerguntas: SegmentosPerguntas): Promise<SegmentosPerguntas> {
    console.info(segmentosPerguntas);
    const created = await this.segmentosPerguntasService.save(segmentosPerguntas);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'SegmentosPerguntas', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update segmentosPerguntas' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: SegmentosPerguntas
  })
  async put(@Req() req: Request, @Body() segmentosPerguntas: SegmentosPerguntas): Promise<SegmentosPerguntas> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'SegmentosPerguntas', segmentosPerguntas.id);

    return await this.segmentosPerguntasService.update(segmentosPerguntas);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete segmentosPerguntas' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<SegmentosPerguntas> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'SegmentosPerguntas', id);
    const toDelete = await this.segmentosPerguntasService.findById(id);
    return await this.segmentosPerguntasService.delete(toDelete);
  }
}
