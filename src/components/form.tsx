"use client";

import PhoneInput from "@/components/phone-input";
import { useRouter, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useState } from "react";
import DropdownSelector from "./DropdownSelector";
import LoadingSpinner from "./LoadingSpinner";

interface FormProps {
  service?: string;
}

export default function Form({ service }: FormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Booking");
  const [isMila, setIsMila] = useState(service === "mila");
  // const
  console.log(service, isMila);

  async function handleSubmit(event: any) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);

    formData.append(
      "access_key",
      isMila
        ? process.env.NEXT_PUBLIC_WEB_API_ACCESS_KEY_MILA || ""
        : process.env.NEXT_PUBLIC_WEB_API_ACCESS_KEY_BMBS || ""
    );

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    });
    const result = await response.json();
    if (result.success) {
      console.log(result);
      setLoading(false);
      router.push(`${pathname}/success`);
    }
  }

  return (
    <form
      action="https://api.web3forms.com/submit"
      method="POST"
      className="w-full h-fit"
      onSubmit={handleSubmit}
    >
      <input
        type="hidden"
        name="access_key"
        value={
          isMila
            ? process.env.NEXT_PUBLIC_WEB_API_ACCESS_KEY_MILA
            : process.env.NEXT_PUBLIC_WEB_API_ACCESS_KEY_BMBS
        }
      />

      <h2 className="text-white font-medium text-4xl">{t("service-type")}</h2>
      <div className="mt-2 flex flex-col space-y-3">
        <DropdownSelector
          name="Service"
          placeholder={
            service === "mila" ? "Espace Mila" : "Brahm Mauer Bar Services"
          }
          options={["Brahm Mauer Bar Services", "Espace Mila"]}
          onValueChange={(key, value) => {
            setIsMila(value === "Espace Mila");
          }}
        />
      </div>

      {/* Personal Information */}
      <h2 className="text-white font-medium text-4xl mt-8">{t("info")}</h2>
      <div className="mt-4 flex flex-col space-y-3">
        <div>
          <h2 className="text-white  mb-1 ml-3">
            {t("name")} <span className="text-red-600">*</span>
          </h2>
          <input
            type="text"
            name="name"
            placeholder={t("name-placeholder")}
            className="input"
            required
          />
        </div>

        <div>
          <h2 className="text-white  mb-1 ml-3">
            {t("email")} <span className="text-red-600">*</span>
          </h2>
          <input
            type="email"
            name="email"
            placeholder={t("email-placeholder")}
            className="input"
            required
          />
        </div>

        <div>
          <h2 className="text-white  mb-1 ml-3">
            {t("phone")} <span className="text-red-600">*</span>
          </h2>
          <div className="flex space-x-4">
            <PhoneInput />
            <div className="w-52">
              <DropdownSelector
                name="phone-type"
                placeholder={`${t("phone-type.home")}`}
                options={[
                  `${t("phone-type.home")}`,
                  `${t("phone-type.work")}`,
                  `${t("phone-type.mobile")}`,
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Event Information */}
      <h2 className="mt-8 text-white font-medium text-4xl">{t("details")}</h2>
      <div className="mt-4 flex flex-col space-y-3">
        {!isMila && (
          <div>
            <h2 className="text-white  mb-1 ml-3">{t("location")}</h2>
            <input
              type="text"
              name="Location"
              placeholder={t("location-placeholder")}
              className="input"
            />
          </div>
        )}

        <div>
          <h2 className="text-white  mb-1 ml-3">{t("capacity")}</h2>
          <input
            type="text"
            name="Capacity"
            placeholder={t("capacity-placeholder")}
            className="input"
          />
        </div>
        <div>
          <h2 className="text-white  mb-1 ml-3">{t("additional-info")}</h2>
          <textarea
            name="Message"
            placeholder={t("additional-info-placeholder")}
            className="input"
          />
        </div>
      </div>

      <button
        className="border-b-2 flex items-center justify-center mt-8 py-4 px-3 text-white text-lg font-medium hover:bg-neutral-900 duration-150 w-full"
        type="submit"
      >
        {!loading ? (
          <div className="h-7">{t("submit")}</div>
        ) : (
          <div className="h-7">
            <LoadingSpinner color="#fffff" />
          </div>
        )}
      </button>
    </form>
  );
}
