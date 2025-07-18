import { useEffect, useState } from 'react';
import { Check } from 'src/main/schema';

function CheckTable() {
  const [rows, setRows] = useState<Check[]>([]);
  const [search, setSearch] = useState('');

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div style={{ padding: '16px', fontFamily: 'Arial, sans-serif' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '12px',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          <button>New</button>
          <button>Enable/Disable</button>
          <button>Copy</button>
          <button>Delete</button>
          <button
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            Check
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '6px 10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th>Enabled</th>
            <th>Name</th>
            <th>Note</th>
            <th>Last Checked</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((row) => (
            <tr key={row._id}>
              <td>{row.is_enabled ? '✅' : '❌'}</td>
              <td>{row.name}</td>
              <td>{row.note}</td>
              <td>{'TODO grab last checked from history'}</td>
              <td>{'TODO: grab tags'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CheckTable;
