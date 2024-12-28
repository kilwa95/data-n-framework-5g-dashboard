import { GridColDef } from '@mui/x-data-grid';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

export const getTestResultsColumns = (): GridColDef[] => [
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
];
