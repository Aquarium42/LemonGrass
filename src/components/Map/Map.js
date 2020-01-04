import React from 'react'
import { YMaps, Map, Placemark, Clusterer} from 'react-yandex-maps';
import classes from './Map.css'
import POINTS from "./points";

const mapState = {
    center: [55.75, 37.57],
    zoom: 6,
};

const getPointData = index => {
    return {
        balloonContentBody: "placemark <strong>balloon " + index + "</strong>",
        clusterCaption: "placemark <strong>" + index + "</strong>"
    };
};

const getPointOptions = () => {
    return {
        preset: 'islands#orangeStarIcon'
    };
};

class My_map extends React.Component {
    state = {
        selectedPoint: null
    };

    onPlacemarkClick = point => () => {

        this.setState({ selectedPoint: point });

    };

    onClusterClick = point => () => {

        console.log("click")

    };

    render() {
        const { selectedPoint } = this.state;
        console.log("Write")
        console.log(selectedPoint)
        return (
            <div  className={classes.My_map} >
                <YMaps  >
                    <Map width ={"900px"} height ={"500px"} state={mapState}>
                        <Clusterer
                            onClick={this.onClusterClick()}
                            options={{
                                preset: "islands#invertedYellowClusterIcons",
                                groupByCoordinates: false,
                                clusterHideIconOnBalloonOpen:  true,
                                geoObjectHideIconOnBalloonOpen: true
                            }}
                        >
                            {POINTS.map((point, idx) => (
                                <Placemark
                                    key={idx}
                                    geometry={ point.coords }
                                    onClick={this.onPlacemarkClick(point)}
                                    modules={["geoObject.addon.balloon"]}
                                    properties={getPointData(idx)}
                                    options={getPointOptions()}

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