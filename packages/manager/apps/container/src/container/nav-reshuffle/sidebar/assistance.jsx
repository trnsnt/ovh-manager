import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import ApplicationContext from '@/context';
import { useURL } from '@/container/common/urls-constants';
import SidebarLink from './sidebar-link';

function AssistanceSidebar() {
  const { t } = useTranslation('sidebar');
  const { shell } = useContext(ApplicationContext);
  const environment = shell
    .getPluginManager()
    .getPlugin('environment')
    .getEnvironment();
  const urls = useURL(environment);

  const hasAdvancedSupport = ['EU', 'CA'].includes(environment.getRegion());

  return (
    <ul>
      <li>
        <h2>{t('sidebar_assistance_title')}</h2>
      </li>
      <li>
        <SidebarLink
          node={{
            translation: 'sidebar_assistance_help_center',
            url: urls.get('help'),
            isExternal: true,
          }}
        />
        <SidebarLink
          node={{
            translation: 'sidebar_assistance_tickets',
            routing: {
              application: 'dedicated',
              hash: '#/ticket',
            },
          }}
        />
        <SidebarLink
          node={{
            translation: 'sidebar_assistance_status',
            url: urls.get('status'),
            isExternal: true,
          }}
        />
        {hasAdvancedSupport && (
          <SidebarLink
            node={{
              translation: 'sidebar_assistance_support_level',
              routing: {
                application: 'dedicated',
                hash: '#/useraccount/support/level',
              },
            }}
          />
        )}
        {hasAdvancedSupport && (
          <SidebarLink
            node={{ translation: 'sidebar_assistance_live_chat' }}
            onClick={() => shell.getPlugin('ux').openChatbot()}
          />
        )}
      </li>
    </ul>
  );
}

export default AssistanceSidebar;
