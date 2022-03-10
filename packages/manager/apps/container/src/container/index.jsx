import React from 'react';
import LegacyContainer from '@/container/legacy';
import NavReshuffleContainer from '@/container/nav-reshuffle';
import useContainer from '@/core/container';
import { ProductNavReshuffleProvider } from '@/core/product-nav-reshuffle';

export default function Container() {
  const { isBeta } = useContainer();
  return (
    <>
      {isBeta ? (
        <ProductNavReshuffleProvider>
          <NavReshuffleContainer />
        </ProductNavReshuffleProvider>
      ) : (
        <LegacyContainer />
      )}
    </>
  );
}
