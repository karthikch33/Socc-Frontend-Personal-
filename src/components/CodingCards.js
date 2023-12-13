import React from 'react'
import channeldescription from './static/description';
import { Card, Spin } from 'antd';
const { Meta } = Card;

const CodingCards = (props) => {
    return (
        <div className='d-flex codingcards'>
          {channeldescription.map((element, i) => {
            return (
            <a href={element?.link}>
              <Card
                key={element.channelname} 
                hoverable
                style={{
                  width: 280,
                  borderRadius: 50,
                  padding: 30
                }}
                cover={<img alt="example" src={element?.channelLogo} style={{ borderRadius: 50 }} />}
              >
                <div className='d-flex justify-content-between'>
                  <Meta title={element?.channelname} description={<>
                    <div className="col-12 d-flex w-100">
                    <label htmlFor="" className='w-100' style={{fontSize:"13px"}}>{`Id :${element?.channelId}`}</label>
                    </div>
                    <label htmlFor="" style={{fontSize:"14px"}}>{`Sub: ${element?.subscription}`}</label>
                    <label htmlFor="" style={{fontSize:"14px"}}>{`Videos: ${element?.videos}`}</label>
                  </>}/>
                  <Spin />
                </div>
              </Card>
              </a>
            );
          })}
        </div>
      );
      
}

export default CodingCards