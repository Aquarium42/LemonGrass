import React from 'react'
import { YMaps, Map, Placemark, Clusterer} from 'react-yandex-maps';
import classes from './Map.css'
import POINTS from "./points";

const mapState = {
    center: [55.75, 37.57],
    zoom: 6
};

class My_map extends React.Component {
    state = {
        selectedPoint: null
    };

    onPlacemarkClick = point => () => {
        this.setState({ selectedPoint: point });
    };


    render() {
        const { selectedPoint } = this.state;
        return (
            <div  className={classes.My_map} >
                <YMaps  >
                    <Map width ={"900px"} height ={"500px"} defaultState={mapState}>
                        <Clusterer
                            options={{
                                preset: "islands#invertedVioletClusterIcons",
                                groupByCoordinates: false
                            }}
                        >
                            {POINTS.map((point, index) => (
                                <Placemark
                                    key={index}
                                    geometry={point.coords}
                                    onClick={this.onPlacemarkClick(point)}
                                />
                            ))}
                        </Clusterer>
                    </Map>
                </YMaps>
                {selectedPoint && (
                    <div>
                        <h1>Выбранный турнир: &nbsp;
                            <strong>{selectedPoint.title}
                            </strong></h1>
                        <h3>{selectedPoint.descr}</h3>
                    </div>
                )}
            </div>
        );
    }
}
//TODO нажать на группу и получить список турниров в этом городе

export default My_map;