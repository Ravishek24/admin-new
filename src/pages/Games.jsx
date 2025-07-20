import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import { Breadcrumb } from "react-bootstrap";
import GamesComponent from "../components/GamesComponent";

const Games = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Games" />
        <GamesComponent/>
      </MasterLayout>
    </>
  );
};

export default Games;
