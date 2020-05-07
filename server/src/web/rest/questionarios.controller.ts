import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Questionarios from '../../domain/questionarios.entity';
import { QuestionariosService } from '../../service/questionarios.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/questionarios')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('questionarios')
export class QuestionariosController {
  logger = new Logger('QuestionariosController');

  constructor(private readonly questionariosService: QuestionariosService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Questionarios
  })
  async getAll(@Req() req: Request): Promise<Questionarios[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.questionariosService.findAndCount(
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
    type: Questionarios
  })
  async getOne(@Param('id') id: string): Promise<Questionarios> {
    return await this.questionariosService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create questionarios' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Questionarios
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() questionarios: Questionarios): Promise<Questionarios> {
    console.info(questionarios);
    const created = await this.questionariosService.save(questionarios);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Questionarios', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update questionarios' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Questionarios
  })
  async put(@Req() req: Request, @Body() questionarios: Questionarios): Promise<Questionarios> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Questionarios', questionarios.id);

    return await this.questionariosService.update(questionarios);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete questionarios' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Questionarios> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Questionarios', id);
    const toDelete = await this.questionariosService.findById(id);
    return await this.questionariosService.delete(toDelete);
  }
}
