import React, { useContext, useEffect, useRef, useState } from 'react';

import { plugin, shell as shellApi } from '@ovh-ux/shell';

import ApplicationContext from '../context';
import ShellHeader from './header';
import style from './shell.module.scss';

function Shell() {
  const iframeRef = useRef(null);
  const [iframe, setIframe] = useState(null);
  const [router, setRouter] = useState(null);
  const { environment, ux } = useContext(ApplicationContext);
  let shell = null;

  ux.registerSidebar('account', { isOpen: true });
  ux.registerSidebar('notifications', { isOpen: false });

  useEffect(() => {
    shell = shellApi.initShell(iframeRef.current);
    shell.registerPlugin('i18n', plugin.i18n(shell, environment));
  }, []);

  useEffect(() => {
    setIframe(iframeRef.current);
  }, [iframeRef]);

  useEffect(() => {
    const routing = plugin.routing.initRouting(iframeRef.current);
    shell.registerPlugin('routing', routing);
    setRouter(routing.router);
  }, [iframeRef, shell]);

  return (
    <div className={style.managerShell}>
      {router}
      <div className={style.managerShell_header}>
        <ShellHeader />
      </div>
      <div className={style.managerShell_content}>
        <iframe
          label="app"
          role="document"
          src="about:blank"
          ref={iframeRef}
        ></iframe>
      </div>
      <div className={style.managerShell_footer}></div>
    </div>
  );
}

export default Shell;