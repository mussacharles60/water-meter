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
        <div className="pallete-container">
          <label className="switch" title="Change theme">
            <input type="checkbox" className="checkbox" id="theme-btn" />
            <span className="toggle-thumb">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 20 20" style={{ fill: "var(--color-pallete-icon)", padding: "4px" }}>
                <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 20 20" style={{ fill: "var(--color-pallete-icon)", padding: "4px" }}>
                <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
              </svg>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default SideNav;