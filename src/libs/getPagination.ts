const getPagination = (page: number | undefined, size: number | undefined) => {
  const limit = size ? +size : 4;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

export default getPagination;
