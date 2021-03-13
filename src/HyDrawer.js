import React from "react";
import { Drawer, Button, Icon } from "antd";
// import { Link } from "react-router-dom";
import HyMenu from "./HyMenu";
import "antd/dist/antd.css";

export default class HyDrawer extends React.Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div>
        <div>
          <Button type="primary" onClick={this.showDrawer}>
            <Icon type={this.state.collapsed ? "menu-unfold" : "menu-fold"} />
          </Button>
        </div>
        <div>
          <Drawer
            title="主選單"
            placement="left"
            width="38vmin"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
        >
      
            <HyMenu />
            <br />
            <Button>登出</Button>
          </Drawer>
        </div>
      </div>        
    );
  }
}
