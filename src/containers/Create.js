import React from "react";
import PropTypes from "prop-types";
import CategorySelect from "../components/CategorySelect";
import { Tabs, Tab } from "../components/Tabs";
import PriceForm from "../components/PriceForm";
import Loader from "../components/Loader";
import { TYPE_INCOME, TYPE_OUTCOME } from "../utility";

const tabsText = [TYPE_OUTCOME, TYPE_INCOME];

export class CreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: TYPE_OUTCOME,
      selectedCategory: null,
      validationPassed: true
    };
  }

  render() {
    const { selectedTab, validationPassed } = this.state;
    const tabIndex = tabsText.findIndex((text) => text === selectedTab);
    return (
      <div>
        <Tabs activeIndex={tabIndex} onTabChange={this.tabChange}>
          <Tab>Pay</Tab>
          <Tab>Income</Tab>
        </Tabs>
        <CategorySelect />
        <PriceForm />
        {!validationPassed && (
          <div className="alert alert-danger mt-5" role="alert">
            Please select category
          </div>
        )}
      </div>
    );
  }
}
