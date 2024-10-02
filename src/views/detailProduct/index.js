import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./styles/DetailProduct.module.scss";
import {
  AddCircleOutline,
  ChevronLeft,
  Favorite,
  LoyaltySharp,
  PaidSharp,
  RemoveCircleOutline,
  ShoppingCart,
} from "@mui/icons-material";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import Rating from "react-rating-stars-component";
import { convertPrice } from "../../utils/number";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailProduct } from "../../service/product";
import { statusCode } from "../../constants/status";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

const DetailProduct = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [count, setCount] = useState(1);
  const [dataDetailProduct, setDataDetailProduct] = useState();
  const [loading, setLoading] = useState(false);

  const handleGetDetailProduct = useCallback(async () => {
    setLoading(true);
    const { data, status_code, message } = await getDetailProduct(id);

    if (status_code === statusCode.successNumer) {
      setDataDetailProduct(data);
    } else {
      toast.error(message);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    handleGetDetailProduct();
  }, [handleGetDetailProduct]);

  const handleAdd = () => {
    setCount((prev) => prev + 1);
  };

  const handleRemove = () => {
    if (count === 1) {
      setCount(1);
      return;
    }
    setCount((prev) => prev - 1);
  };

  const handleBack = () => {
    navigate("/listProduct");
  };

  const renderBtnBack = () => {
    return (
      <div className={cx("btn_back")} onClick={handleBack}>
        <ChevronLeft className={cx("icon_back")} />
      </div>
    );
  };

  const renderTitle = () => {
    return (
      <Typography fontSize={26} fontWeight={600}>
        Chi tiết sản phẩm
      </Typography>
    );
  };

  const renderInfoRate = () => {
    return (
      <div className={cx("rate")}>
        <Typography
          color="#ff881d"
          fontSize={17}
          fontWeight={600}
          margin="7px 6px 0 0 "
        >
          {dataDetailProduct?.rate}
        </Typography>
        <Rating
          count={5}
          size={24}
          activeColor="#ff881d" // Màu vàng cho các sao đã chọn
          value={dataDetailProduct?.rate}
        />
      </div>
    );
  };

  const renderQuantityRate = () => {
    return (
      <div
        className={cx("quantity_rate")}
      >{`${dataDetailProduct?.countRate} đánh giá`}</div>
    );
  };

  const renderPrice = () => {
    return (
      <div className={cx("price")}>
        <Typography className={cx("old_price")}>
          {convertPrice(dataDetailProduct?.price)}
        </Typography>
        <Typography className={cx("sale_price")}>
          {convertPrice(dataDetailProduct?.price * 0.7)}
        </Typography>
      </div>
    );
  };

  const renderInfoCoupon = () => {
    return (
      <div className={cx("info_coupon")}>
        <LoyaltySharp sx={{ color: "#209500" }} />
        <Typography fontSize={14}>
          Combo giảm sâu - Miễn phí vận chuyển - Đổi ý miễn phí 15 ngày
        </Typography>
      </div>
    );
  };

  const renderListSize = () => {
    return (
      <div className={cx("size")}>
        <Typography className={cx("title")}>Kích cỡ</Typography>
        <div className={cx("list_size")}>
          <Button className={cx("item_size")}>S</Button>
          <Button className={cx("item_size")}>M</Button>
          <Button className={cx("item_size")}>L</Button>
          <Button className={cx("item_size")}>XL</Button>
        </div>
      </div>
    );
  };

  const renderQuantity = () => {
    return (
      <div className={cx("quantity")}>
        <Typography className={cx("title")}>Số lượng</Typography>
        <div className={cx("action")}>
          <div className={cx("remove")} onClick={handleRemove}>
            <RemoveCircleOutline />
          </div>
          <Typography className={cx("count")}>{count}</Typography>
          <div className={cx("add")} onClick={handleAdd}>
            <AddCircleOutline />
          </div>
        </div>
      </div>
    );
  };

  const renderActionBuy = () => {
    return (
      <div className={cx("action_buy")}>
        <Button className={cx("add_cart")}>
          <ShoppingCart /> Thêm vào giỏ hàng
        </Button>
        <Button className={cx("buy_now")}>
          <PaidSharp /> Mua Ngay
        </Button>
      </div>
    );
  };

  const renderContentProduct = () => {
    return (
      <div className={cx("content_product")}>
        <img src={dataDetailProduct?.image} alt="" className={cx("image")} />
        <div className={cx("info_product")}>
          <div className={cx("title")}>{dataDetailProduct?.title}</div>
          <div className={cx("feedback")}>
            {renderInfoRate()}
            {renderQuantityRate()}
          </div>
          {renderPrice()}
          {renderInfoCoupon()}
          {renderListSize()}
          {renderQuantity()}
          {renderActionBuy()}
        </div>
        <div className={cx("add_favourite")}>
          <Button className={cx("btn_add_favourite")}>
            <Favorite /> Thêm vào yêu thích
          </Button>
        </div>
      </div>
    );
  };

  const renderDescProduct = () => {
    return (
      <div className={cx("desc_product")}>
        <Typography className={cx("title")}>Mô tả sản phẩm</Typography>
        <Typography className={cx("desc")}>
          {dataDetailProduct?.description}
        </Typography>
      </div>
    );
  };

  if (loading)
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress color="error" />
      </Box>
    );

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        {renderBtnBack()}
        {renderTitle()}
        {renderContentProduct()}
        {renderDescProduct()}
      </div>
    </div>
  );
};

DetailProduct.propTypes = {};

export default DetailProduct;
