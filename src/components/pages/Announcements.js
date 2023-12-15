import React, { useEffect, useState } from 'react'
import Meta from '../Meta';

const Announcements = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
          setIsLoaded(true);
        }, 600);
        return () => clearTimeout(timeout);
      }, []);

    
  return (
    <div className='container-xxl'>
      <Meta title={'Announcements'}/>
        <div className="row">
            <div className="col-12 w-100" style={{minHeight:"47vh"}}>
            <div className={`animated-content ${isLoaded ? 'fadeIn' : ''}`}>
                <h1>No Announcements</h1>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Announcements