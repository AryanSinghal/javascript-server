const sortQuery = (sortBy, order) => {
  if (sortBy === 'email')
    return { email: order };
  else if (sortBy === 'name')
    return { name: order };
  else
    return { updatedAt: order };
}

export default sortQuery;
