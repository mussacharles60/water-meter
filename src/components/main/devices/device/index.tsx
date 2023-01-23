import { useEffect, useRef } from 'react';
import { FaHistory } from 'react-icons/fa';
import {MdLocationOn } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { User, UserDeviceData } from '../../../../models';
import Routes from '../../../../utils/routes';
import './index.scss';
import moment from 'moment';

type Props = {
  user: User,
  device: UserDeviceData,
}

const DeviceTab = (props: Props) => {

  const history = useHistory();
  const didMount = useRef(false);

  useEffect(() => {
    didMount.current = true;

    return () => {
      didMount.current = false;
    }
  });

  return (
    <div className='device-main' style={{ display: history.location.pathname.startsWith(Routes.Devices + '/' + props.device.id) ? 'flex' : 'none' }}>
      <div className='header-lay'>
        <span className='header-text'>{props.device.name}</span>
      </div>
      <div className='first-lay'>
        <div className='left-lay'>
          <div className='item-lay'>
            <MdLocationOn className='item-icon' />
            <span className='item-text'>{props.device.location}</span>
          </div>
          <div className='item-lay'>
            <FaHistory className='item-icon' />
            <span className='item-text'>{moment(props.device.last_updated).format('DD-MM-YY HH:mm:ss')}</span>
          </div>
        </div>
        <div className='right-lay'>

        </div>
      </div>
    </div>
  );
}

export default DeviceTab;