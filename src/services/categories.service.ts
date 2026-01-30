import { AppDataSource } from "../config/data-source";
import { CategoryDto } from "../dtos/category.dto";
import { Category } from "../entities/category.entity";

export class CategoryService {
  private repo = AppDataSource.getRepository(Category);

  async findAll() {
    return this.repo.find({
      relations: ["courses"],
      order: { id: "DESC" },
    });
  }

  async findOne(id: number) {
    const category = await this.repo.findOne({
      where: { id },
      relations: ["courses"],
    });

    if (!category) {
      throw new Error("Category not found");
    }

    return category;
  }

  async create(payload: CategoryDto) {
    const category = this.repo.create(payload);

    return this.repo.save(category);
  }

  async update(id: number, payload: CategoryDto) {
    const category = await this.repo.findOne({ where: { id } });
    if (!category) {
      throw new Error("Category not found");
    }

    Object.assign(category, payload);
    return this.repo.save(category);
  }

  async delete(id: number) {
    const category = await this.repo.findOne({ where: { id } });
    if (!category) {
      throw new Error("Category not found");
    }

    await this.repo.remove(category);
    return { message: "Category deleted" };
  }
}
