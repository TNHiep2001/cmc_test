import React, { useState } from "react";
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
import { Button, Typography } from "@mui/material";
import Rating from "react-rating-stars-component";
import { convertPrice } from "../../utils/number";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const DetailProduct = (props) => {
  const navigate = useNavigate();
  const [count, setCount] = useState(1);

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
          4.2
        </Typography>
        <Rating
          count={5}
          size={24}
          activeColor="#ff881d" // Màu vàng cho các sao đã chọn
          value={4.2}
        />
      </div>
    );
  };

  const renderQuantityRate = () => {
    return <div className={cx("quantity_rate")}>420 đánh giá</div>;
  };

  const renderPrice = () => {
    return (
      <div className={cx("price")}>
        <Typography className={cx("old_price")}>
          {convertPrice(50000)}
        </Typography>
        <Typography className={cx("sale_price")}>
          {convertPrice(19000)}
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
        <img
          src="https://down-vn.img.susercontent.com/file/sg-11134201-23010-qusbwpefyylvd3.webp"
          alt=""
          className={cx("image")}
        />
        <div className={cx("info_product")}>
          <div className={cx("title")}>Sản phẩm 1</div>
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
          Thông tin chi tiết sản phẩm 1 ở đây
        </Typography>
      </div>
    );
  };

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
