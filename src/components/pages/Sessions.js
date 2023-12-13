import React from 'react';
import OngoingSessions from './OngoingSessions';
import PastSessions from './PastSessions';

const Sessions = () => {
    return <>
    <div className="container-xxl">
      <div className="row">
        <div className="col-12">
            <OngoingSessions/>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <PastSessions/>
        </div>
      </div>
      </div>

    </>
}

export default Sessions;

