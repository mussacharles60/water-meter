import { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { User, UserDeviceData } from '../../../../models';
import Routes from '../../../../utils/routes';
import './index.scss';

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
      
    </div>
  );
}

export default DeviceTab;