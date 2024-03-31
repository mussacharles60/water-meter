import { useEffect, useRef, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import { User, UserData } from '../../models';
import DatabaseManager from '../../service';
import Routes from '../../utils/routes';
import Themer from '../../utils/themer';
import Account from './account';
import Dashboard from './dashboard';
import DevicesTab from './devices';
import './index.scss';
import SideNav from './side-nav';


const Main = () => {

  const history = useHistory();
  const didMount = useRef(false);
  const databaseManager: DatabaseManager = new DatabaseManager();

  const [user_id, setUserId] = useState<string | null>(null);
  const [user_name, setUserName] = useState<string | null>(null);
  const [user_data, setUseData] = useState<UserData | null>(null);
  const user_data_ref = useRef<UserData | null>(null);

  const [page_title, setPageTitle] = useState('');
  const [dashboard_showed, setDashboardShowed] = useState<boolean>(false);
  const [devices_showed, setDevicesShowed] = useState<boolean>(false);
  const [account_showed, setAccountShowed] = useState<boolean>(false);

  const [devices_loading, setDevicesLoading] = useState<boolean>(false);
  const [error_loading, setErrorLoading] = useState<string | null>(null);

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
    onReloadClick();
    return () => {
      didMount.current = false;
      Themer.unsubscribe();
    }
  }, []);

  useEffect(() => {
    if (!didMount.current) return;
    switchPage(history.location.pathname);
  }, [history.location.pathname]);

  const onReloadClick = () => {
    if (!didMount.current) return;
    console.log('onReloadClick');
    const user_id = localStorage.getItem('app-uid');
    if (!user_id) return;

    databaseManager.getUserDevices(user_id).then((result: any) => {
      if (!didMount.current) return;
      if (result && result.success && result.success.data) {
        user_data_ref.current = result.success.data.length > 0 ? result.success.data[0] : null;
        setUseData(user_data_ref.current);
        setErrorLoading(result.success.data.length > 0 ? null : "No devices found");
      } else {
        setDevicesLoading(false);
        setErrorLoading("Could not load devices. Click Here To Retry");
      }
    })
      .catch(() => {
        if (!didMount.current) return;
        setDevicesLoading(false);
        setErrorLoading("Could not load devices. Click Here To Retry");
      });
  }

  const switchPage = (path: string) => {
    if (path === Routes.Devices || path === Routes.Devices + '/') {
      document.title = 'Devices - Water Meter';
      setPageTitle('Devices');
      setDevicesShowed(true);
    }
    if (path.startsWith(`${Routes.Devices}/`)) {
      document.title = 'Device - Water Meter';
      setPageTitle('Device');
      setDevicesShowed(true);
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
          {(dashboard_showed || history.location.pathname.startsWith(Routes.Dashboard)) && user_id && user_data &&
            <Dashboard
              user_data={user_data} />
          }
          {(account_showed || history.location.pathname.startsWith(Routes.Account)) && user_id && user_data &&
            <Account
              user_data={user_data} />
          }
          {(devices_loading || history.location.pathname.startsWith(Routes.Devices)) && user_id && user_data &&
            <DevicesTab
              user_data={user_data} />
          }
        </div>
      </div>
    </div>
  );
}

export default Main;