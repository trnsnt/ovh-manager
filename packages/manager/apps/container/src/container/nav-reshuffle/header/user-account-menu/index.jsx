import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useClickAway from 'react-use/lib/useClickAway';
import { useReket } from '@ovh-ux/ovh-reket';
import { useOvhPaymentMethod } from '@ovh-ux/ovh-payment-method';

import { useShell } from '@/context';
import useOnboarding from '@/core/onboarding';
import useProductNavReshuffle from '@/core/product-nav-reshuffle';

import UserAccountMenuButton from './button.jsx';
import UserAccountMenuContent from './content.jsx';

import style from './style.module.scss';

export const UserAccountMenu = ({ onToggle }) => {
  const ref = useRef();
  const shell = useShell();

  const environment = shell.getPlugin('environment').getEnvironment();
  const user = environment.getUser();
  const region = environment.getRegion();

  const {
    onboarding,
    navigation,
    openAccountSidebar,
    closeAccountSidebar,
  } = useProductNavReshuffle();
  const onboardingHelper = useOnboarding();

  const ovhPaymentMethod = useOvhPaymentMethod({
    reketInstance: useReket(),
    region,
  });

  // const [show, setShow] = useState(false);
  const [isPaymentMethodLoading, setIsPaymentMethodLoading] = useState(true);
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState(null);
  const handleRootClose = () => {
    if (!onboardingHelper.hasStarted(onboarding.openedState)) {
      closeAccountSidebar();
    }
  };

  // useEffect(async () => {
  //   onToggle({ show });
  // }, [show]);

  useEffect(async () => {
    if (
      !defaultPaymentMethod &&
      navigation.isAccountSidebarOpened &&
      !user.enterprise
    ) {
      try {
        setDefaultPaymentMethod(
          await ovhPaymentMethod.getDefaultPaymentMethod(),
        );
      } finally {
        setIsPaymentMethodLoading(false);
      }
    }

    onToggle({ show: navigation.isAccountSidebarOpened });
  }, [navigation.isAccountSidebarOpened]);

  useClickAway(ref, handleRootClose);

  return (
    <div className="oui-navbar-dropdown" ref={ref}>
      <UserAccountMenuButton
        show={navigation.isAccountSidebarOpened}
        onClick={(nextShow) => {
          if (nextShow) {
            openAccountSidebar();
          } else {
            closeAccountSidebar();
          }
        }}
      >
        <span
          className={`${style.userIcon} oui-icon navbar-oui-icon oui-icon-user align-middle mr-2`}
        ></span>
        <span
          className={`${style.userInfos} align-middle`}
        >{`${user.firstname} ${user.name}`}</span>
      </UserAccountMenuButton>
      <UserAccountMenuContent
        defaultPaymentMethod={defaultPaymentMethod}
        isLoading={isPaymentMethodLoading}
      />
    </div>
  );
};

UserAccountMenu.propTypes = {
  onToggle: PropTypes.func.isRequired,
};

UserAccountMenu.defaultProps = {
  onToggle: () => {},
};

export default UserAccountMenu;
