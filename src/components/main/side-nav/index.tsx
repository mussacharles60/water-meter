import { FaHome, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import Routes from '../../../utils/routes';
import './index.scss';

type Props = {
  onLogOutBtnClick: () => void;
}

const SideNav = (props: Props) => {
  const history = useHistory();

  return (
    <div className='side-nav-lay'>
      <div className='links-lay'>
        <div className='header-lay'>
          <span className='ttle-txt'>Water Meter</span>
        </div>
        <Link to={Routes.Landing} className='link-btn'>
          <FaHome className='link-icon' />
          <span className='link-text'>Home</span>
        </Link>
        <Link to={Routes.Dashboard} className={`link-btn ${history.location.pathname.startsWith(Routes.Dashboard) ? 'also-active' : ''}`}>
          <FaTachometerAlt className='link-icon' />
          <span className='link-text'>Dashboard</span>
        </Link>
        <Link to={Routes.Devices} className={`link-btn ${history.location.pathname.startsWith(Routes.Devices) ? 'also-active' : ''}`}>
          <FaTachometerAlt className='link-icon' />
          <span className='link-text'>Devices</span>
        </Link>
        <Link to={Routes.Account} className={`link-btn ${history.location.pathname.startsWith(Routes.Account) ? 'also-active' : ''}`}>
          <FaTachometerAlt className='link-icon' />
          <span className='link-text'>Account</span>
        </Link>
      </div>
      <div className='footer-lay'>
        <div className="logout-btn-cont">
          <div className="logout-btn" onClick={props.onLogOutBtnClick}>
            <FaSignOutAlt className='logout-icon' />
            <span className='logout-text'>Log Out</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideNav;