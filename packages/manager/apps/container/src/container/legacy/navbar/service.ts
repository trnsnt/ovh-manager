import { get, find } from 'lodash-es';

import { SECONDARY_UNIVERSES } from './constants';

type Universe = {
  isPrimary: boolean;
  universe: string;
  url: string;
};

export function fetchUniverses(): Promise<Universe[]> {
  return fetch('/engine/2api/universes?version=beta', {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Accept: 'application/json',
    },
    credentials: 'same-origin',
  })
    .then((response) => response.json())
    .then((universes) =>
      universes.map((universe) => ({
        isPrimary: !SECONDARY_UNIVERSES.includes(universe.universe),
        universe: universe.universe,
        url: universe.url,
      })),
    );
}

export function getBrandURL(universes: Universe[]): string {
  return get(find(universes, { universe: 'hub' }), 'url', '#');
}