import dataSource from '@app/datasource';
export const DATA_SOURCE = 'DATA_SOURCE';

export const DatabaseProvider = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      return dataSource.initialize();
    },
  },
];
