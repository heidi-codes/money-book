import React, { Component } from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import { LIST_VIEW, CHART_VIEW, Colors } from "../utility";
import PriceList from "../components/PriceList";
import { Tabs, Tab } from "../components/Tabs";

const tabsText = [LIST_VIEW, CHART_VIEW];

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabView: tabsText[0]
    };
  }
  changeView = (index) => {
    this.setState({
      tabView: tabsText[index]
    });
  };
  render() {
    const { tabView } = this.state;
    const tabIndex = tabsText.findIndex((tabText) => tabText === tabView);
    return (
      <React.Fragment>
        <Tabs activeIndex={tabIndex} onTabChange={this.changeView}>
          <Tab>
            <Ionicon
              className="rounded-circle mr-2"
              fontSize="25px"
              color={Colors.blue}
              icon="ios-paper"
            />
            List
          </Tab>
          <Tab>
            <Ionicon
              className="rounded-circle mr-2"
              fontSize="25px"
              color={Colors.blue}
              icon="ios-pie"
            />
            Chart
          </Tab>
        </Tabs>
        <PriceList />
      </React.Fragment>
    );
  }
}
