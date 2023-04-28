
const getPagination = (page: number | undefined, size: number | undefined) => {

  const defaultLimit = 5;
  const limit = size ? +size : defaultLimit;
  const offset = page ? (page - 1) * limit : 0;

  return { limit, offset };
};

export default getPagination;
