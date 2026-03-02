import React, { useState, useEffect } from "react";

import { Form, Input, Label, Table } from "reactstrap";
import DatePicker from "react-datepicker";

import { useCustomForm, useAxiosPrivate } from "hooks";
import { handleOnBlurCalculation } from "./placementOfferController";
import { toast } from "react-toastify";

export const PlacementOfferForm = ({
  salary_details,
  offer_details,
  placement_details,
  reachout_id,
  onRefetch = () => null,
}) => {
  const initialState = {
    offer_date: placement_details
      ? new Date(placement_details.offer_date)
      : new Date(),
    expected_annual_base_salary: offer_details
      ? offer_details.expected_annual_base_salary
      : "",
    offer_annual_base_salary: offer_details
      ? offer_details.offer_annual_base_salary
      : "",
    expected_annual_incentive: offer_details
      ? offer_details.expected_annual_incentive
      : "",
    offer_annual_incentive: offer_details
      ? offer_details.offer_annual_incentive
      : "",
    expected_ote_split: offer_details ? offer_details.expected_ote_split : "",
    offer_ote_split: offer_details ? offer_details.offer_ote_split : "",
    expected_travel_allowance: offer_details
      ? offer_details.expected_travel_allowance
      : "",
    offer_travel_allowance: offer_details
      ? offer_details.offer_travel_allowance
      : "",
    expected_rsu_stock: offer_details ? offer_details.expected_rsu_stock : "",
    offer_rsu_stock: offer_details ? offer_details.offer_rsu_stock : "",
    expected_annual_leave: offer_details
      ? offer_details.expected_annual_leave
      : "",
    offer_annual_leave: offer_details ? offer_details.offer_annual_leave : "",
    date_signed: placement_details
      ? new Date(placement_details.date_signed)
      : new Date(),
    start_date: placement_details
      ? new Date(placement_details.start_date)
      : new Date(),
  };
  const authAxios = useAxiosPrivate();

  const { formData, handleOnChange, handleSubmit } = useCustomForm(
    initialState,
    (e) => onSubmit(e)
  );

  const [calculatedData, setCalculatedData] = useState({});

  useEffect(() => {
    if (offer_details) {
      //Annual Base
      const [expectedBaseIncrease, expectedBasePercentage] = value_calculator(
        offer_details.expected_annual_base_salary,
        salary_details.base_salary
      );
      const [offerBaseIncrease, offerBasePercentage] = value_calculator(
        offer_details.offer_annual_base_salary,
        salary_details.base_salary
      );
      //Annual Incentive
      const [expectedIncentiveIncrease, expectedIncentivePercentage] =
        value_calculator(
          offer_details.expected_annual_incentive,
          salary_details.incentives
        );
      const [offerIncentiveIncrease, offerIncentivePercentage] =
        value_calculator(
          offer_details.offer_annual_incentive,
          salary_details.incentives
        );
      //Travel Allowance
      const [expectedAllowanceIncrease, expectedAllowancePercentage] =
        value_calculator(
          offer_details.expected_travel_allowance,
          salary_details.travel_allowance
        );
      const [offerAllowanceIncrease, offerAllowancePercentage] =
        value_calculator(
          offer_details.offer_travel_allowance,
          salary_details.travel_allowance
        );
      //RSU
      const [expectedRSUIncrease, expectedRSUPercentage] = value_calculator(
        offer_details.expected_rsu_stock,
        salary_details.rsu_stock
      );
      const [offerRSUIncrease, offerRSUPercentage] = value_calculator(
        offer_details.offer_rsu_stock,
        salary_details.rsu_stock
      );
      //Annual Leave
      const [expectedLeaveIncrease, expectedLeavePercentage] = value_calculator(
        offer_details.expected_annual_leave,
        salary_details.annual_leave
      );
      const [offerLeaveIncrease, offerLeavePercentage] = value_calculator(
        offer_details.offer_annual_leave,
        salary_details.annual_leave
      );

      //OTE Split
      const [expectedSplitIncrease, expectedSplitPercentage] = value_calculator(
        offer_details.expected_ote_split,
        salary_details.ote_split
      );
      const [offerSplitIncrease, offerSplitPercentage] = value_calculator(
        offer_details.offer_ote_split,
        salary_details.ote_split
      );
      setCalculatedData({
        ...calculatedData,
        expected_base_increased: expectedBaseIncrease,
        expected_base_percentage: `${expectedBasePercentage.toFixed(2)}%`,

        offer_base_increased: offerBaseIncrease,
        offer_base_percentage: `${offerBasePercentage.toFixed(2)}%`,
        //Incentive
        expected_incentive_increased: expectedIncentiveIncrease,
        expected_incentive_percentage: `${expectedIncentivePercentage.toFixed(
          2
        )}%`,

        offer_incentive_increased: offerIncentiveIncrease,
        offer_incentive_percentage: `${offerIncentivePercentage.toFixed(2)}%`,

        //Allowance
        expected_allowance_increased: expectedAllowanceIncrease,
        expected_allowance_percentage: `${expectedAllowancePercentage.toFixed(
          2
        )}%`,

        offer_allowance_increased: offerAllowanceIncrease,
        offer_allowance_percentage: `${offerAllowancePercentage.toFixed(2)}%`,

        //RSU
        expected_rsu_increased: expectedRSUIncrease,
        expected_rsu_percentage: `${expectedRSUPercentage.toFixed(2)}%`,

        offer_rsu_increased: offerRSUIncrease,
        offer_rsu_percentage: `${offerRSUPercentage.toFixed(2)}%`,

        //Annual leave
        expected_leave_increased: expectedLeaveIncrease,
        expected_leave_percentage: `${expectedLeavePercentage.toFixed(2)}%`,

        offer_leave_increased: offerLeaveIncrease,
        offer_leave_percentage: `${offerLeavePercentage.toFixed(2)}%`,

        //OTE Split
        expected_split_increased: expectedSplitIncrease,
        expected_split_percentage: `${expectedSplitPercentage.toFixed(2)}%`,

        offer_split_increased: offerSplitIncrease,
        offer_split_percentage: `${offerSplitPercentage.toFixed(2)}%`,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Calculations here
  const handleOnBlur = (name, e) => {
    if (salary_details) {
      handleOnBlurCalculation(
        name,
        e,
        salary_details,
        setCalculatedData,
        calculatedData
      );
    }
  };

  function value_calculator(input, current) {
    var value_increased = input - current;
    var percentage = (value_increased / current) * 100;

    return [value_increased, percentage];
  }

  const onSubmit = async (data) => {
    const response = authAxios.post(
      `/jobs/reachout/update-offer-details/${reachout_id}`,
      {
        ...data,
      }
    );
    try {
      await toast.promise(response, {
        pending: {
          render() {
            return "Pending";
          },
        },
        success: {
          render({ data }) {
            const message = data.data?.message;
            return `${message} 👌`;
          },
        },
        error: {
          render() {
            return "Oops! Something went wrong 🤯";
          },
        },
      });
      onRefetch();
    } finally {
    }
  };

  return (
    <>
      <Form id="placementOfferDetails" onSubmit={handleSubmit}>
        <Label>OFFER DATE SENT</Label>
        <DatePicker
          name="offer_date"
          dateFormat="MM/dd/yyyy"
          selected={formData.offer_date}
          onChange={(e) => handleOnChange("offer_date", e)}
        />
        <div className="container">
          <Table>
            <thead>
              <tr>
                <th colSpan="8" className="align-middle">
                  Offer Details
                </th>
              </tr>
              <tr>
                <th colSpan="5">EXPECTED</th>
                <th colSpan="3">OFFER</th>
              </tr>
              <tr>
                <th>CURRENCY: {salary_details?.currency}</th>
                <th>CURRENT</th>
                <th>AMOUNT</th>
                <th>VALUE INCREASE</th>
                <th>%</th>
                <th>AMOUNT</th>
                <th>VALUE INCREASE</th>
                <th>%</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Annual Base Salary</td>
                <td> {salary_details?.base_salary}</td>
                <td>
                  <Input
                    type="number"
                    name="expected_annual_base_salary"
                    value={formData.expected_annual_base_salary}
                    onChange={(e) =>
                      handleOnChange(
                        "expected_annual_base_salary",
                        e.target.value
                      )
                    }
                    onBlur={(e) =>
                      handleOnBlur(
                        "expected_annual_base_salary",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>{calculatedData.expected_base_increased}</td>
                <td>{calculatedData.expected_base_percentage}</td>
                <td>
                  <Input
                    type="number"
                    name="offer_annual_base_salary"
                    value={formData.offer_annual_base_salary}
                    onChange={(e) =>
                      handleOnChange("offer_annual_base_salary", e.target.value)
                    }
                    onBlur={(e) =>
                      handleOnBlur("offer_annual_base_salary", e.target.value)
                    }
                  />
                </td>
                <td>{calculatedData.offer_base_increased}</td>
                <td>{calculatedData.offer_base_percentage}</td>
              </tr>
              <tr>
                <td>Annual Commission/Incentive</td>
                <td> {salary_details?.incentives}</td>
                <td>
                  <Input
                    type="number"
                    name="expected_annual_incentive"
                    value={formData.expected_annual_incentive}
                    onChange={(e) =>
                      handleOnChange(
                        "expected_annual_incentive",
                        e.target.value
                      )
                    }
                    onBlur={(e) =>
                      handleOnBlur("expected_annual_incentive", e.target.value)
                    }
                  />
                </td>
                <td>{calculatedData.expected_incentive_increased}</td>
                <td>{calculatedData.expected_incentive_percentage}</td>
                <td>
                  <Input
                    type="number"
                    name="offer_annual_incentive"
                    value={formData.offer_annual_incentive}
                    onChange={(e) =>
                      handleOnChange("offer_annual_incentive", e.target.value)
                    }
                    onBlur={(e) =>
                      handleOnBlur("offer_annual_incentive", e.target.value)
                    }
                  />
                </td>
                <td>{calculatedData.offer_incentive_increased}</td>
                <td>{calculatedData.offer_incentive_percentage}</td>
              </tr>
              <tr>
                <td>OTE Split</td>
                <td> {salary_details?.ote_split}</td>
                <td>
                  <Input
                    type="number"
                    name="expected_ote_split"
                    value={formData.expected_ote_split}
                    onChange={(e) =>
                      handleOnChange("expected_ote_split", e.target.value)
                    }
                    onBlur={(e) =>
                      handleOnBlur("expected_ote_split", e.target.value)
                    }
                  />
                </td>
                <td>{calculatedData.expected_split_increased}</td>
                <td>{calculatedData.expected_split_percentage}</td>
                <td>
                  <Input
                    type="number"
                    name="offer_ote_split"
                    value={formData.offer_ote_split}
                    onChange={(e) =>
                      handleOnChange("offer_ote_split", e.target.value)
                    }
                    onBlur={(e) =>
                      handleOnBlur("offer_ote_split", e.target.value)
                    }
                  />
                </td>
                <td>{calculatedData.offer_split_increased}</td>
                <td>{calculatedData.offer_split_percentage}</td>
              </tr>
              <tr>
                <td>Travel Allowance</td>
                <td> {salary_details?.travel_allowance} </td>
                <td>
                  <Input
                    type="number"
                    name="expected_travel_allowance"
                    value={formData.expected_travel_allowance}
                    onChange={(e) =>
                      handleOnChange(
                        "expected_travel_allowance",
                        e.target.value
                      )
                    }
                    onBlur={(e) =>
                      handleOnBlur("expected_travel_allowance", e.target.value)
                    }
                  />
                </td>
                <td>{calculatedData.expected_allowance_increased}</td>
                <td>{calculatedData.expected_allowance_percentage}</td>
                <td>
                  <Input
                    type="number"
                    name="offer_travel_allowance"
                    value={formData.offer_travel_allowance}
                    onChange={(e) =>
                      handleOnChange("offer_travel_allowance", e.target.value)
                    }
                    onBlur={(e) =>
                      handleOnBlur("offer_travel_allowance", e.target.value)
                    }
                  />
                </td>
                <td>{calculatedData.offer_allowance_increased}</td>
                <td>{calculatedData.offer_allowance_percentage}</td>
              </tr>
              <tr>
                <td>RSU/Stock Options</td>
                <td> {salary_details?.rsu_stock}</td>
                <td>
                  <Input
                    type="number"
                    name="expected_rsu_stock"
                    value={formData.expected_rsu_stock}
                    onChange={(e) =>
                      handleOnChange("expected_rsu_stock", e.target.value)
                    }
                    onBlur={(e) =>
                      handleOnBlur("expected_rsu_stock", e.target.value)
                    }
                  />
                </td>
                <td>{calculatedData.expected_rsu_increased}</td>
                <td>{calculatedData.expected_rsu_percentage}</td>
                <td>
                  <Input
                    type="number"
                    name="offer_rsu_stock"
                    value={formData.offer_rsu_stock}
                    onChange={(e) =>
                      handleOnChange("offer_rsu_stock", e.target.value)
                    }
                    onBlur={(e) =>
                      handleOnBlur("offer_rsu_stock", e.target.value)
                    }
                  />
                </td>
                <td>{calculatedData.offer_rsu_increased}</td>
                <td>{calculatedData.offer_rsu_percentage}</td>
              </tr>
              <tr>
                <td>Annual Leave</td>
                <td> {salary_details?.annual_leave}</td>
                <td>
                  <Input
                    type="number"
                    name="expected_annual_leave"
                    value={formData.expected_annual_leave}
                    onChange={(e) =>
                      handleOnChange("expected_annual_leave", e.target.value)
                    }
                    onBlur={(e) =>
                      handleOnBlur("expected_annual_leave", e.target.value)
                    }
                  />
                </td>
                <td>{calculatedData.expected_leave_increased}</td>
                <td>{calculatedData.expected_leave_percentage}</td>
                <td>
                  <Input
                    type="number"
                    name="offer_annual_leave"
                    value={formData.offer_annual_leave}
                    onChange={(e) =>
                      handleOnChange("offer_annual_leave", e.target.value)
                    }
                    onBlur={(e) =>
                      handleOnBlur("offer_annual_leave", e.target.value)
                    }
                  />
                </td>
                <td>{calculatedData.offer_leave_increased}</td>
                <td>{calculatedData.offer_leave_percentage}</td>
              </tr>
            </tbody>
          </Table>
        </div>

        <Label>CONTRACT DATE SIGNED</Label>
        <DatePicker
          name="date_signed"
          dateFormat="MM/dd/yyyy"
          selected={formData.date_signed}
          onChange={(e) => handleOnChange("date_signed", e)}
        />

        <Label>START DATE</Label>
        <DatePicker
          name="start_date"
          dateFormat="MM/dd/yyyy"
          selected={formData.start_date}
          onChange={(e) => handleOnChange("start_date", e)}
        />
      </Form>
      {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(calculatedData, null, 2)}</pre> */}
    </>
  );
};
