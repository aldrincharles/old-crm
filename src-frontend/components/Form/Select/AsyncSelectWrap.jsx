import "./style/select.scss";
import React from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import PropTypes from "prop-types";

import { useAxiosPrivate } from "hooks";
import { sleep } from "utils";

const AsyncSelectWrap = (props) => {
  const authAxios = useAxiosPrivate();

  const {
    defaultOptions = false,
    dependencies: { url, topic, id = "" },
  } = props;

  const loadOptions = async (search, prevOptions, { page }) => {
    await sleep(1000);
    const response = await authAxios.get(
      `${url}?topic=${topic}&value=${search}&id=${id}&page=${page}&pageSize=10`
    );
    const result = response.data?.content;
    return {
      options: result.options,
      hasMore: result.has_next,
      additional: {
        page: page + 1,
      },
    };
  };

  if (!authAxios) return null;

  return (
    <div className="select-wrapper-container">
      <AsyncPaginate
        {...props}
        classNamePrefix="select-wrapper"
        debounceTimeout={300}
        defaultOptions={defaultOptions}
        loadOptions={loadOptions}
        additional={{
          page: 1,
        }}
      />
    </div>
  );
};

AsyncSelectWrap.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.object,
  ]),
  defaultValue: PropTypes.object,
  onChange: PropTypes.func,
  className: PropTypes.string,
  url: PropTypes.string,
  defaultOptions: PropTypes.bool,
  required: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isClearable: PropTypes.bool,
  isMulti: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

export { AsyncSelectWrap };
