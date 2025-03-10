"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";

const PhoneInput: React.FC = () => {
  const [phone, setPhone] = useState("");
  const t = useTranslations("Booking");

  const phoneFormat = (value: string) => {
    // Define your phone number formatting logic here
    const cleaned = ("" + value).replace(/\D/g, "").substring(0, 10);
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return value;
  };

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const formattedValue = phoneFormat(event.currentTarget.value);
    setPhone(formattedValue);
    event.currentTarget.value = formattedValue;
  };

  return (
    <input
      type="tel"
      name="phone"
      placeholder={t("phone-placeholder")}
      className="input"
      value={phone}
      required
      onInput={handleInput}
    />
  );
};

export default PhoneInput;
