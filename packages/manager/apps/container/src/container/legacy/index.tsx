import React, {
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { plugin, IFrameMessageBus } from '@ovh-ux/shell';
import { Redirect, Route } from 'react-router-dom';

import NavReshuffleBetaAccessModal from '@/container/common/pnr-beta-modal';
import ApplicationContext from '@/context';

import LegacyHeader from './Header';
import style from './template.module.scss';

function LegacyContainer(): JSX.Element {
  const iframeRef = useRef(null);
  const [iframe, setIframe] = useState(null);
  const [router, setRouter] = useState(null);
  const { shell } = useContext(ApplicationContext);

  useEffect(() => {
    setIframe(iframeRef.current);
    shell.setMessageBus(new IFrameMessageBus(iframeRef.current));
  }, [iframeRef]);

  useEffect(() => {
    const routing = plugin.routing.initRouting(shell, iframeRef.current);
    const tracking = shell.getPlugin('tracking');

    // Hub application redirections
    routing.addRoute(
      <Route exact path="/catalog">
        <Redirect to="/hub/catalog" />
      </Route>,
    );

    // Telecom application redirections
    [
      'freefax/:id?',
      'pack/:id?',
      'sms/:id?',
      'task',
      'telephony/:id?',
      'orders',
      'overTheBox/:id?',
    ].forEach((telecomRoute) =>
      routing.addRoute(
        <Redirect from={`/${telecomRoute}`} to={`/telecom/${telecomRoute}`} />,
      ),
    );

    shell.registerPlugin('routing', routing);
    setRouter(routing.router);
    tracking.trackMVTest({
      test: '[product-navigation-reshuffle]',
      waveId: 1,
      creation: '[old-nav]',
    });
  }, [iframeRef, shell]);

  return (
    <div className={style.managerShell}>
      {router}
      <Suspense fallback="">
        <NavReshuffleBetaAccessModal />
      </Suspense>
      <div className={style.managerShell_header}>
        <LegacyHeader />
      </div>
      <div className={style.managerShell_content}>
        <iframe
          label="app"
          role="document"
          src="about:blank"
          ref={iframeRef}
        ></iframe>
      </div>
    </div>
  );
}

export default LegacyContainer;
