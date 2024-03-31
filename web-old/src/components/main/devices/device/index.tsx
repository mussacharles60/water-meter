import { useEffect, useRef } from 'react';
import { FaHistory, FaInfoCircle, FaUsers } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { AiFillInteraction } from 'react-icons/ai';
import { GiLiquidSoap } from 'react-icons/gi';
import { Link, useHistory } from 'react-router-dom';
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
      <div className='tabs-header'>
        <Link to={`${Routes.Devices}/${props.device.id}`} className={`tab-btn${history.location.pathname === `${Routes.Devices}/${props.device.id}` || history.location.pathname === `${Routes.Devices}/${props.device.id}/` || history.location.pathname.startsWith(`${Routes.Devices}/${props.device.id}/settings`) ? ' also-active' : ''}`}>
          <FaInfoCircle className='tab-btn-icon' />
          <span className='tab-btn-text'>Info</span>
        </Link>
        <Link to={`${Routes.Devices}/${props.device.id}/history`} className={`tab-btn${history.location.pathname.startsWith(`${Routes.Devices}/${props.device.id}/history`) ? ' also-active' : ''}`}>
          <FaHistory className='tab-btn-icon' />
          <span className='tab-btn-text'>Usage History</span>
        </Link>
        <Link to={`${Routes.Devices}/${props.device.id}/users`} className={`tab-btn${history.location.pathname.startsWith(`${Routes.Devices}/${props.device.id}/users`) ? ' also-active' : ''}`}>
          <FaUsers className='tab-btn-icon' />
          <span className='tab-btn-text'>Users</span>
        </Link>
      </div>
      <div className='tabs-lay'>
        <div className='tab-ly info-tab' style={{ display: history.location.pathname === `${Routes.Devices}/${props.device.id}` || history.location.pathname === `${Routes.Devices}/${props.device.id}/` || history.location.pathname.startsWith(`${Routes.Devices}/${props.device.id}/settings`) ? 'flex' : 'none' }}>
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
          <div className='second-lay'>
            <div className='item-lay'>
              {/* <GiLiquidSoap className='item-icon' /> */}
              <span className='item-value'>{props.device.status.volume_purchased + 'L'}</span>
              <span className='item-title'>{`${props.device.status.volume_purchased === 1 ? 'Total Litre Purchased' : 'Total Litres Purchased'}`}</span>
            </div>
            <div className='item-lay'>
              <span className='item-value'>{props.device.status.volume + 'L'}</span>
              <span className='item-title'>{`${props.device.status.volume === 1 ? 'Litre Remained' : 'Litres Remained'}`}</span>
            </div>
            <div className='item-lay'>
              <span className='item-value'>{props.device.status.percent_usage + '%'}</span>
              <span className='item-title'>{`Usage`}</span>
            </div>
          </div>
          <div className='third-lay'>
            <div className='btn-lay'>
              <AiFillInteraction className='btn-icon' />
              <span className='btn-text'>Top Up Meter</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeviceTab;