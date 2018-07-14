import React from 'react'
import $ from 'jquery';
import { Tabs, Spin } from 'antd';
import { GEO_OPTIONS, POS_KEY, API_ROOT, AUTH_PREFIX, TOKEN_KEY } from '../constants';
import { Gallery } from "./Gallery";
import { CreatePostButton } from "./CreatePostButton";
import { WrappedAroundMap } from "./AroundMap";

const TabPane = Tabs.TabPane;


export class Home extends React.Component {
    state = {
        loadingGeoLocation: false,
        loadingPosts: false,
        error: '',
        posts: [],
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
            this.setState( { loadingPosts: false, error: '', posts: response } );
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
        } else if (this.state.posts && this.state.posts.length > 0){
            // map function
            // [1,2,3].map(f)  --->  [f(1),f(2),f(3)]
            const images = this.state.posts.map((post) => {
                return {
                    user: post.user,
                    src: post.url,
                    thumbnail: post.url,
                    caption: post.message,
                    thumbnailWidth: 400,
                    thumbnailHeight: 300,
                };
            });
            return <Gallery images={images}/>;
        }
        return null;
    }



    render() {
        const createPostButton = <CreatePostButton loadNearbyPosts={this.loadNearbyPosts}/>;
        return (
            <Tabs className="main-tabs" tabBarExtraContent={createPostButton}>
                <TabPane tab="Posts" key="1">{this.getGalleryPanelContent()}</TabPane>
                <TabPane tab="Map" key="2">
                    <WrappedAroundMap
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `600px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        posts={this.state.posts}
                    />
                </TabPane>
            </Tabs>
        );
    }
}