import React, { Component } from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import {
  LIST_VIEW,
  CHART_VIEW,
  TYPE_INCOME,
  TYPE_OUTCOME,
  Colors
} from "../utility";
import PieChart from "../components/PieChart";
import PriceList from "../components/PriceList";
import MonthPicker from "../components/MonthPicker";
import CreateBtn from "../components/CreateBtn";
import Loader from "../components/Loader";
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
    const { items, categories, currentDate, isLoading } = data;
    const { tabView } = this.state;
    const tabIndex = tabsText.findIndex((tabText) => tabText === tabView);
    const itemsWithCategory = Object.keys(items).map((id) => {
      items[id].category = categories[items[id].cid];
      return items[id];
    });
    let totalIncome = 0,
      totalOutcome = 0;
    itemsWithCategory.forEach((item) => {
      if (item.category.type === TYPE_OUTCOME) {
        totalOutcome += item.price;
      } else {
        totalIncome += item.price;
      }
    });
    const chartOutcomDataByCategory = generateChartDataByCategory(
      itemsWithCategory,
      TYPE_OUTCOME
    );
    const chartIncomeDataByCategory = generateChartDataByCategory(
      itemsWithCategory,
      TYPE_INCOME
    );
    return (
      <React.Fragment>
        <MonthPicker
          year={currentDate.year}
          month={currentDate.month}
          onChange={this.changeDate}
        />
        <div className="content-area py-3 px-3">
          {isLoading && <Loader />}
          {!isLoading && (
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
              <CreateBtn onClick={this.createItem} />
              {tabView === LIST_VIEW && itemsWithCategory.length > 0 && (
                <PriceList
                  items={itemsWithCategory}
                  onModifyItem={this.modifyItem}
                  onDeleteItem={this.deleteItem}
                />
              )}
              {tabView === LIST_VIEW && itemsWithCategory.length === 0 && (
                <div className="alert alert-light text-center no-record">
                  You don't have any records.
                </div>
              )}
              {tabView === CHART_VIEW && (
                <React.Fragment>
                  <PieChart
                    title="Month Pay"
                    categoryData={chartOutcomDataByCategory}
                  />
                  <PieChart
                    title="Month Income"
                    categoryData={chartIncomeDataByCategory}
                  />
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}
