import {YMaps, Map, Placemark} from 'react-yandex-maps';
import React from "react";


const MapY = ({events, setAnchorEl,anchorEl}) => {

    const openModal=(event)=>{
        console.log(event)
        setAnchorEl(anchorEl ? null : event.currentTarget);
    }


    const renderPlacemark = () => {
        return events.map((item) => {
                return <Placemark key={item.id} geometry={[item.latitude, item.longitude]}
                                  onClick={openModal}/>
            }
        )
    }

    return (
        <YMaps>
                <Map defaultState={{center: [55.75, 37.57], zoom: 6}}>
                    {renderPlacemark()}
                </Map>
        </YMaps>
    )
};

export default MapY