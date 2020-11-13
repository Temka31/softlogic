import {YMaps, Map, Placemark} from 'react-yandex-maps';
import React from "react";

const MapY = () => (
    <YMaps>
        <div>
            My awesome application with maps!
<Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} >
<Placemark geometry={[55.75, 37.8]} onClick={() => alert('Hello!!!')} />
</Map>


</div>
</YMaps>
);

export default MapY