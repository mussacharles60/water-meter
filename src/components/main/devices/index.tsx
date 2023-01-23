import { UserData } from '../../../models';
import './index.scss';
import { Link, useHistory } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Routes from '../../../utils/routes';
import { BsSpeedometer } from 'react-icons/bs';
import { UserDeviceData } from '../../../models';
import DeviceTab from './device';


type Props = {
  user_data: UserData;
}

const DevicesTab = (props: Props) => {
  const history = useHistory();
  const didMount = useRef(false);

  useEffect(() => {
    didMount.current = true;

    return () => {
      didMount.current = false;
    }
  });

  return (
    <div className='devices-main' style={{ display: history.location.pathname.startsWith(Routes.Devices) ? 'flex' : 'none' }}>
      <div className='left-lay'>
        <div className='header-lay'>
          <span className='header-text'>All Meters</span>
        </div>
        <div className='body-lay'>
          {props.user_data.devices.map((d: UserDeviceData, i) => {
            return (
              <Link to={Routes.Devices + '/' + d.id} key={i} className={`device-list-item${history.location.pathname.startsWith(Routes.Devices + '/' + d.id) ? ' device-list-item-also-active' : ''}`}>
                <div className='icon-lay'>
                  <BsSpeedometer className='icon-icon' />
                </div>
                <div className='text-lay'>
                  <span className='text-title'>{d.name}</span>
                  <span className='text-info'>{d.location}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className={`right-lay${history.location.pathname.startsWith(Routes.Devices + '/') && history.location.pathname.length > (Routes.Devices + '/').length ? ' with-item' : ''}`}>
        {(history.location.pathname === Routes.Devices || history.location.pathname === Routes.Devices + '/') &&
          <span className='empty-state-text'>Select device to view</span>
        }
        {props.user_data.devices.map((d: UserDeviceData, i) => {
          return (
            <DeviceTab
              key={i}
              user={props.user_data.user}
              device={d} />
          );
        })}
      </div>
    </div>
  );
}

export default DevicesTab;