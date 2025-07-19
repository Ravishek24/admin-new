import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import WeeklyProfitLayer from "../components/WeeklyProfitLayer";




const WeeklyProfit = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Weekly Profit" />

        {/* InvoiceListLayer */}
        <WeeklyProfitLayer/>

      </MasterLayout>

    </>
  );
};

export default WeeklyProfit;
