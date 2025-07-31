import React, { useState, useEffect } from 'react';
import axios from '@/lib/axios';

interface Campaign {
  id: number;
  title: string;
  goal_amount?: number;
  current_amount?: number;
  status?: string;
  start_date?: string;
  end_date?: string;
  category?: { id: number; name: string; status?: string } | null;
}

const ITEMS_PER_PAGE = 10;

const AllCampaignPage: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<keyof Campaign>('title');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get('https://crowdfundingapi.wgtesthub.com/api/v1/campaigns/all');
        setCampaigns(res.data || []);
      } catch (e: any) {
        console.error(e);
        setError(e.response?.data?.message || 'Failed to fetch campaigns');
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  // Filtering
  const filtered = campaigns.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    const aValue = a[sortField] || '';
    const bValue = b[sortField] || '';
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    return sortDirection === 'asc'
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  // Pagination
  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const paginated = sorted.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleSort = (field: keyof Campaign) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!campaigns.length) return <div>No campaigns found.</div>;

  return (
    <div>
      <h1>All Campaigns</h1>
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: 12, padding: 6 }}
      />
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>S.N.</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', cursor: 'pointer' }} onClick={() => handleSort('title')}>Name</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Category</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', cursor: 'pointer' }} onClick={() => handleSort('goal_amount')}>Goal Amount</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', cursor: 'pointer' }} onClick={() => handleSort('current_amount')}>Fund Raised</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', cursor: 'pointer' }} onClick={() => handleSort('end_date')}>Deadline</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Approved Status</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Campaign Status</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginated.length === 0 ? (
            <tr>
              <td colSpan={9} style={{ textAlign: 'center', padding: '16px' }}>No campaigns found.</td>
            </tr>
          ) : (
            paginated.map((c, idx) => (
              <tr key={c.id}>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{c.title}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{c.category?.name ?? '-'}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{c.goal_amount ?? '-'}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{c.current_amount ?? '-'}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{c.end_date ?? '-'}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{c.category?.status ?? '-'}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{c.status ?? '-'}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  {/* Placeholder for Action buttons */}
                  <button style={{ marginRight: 4 }}>View</button>
                  <button>Edit</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div style={{ marginTop: 16 }}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            style={{
              margin: 2,
              padding: '4px 8px',
              background: currentPage === page ? '#37b7ff' : '#eee',
              color: currentPage === page ? '#fff' : '#333',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllCampaignPage;
