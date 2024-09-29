import React from "react";
import PropTypes from "prop-types";
import {
  Autocomplete,
  Box,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";

// component tái sử dụng nhiều lần
const FormSelect = ({
  options,
  label,
  value,
  id,
  name,
  error,
  isRequired,
  fullWidthLabel,
  fullWidthForm = false,
  multiple,
  placeholder,
  loading,
  onBlur,
  onChange,
  onInputChange,
  textNoData,
  filterSelectedOptions = true,
  show = true,
  forceShowPlaceholder = false,
  ...restProps
}) => {
  const renderOptions = (props, option) => {
    return (
      <li key={option?.value} {...props}>
        {option?.label}
      </li>
    );
  };

  const isOptionEqualToValue = (option, value) => {
    return option?.value === value.value;
  };

  const renderLabel = () => {
    if (!label) return null;

    let md = fullWidthLabel ? 12 : 3;

    if (fullWidthForm) md = 12;

    return (
      <Grid item xs={12} md={md}>
        <InputLabel
          sx={{ fontWeight: "400", color: "#000", fontSize: 16 }}
          htmlFor={id}
        >
          {label}{" "}
          {isRequired && (
            <Box color="red" component="span">
              *
            </Box>
          )}
        </InputLabel>
      </Grid>
    );
  };

  const renderTextNoData = () => {
    if (textNoData) return textNoData;

    return "Không có dữ liệu";
  };

  const renderInput = () => {
    let md = 9;

    if (fullWidthForm) md = 12;

    return (
      <Grid item xs={12} md={md}>
        <Autocomplete
          clearIcon={
            value?.toString().length > 0 ? (
              <IconButton aria-label="Cancel" sx={{ color: "error.main" }}>
                <Close size={16} />
              </IconButton>
            ) : null
          }
          isOptionEqualToValue={(option, value) =>
            isOptionEqualToValue(option, value)
          }
          multiple={multiple}
          options={options}
          getOptionLabel={(option) => option?.label || ""}
          disableCloseOnSelect={multiple}
          disableClearable={isRequired}
          filterSelectedOptions={filterSelectedOptions}
          renderOption={renderOptions}
          renderInput={(params) => {
            const { inputProps } = params;
            return (
              <TextField
                onBlur={onBlur}
                id={id}
                name={name}
                error={Boolean(error)}
                {...params}
                placeholder={
                  value?.length === 0 || forceShowPlaceholder ? placeholder : ""
                }
                inputProps={{ ...inputProps, style: { padding: "5px" } }}
              />
            );
          }}
          noOptionsText={renderTextNoData()}
          loading={loading}
          loadingText={`Đang tải...`}
          value={value}
          onChange={onChange}
          onInputChange={onInputChange}
          sx={{
            "& .MuiAutocomplete-endAdornment": {
              transform: "translateY(-50%)",
              top: "50%",
            },
          }}
          {...restProps}
        />
        {error && <FormHelperText error>{error}</FormHelperText>}
      </Grid>
    );
  };

  if (!show) return null;

  return (
    <Grid container alignItems="center" columnSpacing={2}>
      {renderLabel()}
      {renderInput()}
    </Grid>
  );
};

FormSelect.propTypes = {
  options: PropTypes.array.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  isRequired: PropTypes.bool,
  fullWidthLabel: PropTypes.bool,
  fullWidthForm: PropTypes.bool,
  restProps: PropTypes.object,
  textNoData: PropTypes.node,
  multiple: PropTypes.bool,
  loading: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onInputChange: PropTypes.func,
  filterSelectedOptions: PropTypes.bool,
  show: PropTypes.bool,
  forceShowPlaceholder: PropTypes.bool,
};

export default FormSelect;
