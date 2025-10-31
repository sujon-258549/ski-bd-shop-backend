import { FilterQuery, Query } from 'mongoose';

class QueryBalder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchAbleField: string[]) {
    const search = this.query.search;
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchAbleField.map(
          (filed) =>
            ({
              [filed]: { $regex: search, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObject = { ...this.query };
    const excludeField = ['search', 'sort', 'limit', 'page', 'field'];

    excludeField.forEach((element) => delete queryObject[element]);
    this.modelQuery = this.modelQuery.find(queryObject as FilterQuery<T>);
    return this;
  }

  //   sort() {
  //     const sort =
  //       (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
  //     this.modelQuery = this.modelQuery.sort(sort as string);
  //     return this;
  //   }

  sort() {
    // Get the 'sortBy' field from the query or default to 'createdAt'
    const sortBy =
      this.query.sortBy && typeof this.query.sortBy === 'string'
        ? this.query.sortBy
        : 'createdAt'; // Default: 'createdAt'

    // Descending order: newest first
    const sortOrder = -1; // -1 means descending

    // Debug
    console.log('Sorting by:', sortBy, 'Order:', sortOrder);

    // Apply sorting
    this.modelQuery = this.modelQuery.sort({ [sortBy]: sortOrder });
    return this; // Enable chaining
  }

  pagination() {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 50;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const fields =
      (this.query.fields as string)?.split(',').join(' ') || '-__v';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}

export default QueryBalder;
