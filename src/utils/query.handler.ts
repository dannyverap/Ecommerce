import ProductModel from "../models/product";

//* Filtering:
const queryHandler = (queryObj : Record<string, any>) => {

  const excludedFields = ["sort", "fields", "limit", "page"];
  excludedFields.forEach((element) => delete queryObj[element]);
  let queryString = JSON.stringify(queryObj);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );
  const query = JSON.parse(queryString)
    
  return query;
};
//* Sorting:

const sortHandler = (query: Array<any>, sortType: any) => {
  sortType = sortType.split(",").join(" ");
  const sortedQuery = query.sort(sortType);
  return sortedQuery;
};

//* Limiting fields:

interface QueryType {
  select(fields: string): any; // Ajusta el tipo de retorno según corresponda
}

const fieldHandler = (query: QueryType, fields: string) => {
  fields = fields.split(",").join(" ");
  query = query.select(fields);
};

//* Pagination:


export {queryHandler,sortHandler,fieldHandler}