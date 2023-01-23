import { useEffect, useRef, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import Routes from '../../utils/routes';
import Themer from '../../utils/themer';
import Account from './account';
import Dashboard from './dashboard';
import './index.scss';
import SideNav from './side-nav';


const Main = () => {

  const history = useHistory();
  const didMount = useRef(false);

  const [user_id, setUserId] = useState<string | null>(null);
  const [user_name, setUserName] = useState<string | null>(null);

  const [page_title, setPageTitle] = useState('');
  const [dashboard_showed, setDashboardShowed] = useState<boolean>(false);
  const [devices_showed, setDevicesShowed] = useState<boolean>(false);
  const [account_showed, setAccountShowed] = useState<boolean>(false);

  useEffect(() => {
    didMount.current = true;
    Themer.subscribe();
    const user_id = window.localStorage.getItem('app-uid');
    const user_name = window.localStorage.getItem('app-un');
    if (!user_id) {
      let { from }: any = history.location.state || { from: { pathname: Routes.Login } };
      history.replace(from);
      return;
    }
    setUserId(user_id);
    setUserName(user_name);
    switchPage(history.location.pathname);
    return () => {
      didMount.current = false;
      Themer.unsubscribe();
    }
  }, []);

  useEffect(() => {
    if (!didMount.current) return;
    switchPage(history.location.pathname);
  }, [history.location.pathname]);

  const switchPage = (path: string) => {
    if (path === Routes.Devices || path === Routes.Devices + '/') {
      document.title = 'Devices - Water Meter';
      setPageTitle('Devices');
    }
    if (path.startsWith(`${Routes.Devices}/`)) {
      document.title = 'Device - Water Meter';
      setPageTitle('Device');
    } else if (path.startsWith(Routes.Dashboard)) {
      document.title = 'Dashboard - Water Meter';
      setPageTitle('Dashboard');
      setDashboardShowed(true);
    } else if (path.startsWith(Routes.Account)) {
      document.title = 'Account - Water Meter';
      setPageTitle('Account');
      setAccountShowed(true);
    }
  }

  const onLogOutBtnClick = () => {
    if (!didMount.current) return;
    localStorage.removeItem('app-un');
    localStorage.removeItem('app-uid');
    setTimeout(() => history.push('/'), 100);
  }

  return (
    <div className='main-lay'>
      <SideNav onLogOutBtnClick={onLogOutBtnClick} />
      <div className='main-wrapper'>
        <div className='main-header-lay'>
          <span className='ttle-txt'>{page_title}</span>
          <Link to={Routes.Account} title={user_name || 'User'} className='user-lay'>
            <span className='user-txt'>{user_name || 'User'}</span>
            <FaUserAlt className='user-ic' />
          </Link>
        </div>
        <div className='main-body-lay'>
          {(dashboard_showed || history.location.pathname.startsWith(Routes.Dashboard)) && user_id &&
            <Dashboard />
          }
          {(account_showed || history.location.pathname.startsWith(Routes.Account)) && user_id &&
            <Account />
          }
        </div>
      </div>
    </div>
  );
}

export default Main;