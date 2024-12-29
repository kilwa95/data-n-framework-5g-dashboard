import { useMemo, useState } from 'react';
import { DataGrid, GridFilterModel } from '@mui/x-data-grid';
import { TestResultsTableProps } from '../types';
import { filterTestResults } from '../../utils/filterTestResults';
import { getTestResultsColumns } from './TestResultsTableColumns';

export const TestResultsTable = ({
  data,
  filters,
  loading = false,
  className = '',
}: TestResultsTableProps) => {
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
  });

  const columns = useMemo(() => getTestResultsColumns(), []);

  const filteredData = useMemo(
    () => filterTestResults(data, filters),
    [data, filters]
  );

  return (
    <div
      className={`h-[600px] w-full bg-white dark:bg-[#242526] rounded-lg shadow-md 
        border border-gray-200 dark:border-gray-700 ${className}`}
    >
      <DataGrid
        rows={filteredData}
        columns={columns}
        filterModel={filterModel}
        onFilterModelChange={setFilterModel}
        loading={loading}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 25, 50, 100]}
        disableRowSelectionOnClick
        getRowId={(row) => row.id}
        sx={{
          border: 'none',
          '& .MuiDataGrid-cell': {
            borderColor: 'rgba(224, 224, 224, 0.2)',
          },
          '& .MuiDataGrid-columnHeaders': {
            borderColor: 'rgba(224, 224, 224, 0.2)',
            backgroundColor: '#F0F2F5',
          },
          '& .MuiDataGrid-footerContainer': {
            borderColor: 'rgba(224, 224, 224, 0.2)',
          },
        }}
      />
    </div>
  );
};
