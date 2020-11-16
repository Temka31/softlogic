import {YMaps, Map, Placemark} from 'react-yandex-maps';
import React from "react";




const MapY = ({events, time}) => {

    const renderPlacemark = () => {
       return events.map((item)=>{
            return <Placemark key={item.id} geometry={[item.latitude, item.longitude]} onClick={() => alert('Hello!!!')}/>
            }
        )
    }
   return(
    <YMaps>
        <div>
            My awesome application with maps!
            <Map defaultState={{center: [55.75, 37.57], zoom: 6}}>
                {renderPlacemark()}
            </Map>
        </div>
    </YMaps>
   )
};

export default MapY