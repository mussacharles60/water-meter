import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import './index.scss';
import { useEffect } from 'react';
import { UserData } from '../../../models';
import Routes from '../../../utils/routes';

type Props = {
  user_data: UserData;
}

const Dashboard = (props: Props) => {

  const history = useHistory();

  const didMount = useRef(false);

  useEffect(() => {
    didMount.current = true;

    return () => {
      didMount.current = false;
    }
  });

  return (
    <div className='dashboard-lay' style={{ display: history.location.pathname.startsWith(Routes.Dashboard) ? 'flex' : 'none' }}></div>
  );
}

export default Dashboard;