'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/search?query=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error('Search error:', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Search Results for: "{query}"</h1>

      {loading && <p>Loading...</p>}

      {!loading && results.length === 0 && <p>No products found.</p>}

      {!loading && results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {results.map((product) => (
            <div key={product._id} className="border p-4 rounded shadow">
              <h2 className="font-semibold">{product.title}</h2>
              <p>Brand: {product.brand?.name}</p>
              <p>Category: {product.category?.name}</p>
              <p>Subcategory: {product.subcategory?.name}</p>
              {/* Add more fields as needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
