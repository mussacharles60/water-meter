import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import AuthContext from './service/context';
import Landing from './components/landing';
import Login from './components/auth/login';
import Main from './components/main';
import  { useContext, useEffect, useState } from 'react';
// import Signup from './components/auth/signup';
// import PasswordForget from './components/auth/password-forget';
// import AuthPage from './components/auth/auth';

// import app version from package.json
const app_version = require('../package.json').version;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      // check version of localStorage
      const localVersion = localStorage.getItem('ui-version');
      if (localVersion !== app_version) {
        setTimeout(() => {
          setTimeout(() => {
            clearAllCaches();
            setTimeout(() => {
              deleteAllCookies();
              setTimeout(() => {
                clearStorage(app_version);
                setTimeout(() => {
                  unregisterServiceWorker();
                  // setTimeout(() => {
                  //   // reload page
                  //   window.location.reload();
                  // }, 1000);
                }, 1000);
              }, 1000);
            }, 1000);
          }, 1000);
        }, 5000);
      }
    }
    registerServiceWorker();

    return () => {
    }
  }, []);

  const clearAllCaches = () => {
    try {
      // check if there is cache in window and clear it
      if ('caches' in window) {
        caches.keys().then((names) => {
          // Delete all the cache files
          names.forEach(name => {
            caches.delete(name);
          });
        });
      }
    } catch (err) {

    }
  }

  const deleteAllCookies = () => {
    try {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
      for (var j = 0; j < cookies.length; j++) {
        var _cookie = cookies[j];
        var _eqPos = _cookie.indexOf("=");
        var _name = _eqPos > -1 ? _cookie.substring(0, _eqPos) : _cookie;
        document.cookie = _name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
      document.cookie.split(";").forEach(function (c) {
        document.cookie = c.replace(/^ +/, "")
          .replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/");
      });
      var _cookies = document.cookie.split("; ");
      for (var c = 0; c < _cookies.length; c++) {
        var d = window.location.hostname.split(".");
        while (d.length > 0) {
          var cookieBase = encodeURIComponent(_cookies[c].split(";")[0].split("=")[0]) +
            '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' +
            d.join('.') +
            ' ;path=';
          var p = window.location.pathname.split('/');
          document.cookie = cookieBase + '/';
          while (p.length > 0) {
            document.cookie = cookieBase + p.join('/');
            p.pop();
          };
          d.shift();
        }
      }
    } catch (err) {

    }
  }

  const clearStorage = (app_version: string) => {
    // clear sessionStorage
    sessionStorage.clear();
    // clear localStorage
    // localStorage.clear();
    // set localStorage version
    localStorage.setItem('ui-version', app_version);
  }

  const unregisterServiceWorker = () => {
    serviceWorkerRegistration.unregister();
  }

  const registerServiceWorker = () => {
    serviceWorkerRegistration.register();
  }

  useEffect(() => {
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Routes />
    </AuthContext.Provider>
  );
}

export default App;

const Routes = () => {
  const Auth = useContext(AuthContext);
  return (
    <BrowserRouter>
      {/* <div className="root-modal" id="root-modal" /> */}
      <Switch>
        <Route exact path='/' render={({ }) => <Landing />} />
        <Route path='/login' render={({ }) => <Login />} />
        {/* <Route path='/signup' render={({ }) => <Signup />} /> */}
        {/* <Route path='/password-forget' render={({ }) => <PasswordForget />} />         */}
        {/* <Route path='/auth' render={({ }) => <AuthPage />} />         */}
        <ProtectedRoute
          path={[
            '/dashboard', '/dashboard/',
            '/devices', '/devices/',
            '/account', '/account/',
            '/account/edit', '/account/edit/',
            '/account/add-members', '/account/add-members/',
            '/activities', '/activities/',
            '/help', '/help/',
          ]}
          auth={Auth.isAuthenticated}
          component={Main} />
      </Switch>
    </BrowserRouter>
  );
}

const ProtectedRoute = ({ auth, component: Component, ...rest }: { auth: boolean, component: any, path: any }) => {
  return (
    <Route
      {...rest}
      render={(props: any) => {
        if (!auth) {
          const user_id = localStorage.getItem('app-uid');
          auth = user_id ? true : false;
        }
        window.addEventListener('storage', (e) => {
          if (e.key === 'app-uid') {
            const user_id = localStorage.getItem('app-uid');
            auth = user_id ? true : false;
          }
        });
        return (auth ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />);
        // <AuthContext.Consumer>
        //   {(context) => {
        //     return (
        //       context.isAuthenticated ? <Component {...props} /> : <Redirect to='/login' />
        //     )
        //   }}
        // </AuthContext.Consumer>
      }}
    />
  );
}
