import React from 'react'
import { Tabs, Button } from 'antd';

const TabPane = Tabs.TabPane;
const operations = <Button type="primary">Create New Post</Button>;

export class Home extends React.Component {
    render() {
        return (
            <Tabs className="main-tabs" tabBarExtraContent={operations}>
                <TabPane tab="Posts" key="1">Posts</TabPane>
                <TabPane tab="Map" key="2">Map</TabPane>
            </Tabs>
        );
    }
}