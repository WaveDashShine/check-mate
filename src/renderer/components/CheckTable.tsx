import 'src/renderer/components/CheckTable.css';
import { Check } from 'src/main/schema';

interface CheckTableProps {
  rows: Check[];
}

function CheckTable(props: CheckTableProps) {
  return (
    <div style={{ padding: '16px', fontFamily: 'Arial, sans-serif' }}>
      <table>
        <thead>
          <tr>
            <th>Enabled</th>
            <th>Name</th>
            <th>Note</th>
            <th>Last Checked</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {props.rows.map((row) => (
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
