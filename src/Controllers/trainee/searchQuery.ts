const searchQuery = (search) => {
  if (search === undefined)
    return {};
  else
    return { $or: [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search.toLowerCase() } }] };
}

export default searchQuery;
