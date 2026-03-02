import React from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";
import { useAxiosPrivate, useLoading } from "hooks";
import { toast } from "react-toastify";

export const ExportCSV = ({
  className = "",
  children,
  color = "primary",
  url = "",
  fileName = "",
  outline = false,
}) => {
  const authAxios = useAxiosPrivate();

  const fetchExportCSV = async () => {
    try {
      const response = await toast.promise(
        authAxios.get(url, { responseType: "blob" }),
        {
          pending: "Pending",
          success: "Success exporting CSV 👌",
          error: "Oops! Something went wrong 🤯",
        }
      );
      const result = response.data;

      const data = new Blob([result], { type: "text/csv" });
      const url_ref = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url_ref;
      a.setAttribute("download", `${fileName}.csv`);
      a.click();
    } catch (error) {}
  };

  const [handleExportToCSV, isLoading] = useLoading(fetchExportCSV);

  return (
    <Button
      outline={outline}
      className={className}
      disabled={isLoading}
      color={color}
      onClick={handleExportToCSV}
    >
      <i className="fas fa-angle-double-down"></i> {children}
    </Button>
  );
};

ExportCSV.propTypes = {
  url: PropTypes.string,
  fileName: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
