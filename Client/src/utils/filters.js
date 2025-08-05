// Logic for filtering/sorting notes/tasks
export const filterByCategory = (items, category) =>
  items.filter(item => item.category === category);
