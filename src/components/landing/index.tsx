import { useState } from 'react';
import './index.scss';
import { useEffect } from 'react';
import Themer from '../../utils/themer';
import { FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Routes from '../../utils/routes';


const Landing = () => {

  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const name = window.localStorage.getItem('app-un');
    setName(name || "Login");

    Themer.subscribe();
    document.title = "Water Meter";
  });

  return (
    <div className='landing-main'>
      <div className='header-lay'>
        <span className='ttle-txt'>Water Meter</span>
        <Link to={Routes.Account} title={name || 'Login'} className='user-lay'>
          <span className='user-txt'>{name || 'Login'}</span>
          <FaUserAlt className='user-ic' />
        </Link>
      </div>
      <div className='body-lay'>
        <div className='first-lay'>
          <div className='left-lay'>
            <Link to={Routes.Dashboard} className='link-btn'>
              Dashboard
            </Link>
          </div>
          <div className='right-lay'></div>
        </div>
      </div>
    </div>
  );
}

export default Landing;