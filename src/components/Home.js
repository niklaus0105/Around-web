import React from 'react'
import { Tabs, Button } from 'antd';
import { GEO_OPTIONS } from '../constants';

const TabPane = Tabs.TabPane;
const operations = <Button type="primary">Create New Post</Button>;

export class Home extends React.Component {
    componentDidMount() {
        if ("geolocation" in navigator) {
            /* geolocation is available */
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeoLocation,
                this.onFailedLoadGeoLocation,
                GEO_OPTIONS);
        } else {
            /* geolocation IS NOT available */
        }
    }

    onSuccessLoadGeoLocation = (position) => {
        console.log(position)
    }

    onFailedLoadGeoLocation = () => {

    }
    render() {
        return (
            <Tabs className="main-tabs" tabBarExtraContent={operations}>
                <TabPane tab="Posts" key="1">Posts</TabPane>
                <TabPane tab="Map" key="2">Map</TabPane>
            </Tabs>
        );
    }
}