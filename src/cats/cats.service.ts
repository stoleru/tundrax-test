import { Injectable, NotFoundException } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: CreateCatDto) {
    const newCat: Cat = {
      id: this.cats.length + 1,
      ...cat,
    };
    this.cats.push(newCat);
    return newCat;
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number): Cat {
    const cat = this.cats.find(cat => cat.id === id);
    if (!cat) {
      throw new NotFoundException('Cat not found');
    }
    return cat;
  }

  update(id: number, updateCatDto: UpdateCatDto): Cat {
    const catIndex = this.cats.findIndex(cat => cat.id === id);
    if (catIndex === -1) {
      throw new NotFoundException('Cat not found');
    }
    const updatedCat = { ...this.cats[catIndex], ...updateCatDto };
    this.cats[catIndex] = updatedCat;
    return updatedCat;
  }

  remove(id: number): void {
    const catIndex = this.cats.findIndex(cat => cat.id === id);
    if (catIndex === -1) {
      throw new NotFoundException('Cat not found');
    }
    this.cats.splice(catIndex, 1);
  }
}
