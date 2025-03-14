"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { revalidatePath } from "next/cache";

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const [hover, setHover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Navbar");
  const pathname = usePathname();

  const [visibleWords, setVisibleWords] = useState({
    about: false,
    mila: false,
    collections: false,
    contact: false,
    lang: false,
  });

  useEffect(() => {
    if (!menu) {
      // Reset visibility when menu is closed
      setVisibleWords({
        about: false,
        mila: false,
        collections: false,
        contact: false,
        lang: false,
      });
      return;
    }

    // Staggered visibility effect when menu opens
    setTimeout(() => setVisibleWords((prev) => ({ ...prev, about: true })), 0);
    setTimeout(() => setVisibleWords((prev) => ({ ...prev, mila: true })), 100);
    setTimeout(
      () => setVisibleWords((prev) => ({ ...prev, collections: true })),
      200
    );
    setTimeout(
      () => setVisibleWords((prev) => ({ ...prev, contact: true })),
      300
    );
    setTimeout(() => setVisibleWords((prev) => ({ ...prev, lang: true })), 400);

    if (typeof window !== "undefined") {
      // Disable body scroll when menu is open
      if (menu) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }

      // Clean up when component is unmounted or menu changes
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [menu]);

  const light_color = `text-white hover:text-main group-hover:text-main`;
  // : `text-main hover:text-neutral-400 group-hover:text-neutral-400`;

  const light_color_bg = `bg-white group-hover:bg-main`;
  // : `bg-main group-hover:bg-neutral-50`;

  return (
    <>
      <nav className="absolute w-full z-20 pl-1 pr-3 py-1 md:pl-4 md:pr-8 md:py-3 mx-auto flex items-center justify-between text-white unselectable">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Brahm Mauer Logo Home Button"
          className={`w-40 xxs:w-48 md:w-[14rem] xl:w-[14rem] z-10 duration-300 ${light_color} text-transparent fill-white hover:fill-slate-200`}
          onClick={() => setMenu(false)}>
          <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 693.21968 192.373">
            <path
              d="M81.5747,129.913c-.9927,0-1.8159-.2373-2.4687-.7089-.6543-.4707-.982-1.0469-.982-1.7247,0-.6816.336-1.2832,1.021-1.8066,1.2027-.9961,5.9287-2.8916,14.1646-5.6894,8.2441-2.8008,13.124-4.1993,14.6391-4.1993,1.3111,0,1.9639.7315,1.9639,2.1983,0,.9931-.7837,1.751-2.355,2.2734-1.1518.3174-2.331.6299-3.5298.9424-1.7822.5225-3.5859,1.0488-5.4179,1.5713-2.8272.8896-4.188,1.543-4.0811,1.9629,15.333-2.0938,32.834-7.7451,52.5078-16.9551,6.5381-3.0342,13.9981-7.0137,22.3731-11.9282,12.2929-7.1719,18.4443-12.0371,18.4443-14.6011,0-2.9312-4.4731-4.397-13.4214-4.397-7.5908,0-17.7427,1.021-30.4546,3.063-13.5522,2.1968-23.3393,4.5518-29.3564,7.063,1.3071,5.9639,2.458,10.937,3.4512,14.9146.5791-1.0997,1.2871-1.6504,2.123-1.6504,1.0439,0,1.9111.916,2.5908,2.749.4673,1.4131.7051,2.7978.7051,4.1592,0,1.6748-.2607,3.1923-.7837,4.5517-.6802,1.6768-1.5713,2.5108-2.6714,2.5108-.7837,0-1.623-.417-2.5088-1.2539-1.2592-1.1524-3.5351-9.2891-6.8281-24.4121-13.1909,5.2343-21.665,7.85-25.4321,7.85-2.3037,0-3.4546-.8369-3.4546-2.5107,0-.7324.3398-1.4922,1.021-2.2764,2.1406-2.25,10.9267-5.5449,26.3506-9.8857-1.3618-6.4893-2.7979-13.6069-4.315-21.3501-9.5219,2.8262-22.3369,6.1479-38.4526,9.9678-19.354,4.602-32.1973,7.7431-38.5293,9.415-.835.314-1.647.6011-2.4297.8633-1.3101.4189-2.3594.6289-3.1392.6289-1.413,0-2.121-.6812-2.121-2.042,0-1.0449.8632-1.8838,2.5878-2.5088,1.3101-.3174,2.6202-.6304,3.9312-.9443,18.7832-5.231,31.6299-8.7388,38.5322-10.5181,14.4458-3.7681,27.396-6.75,38.854-8.9487-.7334-3.8194-1.0971-5.8081-1.0971-5.9639,0-.313.1831-.7324.5468-1.2573.3682-.52.7871-.7827,1.2593-.7827,1.3609,0,2.4849,2.4057,3.376,7.2207,13.0278-2.355,23.5439-3.5298,31.5498-3.5298,4.1318,0,7.7461.3628,10.834,1.0947,5.022,1.2061,7.5312,3.2461,7.5312,6.1231,0,3.6123-5.7793,8.7129-17.3471,15.3071,10.9897-1.7788,20.4887-2.6689,28.4921-2.6689,5.6558,0,10.5469.4428,14.6788,1.333,7.0141,1.413,10.52,3.8979,10.52,7.457,0,5.5488-7.6939,12.6108-23.0781,21.1934-9.9419,5.5468-20.3541,10.413-31.2388,14.5986-9.731,3.8174-19.1509,6.8545-28.2583,9.1045-11.6636,2.9287-21.7676,4.3974-30.2969,4.3974M140.0508,56.601c-9.3628,0-19.6968,1.021-31.001,3.0611,1.4092,7.4311,2.8262,14.417,4.2388,20.957,19.8843-5.335,32.624-11.4072,38.2241-18.21.6772-.8349,1.021-1.5952,1.021-2.2763,0-2.355-4.1641-3.5318-12.4829-3.5318"
              fill="currentColor"
              stroke="currentColor"
              strokeMiterlimit={10}
            />
            <path
              d="M195.46,104.247c.4712,2.0381.705,3.6094.705,4.7071,0,2.1464-.7612,3.2207-2.2719,3.2207-1.73,0-2.5962-1.544-2.5962-4.6329,0-1.413.1621-2.6162.4712-3.6113-.939-3.2422-1.8799-5.4404-2.8233-6.5937-.312-.3638-.4736-.7837-.4736-1.2549,0-1.1519.5776-1.7261,1.729-1.7261,1.0967,0,2.3789,1.8052,3.8428,5.4146,3.353-4.0293,8.688-6.8296,16.01409-8.3985.5767-.103,1.0718,0,1.4961.3159.4146.313.625.7559.625,1.334,0,.8911-.44719,1.4649-1.3344,1.7261-3.8736,1.0469-6.8077,2.0937-8.7896,3.1387-3.2451,1.6758-5.4434,3.7959-6.59419,6.3603"
              fill="currentColor"
              stroke="currentColor"
              strokeMiterlimit={10}
            />
            <path
              d="M219.626,105.3427c.68109.6299,2.20109.9424,4.55219.9424,3.51081,0,7.4839-.457,11.9317-1.3721,4.4453-.916,8.3203-2.0537,11.6172-3.417.2597-.1025.52191-.1543.7827-.1543,1.1523,0,1.7304.5743,1.7304,1.7256,0,1.7276-3.8193,3.3487-11.458,4.8662-6.3374,1.3077-11.09319,1.961-14.2881,1.961-5.59909,0-8.3979-1.5078-8.3979-4.5274,0-6.8769,9.67581-10.4965,29.043-10.8603-5.1343-.9893-13.86819-1.4839-26.2173-1.4839-1.2071,0-1.8047-.6162-1.8047-1.8452,0-1.0679.5976-1.6821,1.8047-1.8399.625-.1093,3.9502-.1621,9.9663-.1621,4.8159,0,9.2139.313,13.187.939,6.8027,1.1011,10.2026,2.9082,10.2026,5.4189,0,1.5669-2.7187,2.4595-8.1606,2.6675-9.0044.4199-14.105.7344-15.30419.9444-5.65281.9394-8.71491,3.0078-9.187,6.1972"
              fill="currentColor"
              stroke="currentColor"
              strokeMiterlimit={10}
            />
            <path
              d="M284.22559,114.2919c-4.1358-1.7255-7.1162-4.6054-8.9492-8.6347-.4707-1.2031-.9419-2.4063-1.4126-3.6113-.6812-1.6719-1.333-2.7188-1.9634-3.1387-1.0957.6279-3.0347,3.2461-5.8096,7.8486-2.458,4.0313-4.4721,6.044-6.04,6.044-2.0943,0-3.4033-2.5889-3.9263-7.7696-.1059-3.4013-.185-6.8017-.2329-10.2031-.3159-9.4194-.4712-24.5942-.4712-45.5264,0-2.9829.5191-4.4716,1.5674-4.4716.4199,0,.7998.2207,1.1396.664.3404.4468.5103.9068.5103,1.376,0,19.6758.0801,33.2007.2339,40.5806.1069,4.4462.4438,11.1958,1.021,20.2485,3.1391-4.6563,4.8921-7.1953,5.2558-7.6133,2.7232-3.5039,4.9751-5.2578,6.752-5.2578,1.8843,0,3.3252.9678,4.3144,2.9053.9927,2.1455,1.9668,4.2881,2.9087,6.4355,1.5679,2.8252,3.7911,4.9707,6.6729,6.4346.8354.4189,1.2544,1.0215,1.2544,1.8066,0,1.3604-.6563,2.0391-1.9634,2.0391-.2598,0-.5488-.0527-.8618-.1563"
              fill="currentColor"
              stroke="currentColor"
              strokeMiterlimit={10}
            />
            <path
              d="M331.23929,115.2334c-3.4551,0-6.336-1.0206-8.6319-3.0586-.6841-.6289-2.647-3.0127-5.8891-7.1446-.3638.4199-1.231,2.3555-2.5918,5.8086-.9932,2.4082-2.1451,3.6094-3.4551,3.6094-1.7769,0-3.166-1.4111-4.1563-4.2363-.7358-2.6172-1.4399-5.2325-2.1206-7.8516-.8901-2.875-2.0434-4.3144-3.4511-4.3144-1.6753,0-3.5069,1.3339-5.4942,4-.4189.5244-1.9897,2.958-4.709,7.3027-1.623,2.6152-2.8261,3.9219-3.6137,3.9219-.6812,0-1.2393-.2735-1.6861-.8233-.4472-.5478-.6689-1.1631-.6689-1.8447v-18.0532c0-1.3589.6806-2.0401,2.042-2.0401,1.3618,0,2.042.6812,2.042,2.0401v11.854c4.4458-7.0137,8.4736-10.5181,12.0879-10.5181,3.1899,0,5.4887,1.856,6.9018,5.5728.8389,3.1914,1.6743,6.3837,2.5171,9.5742,1.7769-5.8574,3.9219-8.791,6.436-8.791,1.147,0,2.378.9423,3.688,2.8261,1.9868,2.8789,3.27,4.6075,3.8472,5.1807,1.9307,1.833,4.2349,2.7471,6.9058,2.7471,1.3579,0,2.039.706,2.039,2.1191s-.6811,2.1192-2.039,2.1192"
              fill="currentColor"
              stroke="currentColor"
              strokeMiterlimit={10}
            />
            <path
              d="M380.69239,73.1621c.2607-.104.5498-.1582.8623-.1582,1.57131,0,2.3516.788,2.3516,2.3613,0,.3677-.36429,1.915-1.0967,4.6421-.7832,3.2539-1.2032,4.9306-1.2549,5.0366,1.0449,5.085,2.4346,9.6211,4.1601,13.6064,2.667,6.2969,5.545,9.4395,8.6319,9.4395,1.4131,0,2.9326-.9932,4.5556-2.9844,4.97071-6.2373,8.9209-18.3642,11.8536-36.3872.6767-4.1401,1.0166-6.4712,1.0166-6.9951,0-.8892-.0909-2.252-.27249-4.0869-.18651-1.834-.27341-3.1963-.27341-4.086,0-4.455.9375-6.6811,2.8261-6.6811,2.0889,0,3.1338,1.9878,3.1338,5.9658,0,.9424-.10249,2.313-.3086,4.1201-.2138,1.8052-.3164,3.1499-.3164,4.041,0,.3682.2373,2.3291.7041,5.8892.8399,6.9048,1.5713,12.0591,2.2012,15.4619.99321,5.8071,2.248,10.857,3.7676,15.148,3.5029,9.7324,5.2558,18.3398,5.2558,25.8242,0,1.5693-.7714,2.3535-2.3154,2.3535-1.543,0-2.3154-.7842-2.3154-2.3535,0-6.9619-1.65039-15.0449-4.9512-24.2529-1.36519-3.7681-2.9863-11.1221-4.8721-22.0572-4.9824,23.8081-11.5048,35.7134-19.5752,35.7134-6.0791,0-11.0058-5.6523-14.7783-16.9536-1.0488,12.5581-2.0185,19.3081-2.9082,20.2524-.5781.5713-1.2031.8604-1.8887.8604-1.7802,0-2.6709-1.2051-2.6709-3.6113,0-2.7725.3916-6.2256,1.1748-10.3614,1.15241-6.226,1.77741-9.6528,1.8887-10.2802.4668-3.5586.7041-7.7437.7041-12.5586,0,.1567-.1347-.813-.3955-2.9024-.41989-2.9326-.626-5.4438-.626-7.5376,0-2.875.8868-4.3164,2.668-4.3164,1.41311,0,2.3272,1.0474,2.74711,3.1392.209.7851.31639,2.355.31639,4.709"
              fill="currentColor"
              stroke="currentColor"
              strokeMiterlimit={10}
            />
            <path
              d="M434.92969,105.3427c.6767.6299,2.1924.9424,4.5478.9424,3.5059,0,7.4834-.457,11.9327-1.3721,4.4443-.916,8.3193-2.0537,11.6162-3.417.2607-.1025.5224-.1543.7871-.1543,1.1474,0,1.7256.5743,1.7256,1.7256,0,1.7276-3.8194,3.3487-11.462,4.8662-6.32809,1.3077-11.0937,1.961-14.2832,1.961-5.6005,0-8.3984-1.5078-8.3984-4.5274,0-6.8769,9.6807-10.4965,29.042-10.8603-5.1289-.9893-13.8682-1.4839-26.2158-1.4839-1.2031,0-1.80569-.6162-1.80569-1.8452,0-1.0679.60259-1.6821,1.80569-1.8399.6289-.1093,3.9492-.1621,9.9687-.1621,4.8135,0,9.21.313,13.18361.939,6.80369,1.1011,10.20709,2.9082,10.20709,5.4189,0,1.5669-2.7227,2.4595-8.16509,2.6675-9,.4199-14.10151.7344-15.30471.9444-5.6552.9394-8.7148,3.0078-9.1816,6.1972"
              fill="currentColor"
              stroke="currentColor"
              strokeMiterlimit={10}
            />
            <path
              d="M499.84569,106.6787c-2.4072,4.8144-6.8594,7.2207-13.34569,7.2207-5.02251,0-8.96091-1.3848-11.81451-4.1582-2.8496-2.7754-4.2783-6.6739-4.2783-11.6963,0-1.9351.2657-3.9243.7881-5.9663.7315-2.9287,1.7803-4.3951,3.13771-4.3951,1.31059,0,1.96389.7603,1.96389,2.2754,0,.9429-.2344,2.3037-.7051,4.083-.4707,1.7789-.708,3.1407-.708,4.0801,0,7.5362,3.8701,11.3037,11.61621,11.3037,3.92579,0,6.72359-1.0185,8.40229-3.0605.7832-.9942,1.5391-2.9297,2.2715-5.8096.5254-2.042,1.3887-3.0605,2.5918-3.0605,1.2041,0,1.96.7597,2.27641,2.2754.73239,3.5586,2.27539,6.2812,4.63089,8.163,1.207.9444,3.2167,1.9893,6.0429,3.1416,1.99121.836,2.9834,1.7247,2.9834,2.667,0,.7334-.2724,1.3213-.82219,1.7666-.55081.4454-1.19151.5879-1.92391.4317-5.5996-1.3086-9.9697-4.3955-13.1074-9.2617"
              fill="currentColor"
              stroke="currentColor"
              strokeMiterlimit={10}
            />
            <path
              d="M528.46779,109.4257c-4.9707,0-8.3194-.208-10.0489-.6279-3.8193-.8359-6.3046-2.7734-7.4521-5.8076-.2656-.6807-.3916-1.4151-.3916-2.1983,0-2.6699,1.1992-5.2446,3.6055-7.7314,2.4052-2.4839,4.8437-3.728,7.3017-3.728,1.7774,0,3.1895.6938,4.2393,2.0791,1.0439,1.3867,1.57031,2.9956,1.57031,4.8286,0,4.6025-3.76761,7.1416-11.30661,7.6123,1.9345,1.3086,6.09861,1.9609,12.4824,1.9609,1.1474,0,1.7256.6026,1.7256,1.8076,0,1.2032-.5782,1.8047-1.7256,1.8047M521.48239,92.9414c-1.5713,0-3.1426.8789-4.7099,2.6318-1.5713,1.7539-2.4346,3.4414-2.5918,5.0625,1.8838-.3154,3.7675-.6553,5.65131-1.0195,2.56449-.5782,3.84669-1.7022,3.84669-3.376,0-2.1978-.7314-3.2988-2.1963-3.2988"
              fill="currentColor"
              stroke="currentColor"
              strokeMiterlimit={10}
            />
            <path
              d="M540.86719,104.247c.4717,2.0381.709,3.6094.709,4.7071,0,2.1464-.7598,3.2207-2.2793,3.2207-1.7256,0-2.58889-1.544-2.58889-4.6329,0-1.413.15429-2.6162.47169-3.6113-.9424-3.2422-1.8848-5.4404-2.8262-6.5937-.31349-.3638-.4717-.7837-.4717-1.2549,0-1.1519.5743-1.7261,1.7295-1.7261,1.09671,0,2.3789,1.8052,3.84771,5.4146,3.34369-4.0293,8.68259-6.8296,16.00879-8.3985.57421-.103,1.07221,0,1.49221.3159.416.313.625.7559.625,1.334,0,.8911-.44341,1.4649-1.333,1.7261-3.87111,1.0469-6.80381,2.0937-8.79111,3.1387-3.2451,1.6758-5.4414,3.7959-6.5937,6.3603"
              fill="currentColor"
              stroke="currentColor"
              strokeMiterlimit={10}
            />
            <path
              d="M616.66308,27.2187c-9.0713-1.8271-17.751-2.52-25.3067-2.209,6.0118.1631,12.6211.9058,19.4844,2.2901,24.5069,4.9287,42.918,16.1098,41.1406,24.956-1.7763,8.8511-23.0927,12.0259-47.5918,7.0899-17.0458-3.4322-31.13958-9.8848-37.5478-16.4742,4.7695,8.7032,21.3965,17.6304,42.2734,21.835,9.84182,1.9814,19.2207,2.6284,27.2002,2.1113,1.4639,1.878-1.249,4.0528-1.249,4.0528,0,0-18.0898,16.2031-24.77538,23.2861-6.70122,7.0845-13.69432.1821-15.66112-3.7051-1.9668-3.896-12.626-14.3389-12.626-14.3389,13.6465,21.2164,13.61911,21.1421,16.8174,26.3589l-1.876,2.3428c-12.2871,9.9365-15.4648,18.3623-14.5664,25.0537-1.8408-.0683-3.62889-.0752-5.333-.0068,1.7266.0478,3.53611.1797,5.3809.3564,1.7773,11.3457,15.2461,17.5938,15.2461,17.5938,0,0,3.2812,1.6269,4.0849-.583.5781-1.6026-2.3389-3.6436-2.3389-3.6436-7.541-3.9609-10.872-8.3662-11.6855-12.7129,1.3535.211,2.72361.4492,4.1104.7266,18.6171,3.75,32.6083,12.2441,31.2548,18.9678-1.3535,6.7226-17.5371,9.1308-36.1582,5.3886-12.9541-2.6123-23.6562-7.5117-28.5205-12.5205,3.62211,6.6114,16.24711,13.3936,32.1055,16.5918,19.8447,3.9932,37.2119.8545,38.791-7.0097,1.5869-7.8643-13.2168-17.4776-33.0518-21.4707-2.9482-.5938-5.8359-1.0206-8.6318-1.3057-1.59079-12.0596,15.6524-23.4805,15.6524-23.4805l12.1191-9.7978c2.3535-2.107,27.459-24.5113,38.3691-34.2471,3.5352-1.8633,5.7989-4.2969,6.3897-7.2339,2.08892-10.3491-17.3955-23.0063-43.5-28.2622"
              fill="currentColor"
            />
            <polyline points="0 192.373 0 0 693.21968 0" fill="none" />
          </svg>
        </Link>

        <div className="hidden lg:flex items-center gap-x-20">
          {/* About Us */}
          <Link href="/about" className={`navbar-link ${light_color}`}>
            {t("about")}
          </Link>

          <Link href="/espace-mila" className={`navbar-link ${light_color}`}>
            {t("mila")}
          </Link>

          {/* Collections Dropdown */}
          <div>
            <div
              className="group flex items-center gap-x-2"
              onMouseEnter={() => {
                setHover(true);
                setIsOpen(true);
              }}
              onMouseLeave={() => {
                setHover(false);
                setIsOpen(false);
              }}>
              <Link
                href="/services"
                className={`relative navbar-link ${light_color}`}>
                Services
              </Link>
              <svg
                className={`w-5 h-5 navbar-link ${light_color} transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {hover ? (
              <ul
                className={`pt-6 pb-2 absolute flex-col space-y-6 navbar-link`}
                onMouseEnter={() => {
                  setHover(true);
                  setIsOpen(true);
                }}
                onMouseLeave={() => {
                  setHover(false);
                  setIsOpen(false);
                }}>
                <li>
                  <Link href={"/services/corporate"} className={light_color}>
                    Corporate
                  </Link>
                </li>
                <li>
                  <Link href={"/services/festivals"} className={light_color}>
                    Festival
                  </Link>
                </li>
                <li>
                  <Link href={"/services/fundraisers"} className={light_color}>
                    Fundraiser
                  </Link>
                </li>
                <li>
                  <Link href={"/services/private"} className={light_color}>
                    Private
                  </Link>
                </li>
              </ul>
            ) : null}
          </div>

          <Link href="/venues" className={`navbar-link ${light_color}`}>
            {t("venues")}
          </Link>

          {/* Book Now */}
          <Link
            href="/book-now"
            className={`navbar-link underline underline-offset-8 ${light_color}`}
            style={{ fontWeight: 500 }}>
            {t("book-now")}
          </Link>

          {/* Language */}
          <Link
            href={pathname}
            locale={t("locale") as "en" | "fr" | undefined}
            className={`navbar-link uppercase  ${light_color}`}
            onClick={() => revalidatePath(pathname)}>
            {t("locale")}
          </Link>
        </div>

        {/* Hamburger button */}
        <button
          aria-label="Open mobile menu"
          id="menu-btn"
          className={`${
            menu ? "open" : ""
          } z-50 block hamburger lg:hidden focus:outline-none group`}
          onClick={() => setMenu((prev) => !prev)}>
          <span className={`hamburger-top ${light_color_bg}`}></span>
          <span className={`hamburger-middle ${light_color_bg}`}></span>
          <span className={`hamburger-bottom ${light_color_bg}`}></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        id="menu"
        className={`absolute top-0 bottom-0 left-0 flex-col z-10 items-end pr-6 self-end w-full min-h-screen pt-40 text-xl text-white bg-opacity-70 bg-black gap-y-12 lg:hidden ${
          menu
            ? "flex opacity-100 transition-opacity duration-500"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenu(false)}>
        <Link
          href="/about"
          className={`navbar-link word ${light_color} ${
            visibleWords.about ? "show" : ""
          }`}
          onClick={() => setMenu(false)}>
          {t("about")}
        </Link>
        <Link
          href="/espace-mila"
          className={`navbar-link word ${light_color} ${
            visibleWords.mila ? "show" : ""
          }`}
          onClick={() => setMenu(false)}>
          {t("mila")}
        </Link>

        <Link
          href="/venues"
          className={`navbar-link word ${light_color} ${
            visibleWords.mila ? "show" : ""
          }`}
          onClick={() => setMenu(false)}>
          {t("venues")}
        </Link>

        {/* Services */}
        <div>
          <div
            className={`word group flex flex-row-reverse items-center gap-x-2 pl-12 ${
              visibleWords.collections ? "show" : ""
            }`}
            onMouseEnter={() => {
              setHover(true);
              setIsOpen(true);
            }}
            onMouseLeave={() => {
              setHover(false);
              setIsOpen(false);
            }}>
            <Link
              href="/services"
              className={`relative navbar-link ${light_color}`}>
              Services
            </Link>
            <svg
              className={`w-5 h-5 navbar-link ${light_color} transition-transform ${
                isOpen ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {hover ? (
            <ul
              className="absolute right-0 mr-[7rem] -mt-[1.8rem] z-20 pb-2 flex-col space-y-6 text-right pr-10"
              onTouchStart={() => {
                setHover(true);
                setIsOpen(true);
              }}
              onMouseEnter={() => {
                setHover(true);
                setIsOpen(true);
              }}
              onMouseLeave={() => {
                setHover(false);
                setIsOpen(false);
              }}>
              <li>
                <Link href={"/services/corporate"} className={light_color}>
                  Corporate
                </Link>
              </li>
              <li>
                <Link href={"/services/festivals"} className={light_color}>
                  Festival
                </Link>
              </li>
              <li>
                <Link href={"/services/fundraisers"} className={light_color}>
                  Fundraiser
                </Link>
              </li>
              <li>
                <Link href={"/services/private"} className={light_color}>
                  Private
                </Link>
              </li>
            </ul>
          ) : null}
        </div>

        <Link
          href="/book-now"
          className={`navbar-link word underline underline-offset-8 ${light_color} ${
            visibleWords.contact ? "show" : ""
          }`}
          onClick={() => setMenu(false)}
          style={{ fontWeight: 500 }}>
          {t("book-now")}
        </Link>
        <Link
          href={pathname}
          locale={t("locale") as "en" | "fr" | undefined}
          className={`navbar-link word ${light_color} uppercase ${
            visibleWords.lang ? "show" : ""
          }`}
          onClick={() => {
            setMenu(false);
            revalidatePath(pathname);
          }}>
          {t("locale")}
        </Link>
      </div>
    </>
  );
}
