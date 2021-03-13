import React from "react";
import { Menu, Icon, Button, Switch } from "antd";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

export default class HyMenu extends React.Component {
  state = {
    collapsed: false,

  };


  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <div style={{ width: 256 }}>
        <Button
          type="primary"
          onClick={this.toggleCollapsed}
          style={{ marginBottom: 16 }}
        >
          <Icon type={this.state.collapsed ? "menu-unfold" : "menu-fold"} />
        </Button>

        <Menu

          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          <SubMenu
            key="sub0"
            title={
              <span>
                <Icon type="desktop" />
                <span>基本資料維護</span>
              </span>
            }
          >
            <Menu.Item key="1">
              <Icon type="setting" />
              <span>系統參數</span>

            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="user" />
              <span>客戶管理</span>

            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="desktop" />
              <span>供應商管理</span>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="team" />
                <span>人資管理</span>
              </span>
            }
          >
            <Menu.Item key="5">
              員工基本資料維護
              <Link to="/employee"></Link>
            </Menu.Item>
            <Menu.Item key="6">
              員工上下班打卡
              <Link to="/attendance"></Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="appstore" />
                <span>原物料管理</span>
              </span>
            }
          >
            <Menu.Item key="8">
              原物料資料維護
              <Link to="/rawmaterial"></Link>
            </Menu.Item>
            <Menu.Item key="9">原物料入庫作業</Menu.Item>
            <Menu.Item key="10">原物料出庫作業</Menu.Item>
            <Menu.Item key="11">原物料庫存查詢</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={
            <span>
              <Icon type="shop" />
              <span>產品進銷存</span>
            </span>
          }>
            <Menu.Item key="12">
              產品資料維護

            </Menu.Item>
            <Menu.Item key="13">產品入庫作業
               <Link to='/Stock/Stockin/Stockin'></Link>
            </Menu.Item>

            <Menu.Item key="14">產品出庫作業

            </Menu.Item>

            <Menu.Item key="15">產品庫存查詢</Menu.Item>
            <Menu.Item key="16">訂單管理</Menu.Item>
            <Menu.Item key="17">收據列印

            </Menu.Item>

          </SubMenu>
          <SubMenu key="sub4" title={
            <span>
              <Icon type="cloud-server" />
              <span>資產管理</span>
            </span>
          }>
            <Menu.Item key="20">
              固定資產管理

            </Menu.Item>
            <Menu.Item key="21">
              個人保管資產管理

            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub5" title={
            <span>
              <Icon type="smile" />
              <span>服務對象管理</span>
            </span>
          }>
            <Menu.Item key="25">
              A-2 服務對象基本資料

              </Menu.Item>
            <Menu.Item key="26">
              A-4 新生適應報告-教保組/技藝陶冶組

            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub6" title={
            <span>
              <Icon type="appstore" />
              <span>捐贈物資管理</span>
            </span>
          }>
            <h5>施工中</h5>
          </SubMenu>
          <SubMenu key="sub7" title={
            <span>
              <Icon type="build" />
              <span>系統管理</span>
            </span>
          }>
            <Menu.Item key="30">帳戶管理</Menu.Item>
            {/* <Link to="/privilegemang" /> */}
            <Menu.Item key="31">權限管理
            <Link to="/privilegemang"></Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
