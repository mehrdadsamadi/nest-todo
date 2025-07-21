import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from './schemas/todo.schema';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { removeUndefinedFields } from '@/common/utils/remove-undefined-fields.util';
import { mapDocumentToDto } from '@/common/utils/map-document-to-dto.util';
import { TodoResponseDto } from './dtos/todo-response.dto';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(createTodoDto: CreateTodoDto): Promise<TodoResponseDto> {
    const todo = await this.todoModel.create(createTodoDto);
    return mapDocumentToDto<TodoResponseDto>(todo, TodoResponseDto);
  }

  async update(
    updateTodoDto: UpdateTodoDto,
    id: string,
  ): Promise<TodoResponseDto> {
    const todo = await this.todoModel.findByIdAndUpdate(
      id,
      removeUndefinedFields(updateTodoDto),
      { new: true },
    );

    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    return mapDocumentToDto(todo, TodoResponseDto);
  }

  async findAll(): Promise<TodoResponseDto[]> {
    const todos = await this.todoModel.find().exec();
    return todos.map((todo) => mapDocumentToDto(todo, TodoResponseDto));
  }

  async findById(id: string): Promise<TodoResponseDto> {
    const todo = await this.todoModel.findById(id);
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    return mapDocumentToDto<TodoResponseDto>(todo, TodoResponseDto);
  }

  async toggleCompleted(id: string): Promise<TodoResponseDto> {
    const todo = await this.todoModel.findByIdAndUpdate(
      id,
      { $bit: { completed: { xor: 1 } } },
      { new: true },
    );

    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    return mapDocumentToDto<TodoResponseDto>(todo, TodoResponseDto);
  }
}
