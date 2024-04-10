import { Body, Controller, Get, Param, Post, Put, Delete, UseGuards, InternalServerErrorException, NotFoundException, UseInterceptors, UseFilters } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './interfaces/cat.interface';
import { TimeoutInterceptor } from '../common/interceptors/timeout.interceptor';
import { ErrorsInterceptor } from '../common/interceptors/exception.interceptor';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';

@UseInterceptors(ErrorsInterceptor)
@UseInterceptors(TimeoutInterceptor)
@UseFilters(new HttpExceptionFilter())
@UseGuards(RolesGuard)
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @Roles(['admin'])
  async create(@Body() createCatDto: CreateCatDto) {
    try {
      await this.catsService.create(createCatDto);
      return { message: 'Cat created successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create cat');
    }
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Cat> {
    const cat = await this.catsService.findOne(id);
    if (!cat) {
      throw new NotFoundException('Cat not found');
    }
    return cat;
  }

  @Put(':id')
  @Roles(['admin'])
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateCatDto: UpdateCatDto,
  ) {
    try {
      await this.catsService.update(id, updateCatDto);
      return { message: 'Cat updated successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to update cat');
    }
  }

  @Delete(':id')
  @Roles(['admin'])
  async remove(
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    try {
      await this.catsService.remove(id);
      return { message: 'Cat deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete cat');
    }
  }
}
