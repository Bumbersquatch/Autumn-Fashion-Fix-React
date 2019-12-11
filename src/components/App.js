import React, { useEffect, useState } from 'react';
import '../css/app.scss';
import AFFCarousel from './AFFCarousel';
import AFFPosts from './AFFPosts';
import moment from 'moment';


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
        <footer>
        <p>© Alex Ross {moment().format('YYYY')}</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
