import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import './index.scss';
import { useEffect } from 'react';
import { UserData } from '../../../models';
import Routes from './../../../utils/routes';

type Props = {
  user_data: UserData;
}

const Account = (props: Props) => {

  const history = useHistory();

  const avatar: string = require('../../../assets/images/avatar.png');

  const didMount = useRef(false);

  useEffect(() => {
    didMount.current = true;

    return () => {
      didMount.current = false;
    }
  });

  return (
    <div className='account-lay' style={{display: history.location.pathname.startsWith(Routes.Account) ? 'flex' : 'none'}}>
      <div className='first-ly'>
        <div className='img-lay'>
          <div className='img-tp' />
          <img className='img'
            src={avatar}
            alt={'avatar'} />
        </div>
        <div className='info-lay'>
          <span className='info-text also-title'>{props.user_data.user.name}</span>
          <span className='info-text'>{props.user_data.user.email}</span>
          <span className='info-text'>{`${props.user_data.devices.length} ${props.user_data.devices.length === 1 ? 'Device' : 'Devices'}`}</span>
        </div>
      </div>
    </div>
  );
}

export default Account;