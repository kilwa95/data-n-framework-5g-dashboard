export const mockLocationData = {
  regions: [
    { id: 'r1', name: 'Île-de-France' },
    { id: 'r2', name: 'Auvergne-Rhône-Alpes' },
  ],
  departments: {
    r1: [
      { id: 'd1', name: 'Paris' },
      { id: 'd2', name: 'Hauts-de-Seine' },
    ],
    r2: [
      { id: 'd3', name: 'Rhône' },
      { id: 'd4', name: 'Isère' },
    ],
  },
  cities: {
    d1: [{ id: 'c1', name: 'Paris' }],
    d2: [
      { id: 'c2', name: 'Nanterre' },
      { id: 'c3', name: 'Boulogne-Billancourt' },
    ],
  },
};

export const mockTestResults = [
  {
    id: '1',
    datetime: '2024-02-20T10:30:00',
    longitude: 2.3522,
    latitude: 48.8566,
    can_subscribe: true,
    is_ztd: true,
    foundCoverage: true,
    cell_1800_coverage: 3,
    sector_capacity: 'High',
    max_user: 150,
    site_name: 'PAR_001',
    sector: 'S1',
    active_4gcoverage: true,
    active_4g_cells: 4,
    active_5gcoverage: true,
    active_5g_cells: 2,
  },
];
