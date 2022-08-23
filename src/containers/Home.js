import React, { Component } from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import { LIST_VIEW, CHART_VIEW, Colors } from "../utility";
import PriceList from "../components/PriceList";
import MonthPicker from "../components/MonthPicker";
import CreateBtn from "../components/CreateBtn";
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
  changeDate = (year, month) => {
    this.props.actions.selectNewMonth(year, month);
  };
  render() {
    const { data } = this.props;
    const { currentDate, isLoading } = data;
    const { tabView } = this.state;
    const tabIndex = tabsText.findIndex((tabText) => tabText === tabView);
    return (
      <React.Fragment>
        <MonthPicker
          year={currentDate.year}
          month={currentDate.month}
          onChange={this.changeDate}
        />
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
        <CreateBtn onClick={this.createItem} />
        <PriceList />
      </React.Fragment>
    );
  }
}
