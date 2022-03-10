import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';

import { useShell } from '@/context/useApplicationContext';
import { ONBOARDING_OPENED_STATE_ENUM } from '@/core/onboarding';
import useProductNavReshuffle from '@/core/product-nav-reshuffle';

import style from './style.module.scss';
import popoverStyle from '@/container/common/popover.module.scss';

export const OnboardingIntroduction = () => {
  const { t } = useTranslation('nav-reshuffle/onboarding');
  const popoverContainer = useRef(null);
  const popoverButton = useRef(null);
  const productNavReshuffle = useProductNavReshuffle();

  const [isBtnVisible, setIsBtnVisible] = useState(false);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  const user = useShell()
    .getPlugin('environment')
    .getEnvironment()
    .getUser();

  const openOnboarding = () => {
    productNavReshuffle.openOnboarding();
  };

  const startOnboarding = () => {
    productNavReshuffle.startOnboarding();
  };

  const closeOnboarding = () => {
    productNavReshuffle.closeOnboarding();
  };

  useEffect(() => {
    switch (productNavReshuffle.onboarding.openedState) {
      case ONBOARDING_OPENED_STATE_ENUM.BUTTON:
        setIsBtnVisible(true);
        setIsPopoverVisible(false);
        break;
      case ONBOARDING_OPENED_STATE_ENUM.WELCOME:
        setIsBtnVisible(true);
        setIsPopoverVisible(true);
        break;
      default:
        setIsBtnVisible(false);
        setIsPopoverVisible(false);
        break;
    }
  }, [productNavReshuffle.onboarding.openedState]);

  return (
    <div ref={popoverContainer}>
      {isBtnVisible && (
        <button
          type="button"
          className={`${style.onboardingButton} oui-button oui-button_icon-left oui-button_l oui-button_primary`}
          onClick={() => openOnboarding()}
          ref={popoverButton}
          aria-expanded={isPopoverVisible}
        >
          <span className="oui-icon oui-icon-info"></span>
          <span className="oui-button__text">
            {t('onboarding_button_text')}
          </span>
        </button>
      )}

      <Overlay
        show={isPopoverVisible}
        placement="top-end"
        container={popoverContainer.current}
        transition={false}
        target={popoverButton.current}
      >
        <Popover
          className={`${style.welcomePopover} ${popoverStyle.popover} oui-popover`}
        >
          <Popover.Title as="h2" className={popoverStyle['popover-header']}>
            {t('onboarding_introduction_popover_title', {
              userName: user.firstname,
            })}
          </Popover.Title>
          <Popover.Content className={popoverStyle['popover-body']}>
            <p>{t('onboarding_introduction_popover_content')}</p>
            <small className="d-block mb-3">
              {t('onboarding_introduction_popover_extra')}
            </small>
          </Popover.Content>
          <div className="d-flex flex-row-reverse justify-content-between">
            <button
              className="oui-button oui-button_primary"
              onClick={() => startOnboarding()}
            >
              {t('onboarding_popover_follow_guide_button')}
            </button>
            <button
              className="oui-button oui-button_ghost"
              onClick={() => closeOnboarding()}
            >
              {t('onboarding_popover_hide_button')}
            </button>
          </div>
        </Popover>
      </Overlay>
    </div>
  );
};

export default OnboardingIntroduction;
