import React from "react";

const Step = ({ currentStep }) => {
  const renderAuthSteps = () =>
    [1, 2, 3].map((i) => (
      <div
        className={`step ${currentStep === i ? "active" : ""}`}
        key={i}
      ></div>
    ));
  return <>{renderAuthSteps()}</>;
};

export default Step;
