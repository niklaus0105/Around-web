import React from 'react'
import $ from 'jquery';
import { Tabs, Button, Spin } from 'antd';
import { GEO_OPTIONS, POS_KEY, API_ROOT, AUTH_PREFIX, TOKEN_KEY } from '../constants';

const TabPane = Tabs.TabPane;
const operations = <Button type="primary">Create New Post</Button>;

export class Home extends React.Component {
    state = {
        loadingGeoLocation: false,
        loadingPosts: false,
        error: '',
    }

    componentDidMount() {
        this.setState( { loadingGeoLocation: true, error: '' });
        this.getGeoLocation();
    }

    getGeoLocation = () => {
        if ("geolocation" in navigator) {
            /* geolocation is available */
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeoLocation,
                this.onFailedLoadGeoLocation,
                GEO_OPTIONS);
        } else {
            /* geolocation IS NOT available */
            this.setState( { loadingGeoLocation: false, error: 'Geo location is not available' });
        }
    }

    onSuccessLoadGeoLocation = (position) => {
        console.log(position);
        this.setState( { loadingGeoLocation: false });
        const { latitude, longitude } = position.coords;
        localStorage.setItem(POS_KEY, JSON.stringify({ lat: latitude, lon: longitude}));
        this.loadNearbyPosts();
    }

    onFailedLoadGeoLocation = () => {
        this.setState( { loadingGeoLocation: false, error: 'Fail to load geo location' });
    }

    loadNearbyPosts = () => {
        const { lat, lon } = JSON.parse(localStorage.getItem(POS_KEY));
        this.setState( { loadingPosts: true, error: '' } );
        $.ajax({
            url: `${API_ROOT}/search?lat=${lat}&lon=${lon}&range=200000`,
            method: 'GET',
            headers: {
                Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`
            },
        }).then((response) => {
            this.setState( { loadingPosts: false, error: '' } );
            console.log(response);
        }, (response) => {
            this.setState( { loadingPosts: false, error: response.responseText } );
        }).catch((err) => {
            console.log(err);
        });
    }

    getGalleryPanelContent = () => {
        if (this.state.error) {
            return <div>{this.state.error}</div>;
        } else if (this.state.loadingGeoLocation) {
            return <Spin tip="Loading geo location..."></Spin>;
        } else if (this.state.loadingPosts) {
            return <Spin tip="Loading posts..."></Spin>;
        }else {
            return null
        }
    }

    render() {
        return (
            <Tabs className="main-tabs" tabBarExtraContent={operations}>
                <TabPane tab="Posts" key="1">{this.getGalleryPanelContent()}</TabPane>
                <TabPane tab="Map" key="2">Map</TabPane>
            </Tabs>
        );
    }
}