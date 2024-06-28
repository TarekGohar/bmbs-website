"use client";

import PhoneInput from "@/components/phone-input";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Form() {
  const router = useRouter();
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
      router.push("/book-now/success");
    }
  }

  return (
    <div className="container mx-auto px-5 max-w-2xl ">
      <h1 className="text-white text-4xl font-extrabold">Booking Details</h1>
      <form
        action="https://api.web3forms.com/submit"
        method="POST"
        className="max-w-xl mx-auto "
        onSubmit={handleSubmit}
      >
        <input
          type="hidden"
          name="access_key"
          value={process.env.WEB_API_ACCESS_KEY}
        />

        {/* Personal Information */}
        <h2 className="text-neutral-100 font-semibold text-2xl mt-4">
          Personal Information
        </h2>
        <div className="mt-4 flex flex-col space-y-5">
          <div className="flex justify-between space-x-5">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              className="input"
              required
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              className="input"
              required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="input"
            required
          />
          <div className="flex space-x-4">
            <PhoneInput />
            <select
              id="underline_select"
              name="phonetype"
              className="appearance-none input text-gray-300 rounded-none"
            >
              <option value="home" selected>
                Home
              </option>
              <option value="mobile">Mobile</option>
              <option value="work">Work</option>
            </select>
          </div>
        </div>

        {/* Event Information */}
        <h2 className="text-neutral-100 font-semibold text-2xl mt-8">
          Event Details
        </h2>
        <div className="mt-4 flex flex-col space-y-5">
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="input"
          />
          <input
            type="text"
            name="capacity"
            placeholder="Capacity"
            className="input"
          />
          <textarea
            name="message"
            placeholder="Additional Information (Optional)"
            className="grow p-2 pb-6 border-b-2 font-medium placeholder:font-light outline-none bg-neutral-600 border-neutral-700 placeholder:text-gray-400 text-gray-100"
          />
        </div>

        <button
          className="mt-8 bg-pink-600 py-4 px-3 text-white font-medium hover:bg-pink-700 active:bg-pink-800 rounded w-full"
          type="submit"
        >
          Submit Form
        </button>
      </form>
    </div>
  );
}
