import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import RespostasQuestionarios from '../../domain/respostas-questionarios.entity';
import { RespostasQuestionariosService } from '../../service/respostas-questionarios.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/respostas-questionarios')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('respostas-questionarios')
export class RespostasQuestionariosController {
  logger = new Logger('RespostasQuestionariosController');

  constructor(private readonly respostasQuestionariosService: RespostasQuestionariosService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: RespostasQuestionarios
  })
  async getAll(@Req() req: Request): Promise<RespostasQuestionarios[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.respostasQuestionariosService.findAndCount(
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
    type: RespostasQuestionarios
  })
  async getOne(@Param('id') id: string): Promise<RespostasQuestionarios> {
    return await this.respostasQuestionariosService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create respostasQuestionarios' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: RespostasQuestionarios
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() respostasQuestionarios: RespostasQuestionarios): Promise<RespostasQuestionarios> {
    const created = await this.respostasQuestionariosService.save(respostasQuestionarios);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'RespostasQuestionarios', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update respostasQuestionarios' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: RespostasQuestionarios
  })
  async put(@Req() req: Request, @Body() respostasQuestionarios: RespostasQuestionarios): Promise<RespostasQuestionarios> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'RespostasQuestionarios', respostasQuestionarios.id);
    return await this.respostasQuestionariosService.update(respostasQuestionarios);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete respostasQuestionarios' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<RespostasQuestionarios> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'RespostasQuestionarios', id);
    const toDelete = await this.respostasQuestionariosService.findById(id);
    return await this.respostasQuestionariosService.delete(toDelete);
  }
}
