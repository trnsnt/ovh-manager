import React from 'react';
import LegacyContainer from '@/container/legacy';
import NavReshuffleContainer from '@/container/nav-reshuffle';
import useProductNavReshuffle from '@/core/product-nav-reshuffle';
import { OnboardingProvider } from '@/core/onboarding';

export default function Container() {
  const { isBeta } = useProductNavReshuffle();
  return (
    <>
      {isBeta ? (
        <OnboardingProvider>
          <NavReshuffleContainer />
        </OnboardingProvider>
      ) : (
        <LegacyContainer />
      )}
    </>
  );
}
