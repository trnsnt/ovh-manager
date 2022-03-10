import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ProductNavReshuffleContext from './context';
import useOnboarding, {
  ONBOARDING_OPENED_STATE_ENUM,
  ONBOARDING_STATUS_ENUM,
} from '../onboarding';

export const ProductNavReshuffleProvider = ({ children }) => {
  let pnrContext = useContext(ProductNavReshuffleContext);
  const onboardingHelper = useOnboarding();

  const [isLoading, setIsLoading] = useState(true);

  // onboarding
  const [onboardingState, setOnboardingState] = useState({
    openedState: ONBOARDING_OPENED_STATE_ENUM.CLOSED,
  });

  const openOnboarding = () => {
    setOnboardingState({
      ...onboardingState,
      openedState: onboardingHelper.getNextOpenedState(
        onboardingState.openedState,
      ),
    });
  };

  const startOnboarding = () => {
    setOnboardingState({
      ...onboardingState,
      openedState: ONBOARDING_OPENED_STATE_ENUM.WALKME,
    });
  };

  const closeOnboarding = (onboardingStatus) => {
    setOnboardingState({
      ...onboardingState,
      openedState: ONBOARDING_OPENED_STATE_ENUM.CLOSED,
    });

    return onboardingHelper.updatePreference({
      status: onboardingStatus || ONBOARDING_STATUS_ENUM.CLOSED,
    });
  };

  // navigation
  const [navigationState, setNavigationState] = useState({
    isAccountSidebarOpened: false, // or maybe use ux plugin?
  });

  const openAccountSidebar = () => {
    setNavigationState({
      ...navigationState,
      isAccountSidebarOpened: true,
    });
  };

  const closeAccountSidebar = () => {
    setNavigationState({
      ...navigationState,
      isAccountSidebarOpened: false,
    });
  };

  useEffect(() => {
    onboardingHelper
      .init()
      .then((status) => {
        setOnboardingState({
          ...onboardingState,
          openedState: onboardingHelper.getOpenedStateFromStatus(status),
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  pnrContext = {
    isLoading,
    // onboarding
    onboarding: onboardingState,
    openOnboarding,
    startOnboarding,
    closeOnboarding,
    // navigation
    navigation: navigationState,
    openAccountSidebar,
    closeAccountSidebar,
  };

  return (
    <ProductNavReshuffleContext.Provider value={pnrContext}>
      {children}
    </ProductNavReshuffleContext.Provider>
  );
};

ProductNavReshuffleProvider.propTypes = {
  children: PropTypes.any,
};

export default ProductNavReshuffleProvider;
