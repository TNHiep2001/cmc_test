import { Box, Grid, InputLabel, OutlinedInput } from "@mui/material";
import PropTypes from "prop-types";

const FormInput = ({
  id,
  label,
  name,
  value,
  error,
  onChange,
  onBlur,
  isMultipleLine,
  isRequired,
  fullWidthLabel,
  fullWidthForm = false,
  disabled = false,
  show = true,
  styleInput = {},
  maxLength = 0,
  ...restProps
}) => {
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
          {isRequired && (
            <Box color="red" component="span">
              *
            </Box>
          )}
        </InputLabel>
      </Grid>
    );
  };

  const renderInput = () => {
    let md = 9;
    if (fullWidthForm) md = 12;

    return (
      <Grid item xs={12} md={md}>
        <OutlinedInput
          id={id}
          value={value}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          fullWidth
          error={Boolean(error)}
          multiline={isMultipleLine}
          inputProps={{
            style: { padding: "14px", lineHeight: "26px", ...styleInput },
          }}
          disabled={disabled}
          {...restProps}
        />
        {maxLength ? (
          <Grid
            item
            xs={12}
            md={1}
            display="flex"
            justifyContent="flex-end"
            color={disabled ? "#bfbfbf" : "#000"}
          >
            {`${value?.length || 0}/${maxLength}`}
          </Grid>
        ) : null}
      </Grid>
    );
  };

  if (!show) return null;

  return (
    <Grid container item xs={12} md={12}>
      <Grid
        container
        item
        xs={12}
        md={12}
        alignItems="center"
        columnSpacing={2}
      >
        {renderLabel()}
        {renderInput()}
      </Grid>
    </Grid>
  );
};

FormInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  error: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  isMultipleLine: PropTypes.bool,
  isRequired: PropTypes.bool,
  fullWidthLabel: PropTypes.bool,
  fullWidthForm: PropTypes.bool,
  disabled: PropTypes.bool,
  styleInput: PropTypes.object,
  restProps: PropTypes.object,
  show: PropTypes.bool,
  maxLength: PropTypes.number,
};

export default FormInput;
