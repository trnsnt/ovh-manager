import services from './services';

export default {
  children: [
    {
      id: 'home',
      translation: 'sidebar_home',
      routing: {
        application: 'hub',
      },
    },
    services,
    {
      id: 'account',
      translation: 'sidebar_account',
      routing: {
        application: 'dedicated',
        hash: '#/useraccount',
      },
    },
    {
      id: 'billing',
      translation: 'sidebar_billing',
      routing: {
        application: 'dedicated',
        hash: '#/billing/history',
      },
    },
    {
      id: 'orders',
      translation: 'sidebar_orders',
      routing: {
        application: 'dedicated',
        hash: '#/billing/orders',
      },
    },
    {
      id: 'sunrise',
      translation: 'sidebar_sunrise',
      routing: {
        application: 'sunrise',
      },
      region: ['EU', 'CA'],
    },
    {
      id: 'marketplace',
      translation: 'sidebar_marketplace',
      url: 'https://marketplace.ovhcloud.com/',
      isExternal: true,
      region: ['EU'],
    },
  ],
};
