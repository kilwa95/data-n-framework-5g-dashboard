import { useMemo, useState } from 'react';
import { DataGrid, GridColDef, GridFilterModel } from '@mui/x-data-grid';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

interface TestResult {
  id: string;
  datetime: string;
  longitude: number;
  latitude: number;
  can_subscribe: boolean;
  is_ztd: boolean;
  foundCoverage: boolean;
  cell_1800_coverage: number;
  sector_capacity: string;
  max_user: number;
  site_name: string;
  sector: string;
  active_4gcoverage: boolean;
  active_4g_cells: number;
  active_5gcoverage: boolean;
  active_5g_cells: number;
}

interface TestResultsTableProps {
  data: TestResult[];
  filters?: Record<string, any>;
  loading?: boolean;
  className?: string;
}

export const TestResultsTable = ({
  data,
  filters,
  loading = false,
  className = '',
}: TestResultsTableProps) => {
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
  });

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'datetime',
        headerName: 'Date and Time',
        flex: 1,
        minWidth: 160,
        valueFormatter: (params) => {
          if (!params.value) return '';
          try {
            return format(parseISO(params.value), 'dd/MM/yyyy HH:mm', {
              locale: fr,
            });
          } catch (error) {
            console.error('Error formatting date:', error);
            return '';
          }
        },
      },
      {
        field: 'longitude',
        headerName: 'Longitude',
        flex: 1,
        minWidth: 120,
        valueFormatter: (params) => {
          return params.value != null ? params.value.toFixed(4) : '';
        },
      },
      {
        field: 'latitude',
        headerName: 'Latitude',
        flex: 1,
        minWidth: 120,
        valueFormatter: (params) => {
          return params.value != null ? params.value.toFixed(4) : '';
        },
      },
      {
        field: 'can_subscribe',
        headerName: 'Eligible',
        flex: 1,
        minWidth: 100,
        renderCell: (params) => (params.value ? 'Yes' : 'No'),
      },
      {
        field: 'is_ztd',
        headerName: 'ZTD',
        flex: 1,
        minWidth: 100,
        renderCell: (params) => (params.value ? 'Yes' : 'No'),
      },
      {
        field: 'foundCoverage',
        headerName: 'Coverage',
        flex: 1,
        minWidth: 120,
        renderCell: (params) => (params.value ? 'Yes' : 'No'),
      },
      {
        field: 'cell_1800_coverage',
        headerName: 'LTE 1800 Cells',
        flex: 1,
        minWidth: 140,
        type: 'number',
      },
      {
        field: 'sector_capacity',
        headerName: 'Capacity Available',
        flex: 1,
        minWidth: 160,
      },
      {
        field: 'max_user',
        headerName: 'Remaining Capacity on Sector (# Subs)',
        flex: 1,
        minWidth: 280,
        type: 'number',
      },
      {
        field: 'site_name',
        headerName: 'Identified Site',
        flex: 1,
        minWidth: 140,
      },
      {
        field: 'sector',
        headerName: 'Identified Sector',
        flex: 1,
        minWidth: 140,
      },
      {
        field: 'active_4gcoverage',
        headerName: '4G Coverage',
        flex: 1,
        minWidth: 140,
        renderCell: (params) => (params.value ? 'Yes' : 'No'),
      },
      {
        field: 'active_4g_cells',
        headerName: '4G Cells',
        flex: 1,
        minWidth: 120,
        type: 'number',
      },
      {
        field: 'active_5gcoverage',
        headerName: '5G 3.5 GHz Coverage',
        flex: 1,
        minWidth: 180,
        renderCell: (params) => (params.value ? 'Yes' : 'No'),
      },
      {
        field: 'active_5g_cells',
        headerName: '5G 3.5 GHz Cells',
        flex: 1,
        minWidth: 160,
        type: 'number',
      },
    ],
    []
  );

  const filteredData = useMemo(() => {
    if (!filters) return data;

    return data.filter((row) => {
      // Apply location filters
      if (filters.location?.region && row.region !== filters.location.region.id)
        return false;
      if (
        filters.location?.department &&
        row.department !== filters.location.department.id
      )
        return false;
      if (filters.location?.city && row.city !== filters.location.city.id)
        return false;

      // Apply eligibility filters
      if (filters.eligibility?.can_subscribe && !row.can_subscribe)
        return false;
      if (filters.eligibility?.is_ztd && !row.is_ztd) return false;
      if (filters.eligibility?.found_coverage && !row.foundCoverage)
        return false;
      if (filters.eligibility?.active_4g && !row.active_4gcoverage)
        return false;
      if (filters.eligibility?.active_5g && !row.active_5gcoverage)
        return false;

      return true;
    });
  }, [data, filters]);

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
