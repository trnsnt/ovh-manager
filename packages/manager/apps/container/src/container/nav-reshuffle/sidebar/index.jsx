import React, { useEffect, useMemo, useState, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useReket } from '@ovh-ux/ovh-reket';
import { useShell } from '@/context';
import SidebarLink from './sidebar-link';
import { countServices, findNodeById } from './utils';
import Assistance from './assistance';
import style from './style.module.scss';
import navigationRoot from './navigation-tree/root';
import PciMenu from './pci';
import logo from '@/assets/images/OVHcloud_logo.svg';

function Sidebar() {
  const { t } = useTranslation('sidebar');
  const shell = useShell();
  const navigationPlugin = shell.getPlugin('navigation');
  const environment = shell.getPlugin('environment').getEnvironment();
  const currentRegion = environment.getRegion();
  const reketInstance = useReket();
  const [currentNavigationNode, setCurrentNavigationNode] = useState(
    navigationRoot,
  );
  const [navigationHistory, setNavigationHistory] = useState([]);
  const [servicesCount, setServicesCount] = useState(null);
  const [isPciMenu, setIsPciMenu] = useState(false);
  const [pciProjects, setPciProjects] = useState(null);
  const [selectedPciProject, setSelectedPciProject] = useState(null);
  const [pciProjectServiceCount, setPciProjectServiceCount] = useState(null);

  /**
   * Fetch service count per service type
   */
  useEffect(() => {
    reketInstance
      .get('/services/count', {
        requestType: 'aapi',
      })
      .then((result) => setServicesCount(result));
  }, []);

  /**
   * Fetch public cloud projects when entering the 'services' menu
   */
  useEffect(() => {
    if (currentNavigationNode.id === 'services' && !pciProjects) {
      reketInstance
        .get('/cloud/project', {
          headers: {
            'X-Pagination-Mode': 'CachedObjectList-Pages',
            'X-Pagination-Size': 5000,
          },
        })
        .then((result) => {
          if (result && result.length) {
            findNodeById(navigationRoot, 'public-cloud').count = result.length;
            setPciProjects(result);
            setSelectedPciProject(result[0]);
          }
        });
    }
  }, [currentNavigationNode]);

  /**
   * Count services of a pci project once a project is selected
   */
  useEffect(() => {
    let abort = false;
    setPciProjectServiceCount(null);
    if (selectedPciProject) {
      reketInstance
        .get(`/services/count?pciProjectId=${selectedPciProject.project_id}`, {
          requestType: 'aapi',
        })
        .then((result) => {
          if (!abort) {
            setPciProjectServiceCount(result);
          }
        });
    }
    return () => {
      abort = true;
    };
  }, [selectedPciProject]);

  const clickHandler = (node) => {
    if (node.id === 'public-cloud') {
      setIsPciMenu(true);
    } else if (node.children) {
      setNavigationHistory([...navigationHistory, currentNavigationNode]);
      setCurrentNavigationNode(node);
    }
  };

  const goBackHandler = () => {
    setCurrentNavigationNode(navigationHistory.pop());
    setNavigationHistory(navigationHistory);
  };

  /**
   * Displayed menu items are the children of current navigation node
   * filtered by region if the attribute is provided
   */
  const menuItems = useMemo(() => {
    return currentNavigationNode.children
      ?.filter((node) => {
        if (node.region) {
          const regionFilter = [].concat(node.region);
          return regionFilter.includes(currentRegion);
        }
        return true;
      })
      .map((node) => (
        <li key={node.id}>
          <SidebarLink
            node={node}
            count={countServices(servicesCount, node)}
            onClick={() => clickHandler(node)}
          />
        </li>
      ));
  }, [currentNavigationNode, servicesCount]);

  return (
    <div className={style.sidebar}>
      <span role="img" className={style.sidebar_logo} aria-label="OVHcloud">
        <img src={logo} aria-hidden="true" />
      </span>
      <ul>
        {navigationHistory.length > 0 && !isPciMenu && (
          <a className={style.sidebar_back_btn} onClick={goBackHandler}>
            <span
              className="oui-icon oui-icon-chevron-left"
              aria-hidden="true"
            ></span>
            {t('sidebar_back')}
          </a>
        )}
        {!isPciMenu && (
          <li>
            <h2>{t(currentNavigationNode.translation)}</h2>
          </li>
        )}
        {isPciMenu && (
          <PciMenu
            onExit={() => setIsPciMenu(false)}
            projects={pciProjects}
            selectedProject={selectedPciProject}
            servicesCount={pciProjectServiceCount}
            onSelectProject={(project) => setSelectedPciProject(project)}
          />
        )}
        {!isPciMenu && menuItems}
      </ul>
      <div className={style.sidebar_action}>
        <a href={navigationPlugin.getURL('hub', '#/catalog')}>
          <span
            className={`oui-icon oui-icon-plus ${style.sidebar_action_icon}`}
            aria-hidden="true"
          ></span>
          <span>{t('sidebar_service_add')}</span>
        </a>
      </div>
      <div className={style.sidebar_filler} aria-hidden="true"></div>
      <Suspense fallback="">
        <Assistance />
      </Suspense>
    </div>
  );
}

export default Sidebar;
