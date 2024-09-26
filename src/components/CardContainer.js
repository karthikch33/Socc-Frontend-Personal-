import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Card, Table } from 'antd';
import { Tilt } from 'react-tilt'
import { useDispatch, useSelector } from 'react-redux';
import { attendance, getAllRegistersSlice } from './features/auth/authSlice';

const tabList = [
    {
      key: 'tab1',
      tab: 'Session',
    },
    {
      key: 'tab2',
      tab: 'Outcomes',
    },
    {
      key: 'tab3',
      tab: 'Points',
    },
    {
      key: 'tab4',
      tab:'Organizer'
    }
  ];

 
  

const CardContainer = (props) => {
  const {sessionDescription,outcomeDescription,sessionId,sessiontitle,today,history,organizer,sessionDetails} = props
    const contentList = {
        tab1: sessionDescription,
        tab2: outcomeDescription,
        tab3: history,
        tab4:organizer
      };

      const [activeTabKey1, setActiveTabKey1] = useState('tab1');

      const onTab1Change = (key) => {
        setActiveTabKey1(key);
      };
      
      
  return (
    <div className="row my-4">
        <div className="col-12">
        <Card
        style={{
          width: '100%',
          minHeight:"600px",
          boxShadow:"0px 2px 3px 0px rgba(0,0,0,0.2)"
        }}
        title= {sessiontitle}
        extra={<Link to={today === true?`/registrations/${sessionId}`:`/feedback/${sessionId}`}>{today?sessionDetails?.strength > 0 ?"Register Here":"" :"Submit FeedBack"}</Link>}
        // tabList={tabList.filter((element)=>today?element?.tab!=="Outcomes":element?.tab)}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}
        className='card'
      >
        {contentList[activeTabKey1]}
      </Card>
        </div>
       </div>
        
  )
}

export default CardContainer