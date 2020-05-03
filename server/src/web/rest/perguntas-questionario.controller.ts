import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PerguntasQuestionario from '../../domain/perguntas-questionario.entity';
import { PerguntasQuestionarioService } from '../../service/perguntas-questionario.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/perguntas-questionarios')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('perguntas-questionarios')
export class PerguntasQuestionarioController {
  logger = new Logger('PerguntasQuestionarioController');

  constructor(private readonly perguntasQuestionarioService: PerguntasQuestionarioService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PerguntasQuestionario
  })
  async getAll(@Req() req: Request): Promise<PerguntasQuestionario[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.perguntasQuestionarioService.findAndCount(
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
    type: PerguntasQuestionario
  })
  async getOne(@Param('id') id: string): Promise<PerguntasQuestionario> {
    return await this.perguntasQuestionarioService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create perguntasQuestionario' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PerguntasQuestionario
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() perguntasQuestionario: PerguntasQuestionario): Promise<PerguntasQuestionario> {
    const created = await this.perguntasQuestionarioService.save(perguntasQuestionario);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PerguntasQuestionario', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update perguntasQuestionario' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PerguntasQuestionario
  })
  async put(@Req() req: Request, @Body() perguntasQuestionario: PerguntasQuestionario): Promise<PerguntasQuestionario> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PerguntasQuestionario', perguntasQuestionario.id);
    return await this.perguntasQuestionarioService.update(perguntasQuestionario);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete perguntasQuestionario' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PerguntasQuestionario> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PerguntasQuestionario', id);
    const toDelete = await this.perguntasQuestionarioService.findById(id);
    return await this.perguntasQuestionarioService.delete(toDelete);
  }
}
