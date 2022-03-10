import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';

import popoverStyle from '@/container/common/popover.module.scss';
import useProductNavReshuffle from '@/core/product-nav-reshuffle';
import { ONBOARDING_STATUS_ENUM } from '@/core/onboarding';

import style from './style.module.scss';

const ELEMENT_OFFSET = 10;

export const OnboardingWalkMe = () => {
  const { t } = useTranslation('nav-reshuffle/onboarding');
  const walkMeRef = useRef();
  const stepElementRef = useRef();

  const {
    closeOnboarding,
    openAccountSidebar,
    closeAccountSidebar,
  } = useProductNavReshuffle();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  const steps = [
    {
      selector: '#header-user-menu-button',
      placement: 'bottom-start',
      title: t('onboarding_walkme_popover_step1_title'),
      content: t('onboarding_walkme_popover_step1_content'),
    },
    {
      selector: '#user-account-menu-profile',
      placement: 'left-start',
      title: t('onboarding_walkme_popover_step2_title'),
      content: t('onboarding_walkme_popover_step2_content'),
      onBeforeEnter: () => {
        openAccountSidebar();
        const animationPromise = new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 150);
        });
        return animationPromise;
      },
    },
    {
      selector: '#user-account-menu-payment-method',
      placement: 'left-start',
      title: t('onboarding_walkme_popover_step3_title'),
      content: t('onboarding_walkme_popover_step3_content'),
    },
    {
      selector: '#sidebar-link-services',
      placement: 'right-start',
      title: t('onboarding_walkme_popover_step4_title'),
      content: t('onboarding_walkme_popover_step4_content'),
      onBeforeEnter: () => {
        closeAccountSidebar();
      },
    },
    {
      selector: '#sidebar-link-billing',
      placement: 'right-start',
      title: t('onboarding_walkme_popover_step5_title'),
      content: t('onboarding_walkme_popover_step5_content'),
    },
  ];

  const onHideBtnClick = (onboardingStatus) => {
    closeOnboarding(onboardingStatus);
    closeAccountSidebar();
  };

  const onNextBtnClick = () => {
    if (currentStepIndex + 1 < steps.length) {
      setIsPopoverVisible(false);
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      onHideBtnClick(ONBOARDING_STATUS_ENUM.DONE);
    }
  };

  useEffect(() => {
    const currentStep = steps[currentStepIndex];

    const onBeforeEnter = currentStep.onBeforeEnter
      ? Promise.resolve(currentStep.onBeforeEnter())
      : Promise.resolve(true);

    onBeforeEnter.then(() => {
      const targetElement = document.querySelector(currentStep.selector);
      const targetPos = targetElement.getBoundingClientRect();
      const stepElement = stepElementRef.current;

      const positionOffset = ELEMENT_OFFSET / 2;

      stepElement.style.top = `${targetPos.top - positionOffset}px`;
      stepElement.style.left = `${targetPos.left - positionOffset}px`;
      stepElement.style.width = `${targetPos.width + ELEMENT_OFFSET}px`;
      stepElement.style.height = `${targetPos.height + ELEMENT_OFFSET}px`;

      // add a timeout of the same time of the stepElement animation
      setTimeout(
        () => {
          setIsPopoverVisible(true);
        },
        currentStepIndex === 0 ? 0 : 300,
      );
    });
  }, [currentStepIndex]);

  return (
    <div className={style['onboarding-walkme']} ref={walkMeRef}>
      <div className={style['onboarding-walkme_overlay']}></div>
      <div
        className={style['onboarding-walkme_step']}
        ref={stepElementRef}
      ></div>
      <Overlay
        show={isPopoverVisible}
        placement={steps[currentStepIndex].placement}
        container={walkMeRef.current}
        transition={false}
        target={stepElementRef.current}
      >
        <Popover
          className={`${style['onboarding-walkme_popover']} ${popoverStyle.popover} oui-popover`}
        >
          <Popover.Title as="h2" className={popoverStyle['popover-header']}>
            {steps[currentStepIndex].title}
          </Popover.Title>
          <Popover.Content className={`${popoverStyle['popover-body']} mb-3`}>
            {steps[currentStepIndex].content}
          </Popover.Content>
          <div className="d-flex flex-row-reverse justify-content-between">
            <button
              className="oui-button oui-button_primary"
              onClick={onNextBtnClick}
            >
              {t('onboarding_walkme_popover_next_step', {
                current: currentStepIndex + 1,
                total: steps.length,
              })}
            </button>
            <button
              className="oui-button oui-button_ghost"
              onClick={() => onHideBtnClick()}
            >
              {t('onboarding_popover_hide_button')}
            </button>
          </div>
        </Popover>
      </Overlay>
    </div>
  );
};

export default OnboardingWalkMe;
