import React from "react";
import PropTypes from "prop-types";
import { Grid, Box, Typography, IconButton, FormLabel } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { fileExtension } from "../../constants/file";

// Chú ý: component sử dụng nhiều chỗ
const InputFile = ({
  textError,
  previewImage,
  onChange,
  label = "Image",
  labelBtn = "Choose Image",
  name = "image",
  id = "image",
  disabled = false,
  classNameImage = "preview-image",
  required = false,
  extension = fileExtension.image,
  previewVideo,
  classNameVideo = "preview-video",
  isUploading,
}) => {
  const renderLabel = () => {
    return (
      <FormLabel
        sx={{ fontSize: "16px", color: "#000" }}
        className="col-form-label"
      >
        {label}{" "}
        {required && (
          <Typography component="span" color="error">
            *
          </Typography>
        )}
      </FormLabel>
    );
  };

  const renderPreview = () => {
    return (
      previewImage && (
        <img
          src={previewImage}
          alt={previewImage}
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "4px",
            objectFit: "cover",
            marginRight: "10px",
            boxShadow: "1px 2px 3px #ccc",
          }}
        />
      )
    );
  };

  const renderInputFile = () => {
    return (
      <input
        id={id} // Chú ý là id phải khác nhau trong toàn bộ dự án nếu giống nhau sẽ hiểu là 1 input
        name={name}
        style={{ display: "none" }}
        type="file"
        accept={extension}
        onChange={onChange}
        value=""
      />
    );
  };

  const renderTextUploading = () => {
    if (!isUploading) return null;

    return (
      <Typography color="error" className="me-2">
        Đang Tải file lên
      </Typography>
    );
  };

  const renderBtnChooseFile = () => {
    if (disabled) return null;

    return (
      <label
        style={{
          display: "flex",
          alignItems: "center",
          border: "1px solid #a9a8a8",
          borderRadius: "8px",
          paddingRight: "20px",
          marginLeft: "4px",
          cursor: "pointer",
        }}
        htmlFor={id}
      >
        <IconButton component="span" size="large">
          <AddPhotoAlternateIcon />
        </IconButton>
        {labelBtn}
      </label>
    );
  };

  return (
    <Grid container display="flex" alignItems="center" className="mb-3">
      <Grid item md={3} xs={12}>
        {renderLabel()}
      </Grid>
      <Grid item md={9} xs={12} className="flex-1">
        <Box display="flex" alignItems="center">
          {renderPreview()}
          {renderInputFile()}
          {renderTextUploading()}
          {renderBtnChooseFile()}
        </Box>
        <Typography style={{ marginLeft: "4px" }} fontSize={12} color="error">
          {textError}
        </Typography>
      </Grid>
    </Grid>
  );
};

InputFile.propTypes = {
  textError: PropTypes.string,
  previewImage: PropTypes.string,
  previewVideo: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  labelBtn: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  classNameImage: PropTypes.string,
  required: PropTypes.bool,
  extension: PropTypes.string,
  classNameVideo: PropTypes.string,
  isUploading: PropTypes.bool,
};

export default InputFile;
