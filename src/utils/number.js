const defaultFormatMoney = {
  locale: "vi-VN",
  currency: "VND",
};

// Hàm chuyển đổi số -> tiền của quốc gia nào đó.
export const convertPrice = (amount = 0, options = defaultFormatMoney) => {
  if (!Number.isNaN(amount) && typeof amount === "number") {
    const { locale, currency } = options;
    return `${new Intl.NumberFormat(locale).format(amount)} ${currency}`;
  }

  return null;
};
