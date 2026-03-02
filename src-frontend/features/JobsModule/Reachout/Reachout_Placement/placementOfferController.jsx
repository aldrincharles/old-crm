export const handleOnBlurCalculation = (
  name,
  value,
  salary_details,
  setCalculatedData,
  calculatedData
) => {
  if (name === "expected_annual_base_salary") {
    const [value_increased, percentage] = value_calculator(
      value,
      salary_details.base_salary
    );
    setCalculatedData({
      ...calculatedData,
      expected_base_increased: value_increased,
      expected_base_percentage: `${percentage.toFixed(2)}%`,
    });
  } else if (name === "offer_annual_base_salary") {
    const [value_increased, percentage] = value_calculator(
      value,
      salary_details.base_salary
    );
    setCalculatedData({
      ...calculatedData,
      offer_base_increased: value_increased,
      offer_base_percentage: `${percentage.toFixed(2)}%`,
    });
  } else if (name === "expected_annual_incentive") {
    const [value_increased, percentage] = value_calculator(
      value,
      salary_details.incentives
    );
    setCalculatedData({
      ...calculatedData,
      expected_incentive_increased: value_increased,
      expected_incentive_percentage: `${percentage.toFixed(2)}%`,
    });
  } else if (name === "offer_annual_incentive") {
    const [value_increased, percentage] = value_calculator(
      value,
      salary_details.incentives
    );
    setCalculatedData({
      ...calculatedData,
      offer_incentive_increased: value_increased,
      offer_incentive_percentage: `${percentage.toFixed(2)}%`,
    });
  } else if (name === "expected_ote_split") {
    const [value_increased, percentage] = value_calculator(
      value,
      salary_details.ote_split
    );
    setCalculatedData({
      ...calculatedData,
      expected_split_increased: value_increased,
      expected_split_percentage: `${percentage.toFixed(2)}%`,
    });
  } else if (name === "offer_ote_split") {
    const [value_increased, percentage] = value_calculator(
      value,
      salary_details.ote_split
    );
    setCalculatedData({
      ...calculatedData,
      offer_split_increased: value_increased,
      offer_split_percentage: `${percentage.toFixed(2)}%`,
    });
  } else if (name === "expected_travel_allowance") {
    const [value_increased, percentage] = value_calculator(
      value,
      salary_details.travel_allowance
    );
    setCalculatedData({
      ...calculatedData,
      expected_allowance_increased: value_increased,
      expected_allowance_percentage: `${percentage.toFixed(2)}%`,
    });
  } else if (name === "offer_travel_allowance") {
    const [value_increased, percentage] = value_calculator(
      value,
      salary_details.travel_allowance
    );
    setCalculatedData({
      ...calculatedData,
      offer_allowance_increased: value_increased,
      offer_allowance_percentage: `${percentage.toFixed(2)}%`,
    });
  } else if (name === "expected_rsu_stock") {
    const [value_increased, percentage] = value_calculator(
      value,
      salary_details.rsu_stock
    );
    setCalculatedData({
      ...calculatedData,
      expected_rsu_increased: value_increased,
      expected_rsu_percentage: `${percentage.toFixed(2)}%`,
    });
  } else if (name === "offer_rsu_stock") {
    const [value_increased, percentage] = value_calculator(
      value,
      salary_details.rsu_stock
    );
    setCalculatedData({
      ...calculatedData,
      offer_rsu_increased: value_increased,
      offer_rsu_percentage: `${percentage.toFixed(2)}%`,
    });
  } else if (name === "expected_annual_leave") {
    const [value_increased, percentage] = value_calculator(
      value,
      salary_details.annual_leave
    );
    setCalculatedData({
      ...calculatedData,
      expected_leave_increased: value_increased,
      expected_leave_percentage: `${percentage.toFixed(2)}%`,
    });
  } else if (name === "offer_annual_leave") {
    const [value_increased, percentage] = value_calculator(
      value,
      salary_details.annual_leave
    );
    setCalculatedData({
      ...calculatedData,
      offer_leave_increased: value_increased,
      offer_leave_percentage: `${percentage.toFixed(2)}%`,
    });
  }

  function value_calculator(input, current) {
    var value_increased = input - current;
    var percentage = (value_increased / current) * 100;

    return [value_increased, percentage];
  }
};
