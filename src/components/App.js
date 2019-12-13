import React, { useEffect, useState } from 'react';
import '../css/app.scss';
import AFFCarousel from './AFFCarousel';
import AFFPosts from './AFFPosts';
import moment from 'moment';
import logo from '../images/logo192.png';

const App = () => {
  const [loaded, setLoaded] = useState(false)
  
  useEffect(() =>{
    setLoaded(true);
  },[]);

  return (
    <div className={loaded ? 'aff-app show': 'aff-app'}>
      <header>
        <nav className="navbar navbar-static-top navbar-dark bg-dark">
            <a className="navbar-brand" href="#navbar"><strong>BULLRING</strong> Birmingham</a>
        </nav>
      </header>
      <AFFCarousel />
      <main className="container">
        <AFFPosts />
        <hr/>
        <footer className="row">
          <div className="col-6 credit">
            <p>© Alex Ross {moment().format('YYYY')}<br/>
            <a href="https://rosso.codes">https://rosso.codes</a></p>
          </div>
          <div className="col-6">
            <p className="text-right"><img className="w-25" src={logo} alt="Logo" /></p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
