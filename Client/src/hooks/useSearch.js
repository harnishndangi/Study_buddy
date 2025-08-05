// useSearch custom hook
import { useState } from 'react';

export const useSearch = (items) => {
  const [query, setQuery] = useState('');
  const results = items.filter(item => item.title?.toLowerCase().includes(query.toLowerCase()));
  return { query, setQuery, results };
};
