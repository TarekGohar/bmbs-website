"use client";

import PhoneInput from "@/components/phone-input";
import { useRouter } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import DropdownSelector from "./DropdownSelector";

interface FormProps {
  service: string;
}

export default function Form({ service }: FormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Booking");
  async function handleSubmit(event: any) {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "8fb96e49-b2ea-414b-a6af-1eedf71a1277");

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
      router.push(`${pathname}/success`);
    }
  }

  return (
    <form
      action="https://api.web3forms.com/submit"
      method="POST"
      className="max-w-2xl w-full h-fit px-2"
      onSubmit={handleSubmit}
    >
      <h1 className="text-white text-4xl font-bold uppercase tracking-wider">
        {t("main-title")}
      </h1>
      <input
        type="hidden"
        name="access_key"
        value={process.env.WEB_API_ACCESS_KEY}
      />

      <h2 className="text-white font-medium text-2xl mt-6 tracking-wider">
        {t("service-type")}
      </h2>
      <div className="mt-2 flex flex-col space-y-3">
        <div>
          <h2 className="text-white tracking-wider mb-1 ml-3">Service</h2>
          <DropdownSelector
            name="Service"
            placeholder={service ? service : "Brahm Mauer Bar Services"}
            options={["Brahm Mauer Bar Services", "Espace Mila"]}
          />
        </div>
      </div>

      {/* Personal Information */}
      <h2 className="text-white font-medium text-2xl mt-6 tracking-wider">
        {t("info")}
      </h2>
      <div className="mt-2 flex flex-col space-y-3">
        <div>
          <h2 className="text-white tracking-wider mb-1 ml-3">
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
          <h2 className="text-white tracking-wider mb-1 ml-3">
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
          <h2 className="text-white tracking-wider mb-1 ml-3">
            {t("phone")} <span className="text-red-600">*</span>
          </h2>
          <div className="flex space-x-4">
            <PhoneInput />
            <div className="w-32">
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
      <h2 className="mt-6 text-white font-medium text-2xl tracking-wider">
        {t("details")}
      </h2>
      <div className="mt-2 flex flex-col space-y-3">
        <div>
          <h2 className="text-white tracking-wider mb-1 ml-3">
            {t("location")}
          </h2>
          <input
            type="text"
            name="name"
            placeholder={t("location-placeholder")}
            className="input"
          />
        </div>
        <div>
          <h2 className="text-white tracking-wider mb-1 ml-3">
            {t("capacity")}
          </h2>
          <input
            type="text"
            name="name"
            placeholder={t("capacity-placeholder")}
            className="input"
          />
        </div>
        <div>
          <h2 className="text-white tracking-wider mb-1 ml-3">
            {t("additional-info")}
          </h2>
          <textarea
            name="message"
            placeholder={t("additional-info-placeholder")}
            className="input"
          />
        </div>
      </div>

      <button
        className="mt-8 bg-neutral-100 py-4 px-3 text-black text-lg font-medium hover:bg-neutral-200 duration-150 rounded-xl w-full"
        type="submit"
      >
        {t("submit")}
      </button>
    </form>
  );
}
