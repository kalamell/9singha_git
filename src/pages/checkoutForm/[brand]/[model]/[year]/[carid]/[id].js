import NavLink from "@/app/components/navLink";
import CustomSelect from "@/app/components/customSelect";
import { useState, useEffect } from "react";
import InputCheck from "@/app/components/inputCheck";
import FormCard from "@/app/components/templateComponent/form-card";
import TextOnLine from "@/app/components/textComponent/text-on-line";
import Checkbox from "@/app/components/textComponent/checkbox";
import ButtonBrown from "@/app/components/button/btn-brown";
import ButtonWhite from "@/app/components/button/btn-white";
import TableCard from "@/app/components/templateComponent/table-card";
import Image from "next/image";
import useCarStore from "@/store/carStore";
import useAddressStore from "@/store/addressStore";
import useStore from "@/store/store";
import Warning from "@/app/components/warning";

import axios from "axios";
import { useRouter } from "next/router";

import Head from "next/head";

export default function ComparesCar({ brand, model, year, carid, id }) {
  const [isOpenWarning, setIsOpenWarning] = useState(false);
  const [textWarning, setTextWarning] = useState("");
  const [step, setStep] = useState(3);
  const { car, fetchCarId } = useCarStore();
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { user, token } = useStore();

  useEffect(() => {
    if (carid) {
      fetchCarId(carid);
      //console.log(' car >> ', car)
    }
  }, [fetchCarId]);

  useEffect(() => {
    if (isOpenWarning) {
      setIsOpenWarning(false);
    }
  }, [isOpenWarning]);

  const navLink = [
    { nav: "หน้าแรก", link: "/" },
    { nav: brand, link: "#" },
    { nav: model, link: "#" },
    { nav: year, link: "#" },
    { nav: `ประกันภัยรถยนต์ ${car.model?.main} ${car.model?.sub}`, link: "#" },
  ];

  const titleOption = [
    { value: "นาย", label: "นาย" },

    { value: "นาง", label: "นาง" },
    { value: "นางสาว", label: "นางสาว" },
  ];

  const gasOption = [
    { value: "ไม่ติดตั้งแก๊ส", label: "ไม่ติดตั้งแก๊ส" },
    { value: "ติดตั้ง", label: "ติดตั้ง" },
  ];

  const genderOption = [
    { value: "ชาย", label: "ชาย" },
    { value: "หญิง", label: "หญิง" },
    { value: "ไม่ระบุ", label: "ไม่ระบุ" },
  ];

  const router = useRouter();

  const {
    provinces,
    amphoes,
    districts,
    province,
    amphoe,
    district,
    zipcode,
    setProvince,
    setAmphoe,
    setDistrict,
    fetchProvices,
    fetchAmphoes,
    fetchDistricts,
    fetchZipcode,
    address_id,
  } = useAddressStore();

  const [labelProvince, setLabelProvince] = useState("");
  const [labelAmphoe, setLabelAmphoe] = useState("");
  const [labelDistrict, setLabelDistrict] = useState("");
  const [labelZipcode, setLabelZipcode] = useState("");

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    covered: {
      name: {
        title: "",
        first: "",
        last: "",
        birthdate: "",
      },
      mobile: "",
      email: "",
      id_nbr: "",
      address: {
        no: "",
        moo: "",
        thaipost_id: "",
      },
      del_address: {
        no: "",
        moo: "",
        thaipost_id: "",
      },
      car: {
        no: [],
        no1: "",
        no2: "",
        province_code: "",
        engin_no: "",
        body_no: "",
      },
    },
    start: formatDate(new Date()),
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    //if (!user) {
    //router.push('/');
    //}
    fetchProvices();
  }, [fetchProvices]);

  const [errors, setErrors] = useState({});
  const [resetAddr1, setResetAddr1] = useState(false);
  const [resetAddr2, setResetAddr2] = useState(false);
  const [resetAddr3, setResetAddr3] = useState(false);
  const [resetAddr4, setResetAddr4] = useState(false);

  const DamageToCars = [
    {
      protection: "ความเสียหายต่อรถยนต์ - Test1",
      insuranceFund: "1,000,000 บาท (ต่อครั้ง)",
      sub: [{ protection: "ความเสียหายส่วนแรก", insuranceFund: "ไม่มี" }],
    },
    {
      protection: "ความรับผิดชอบรถยนต์สูญหาย/ไฟไหม้",
      insuranceFund: "1,000,000 บาท (ต่อครั้ง)",
      sub: [],
    },
    {
      protection: "ความเสียหายเกิดจากภัยธรรมชาติ",
      insuranceFund: "ไม่คุ้มครอง",
      sub: [],
    },
  ];

  const ThirdPartyLiability = [
    {
      protection:
        "ความเสียหายต่อชีวิต ร่างกาย หรืออนามัยเฉพาะส่วนเกินวงเงินสูงสุดตาม พ.ร.บ. - Test1",
      insuranceFund: "1,000,000 บาท (ต่อคน) 10,000,000 บาท (ต่อครั้ง)",
      sub: [{ protection: "ความเสียหายส่วนแรก", insuranceFund: "ไม่มี" }],
    },
    {
      protection: "ความเสียหายต่อทรัพย์สินบุคคลภายนอก",
      insuranceFund: "1,000,000 บาท (ต่อครั้ง)",
      sub: [],
    },
  ];

  const ProtectedAccordingDocuments = [
    {
      protection: "อุบัติเหตุส่วนบุคคล - Test1",
      insuranceFund: "",
      sub: [
        {
          protection: "เสียชีวิต สูญเสียอวัยวะ ทุพพลภาพถาวร (ผู้ขับขี่ 1 คน)",
          insuranceFund: "100,000 บาท (ต่อคน)",
        },
        {
          protection: "เสียชีวิต สูญเสียอวัยวะ ทุพพลภาพถาวร (ผู้ขับขี่ 1 คน)",
          insuranceFund: "100,000 บาท (ต่อคน)",
        },
      ],
    },
  ];

  useEffect(() => {
    console.log(selectedTitle);
  }, [selectedTitle]);

  const handleSelectProvince = (label, value) => {
    setProvince(value);
    setLabelProvince(value);
    fetchAmphoes(value);

    setResetAddr2(true);
    setResetAddr3(true);
    setResetAddr4(true);
    setLabelZipcode("");

    setTimeout(() => setResetAddr2(false), 0);
    setTimeout(() => setResetAddr3(false), 0);
    setTimeout(() => setResetAddr4(false), 0);
  };

  const handleSelectAmphoe = (label, value) => {
    setAmphoe(value);
    setLabelProvince(value);
    fetchDistricts();

    /* const [parent, key] = label.split("."); // Split the input name to handle nested objects
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [key]: value,
      },
    }));

    if (errors[label]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[label];
        return newErrors;
      });
    }*/

    setResetAddr3(true);
    setResetAddr4(true);
    setLabelZipcode("");

    setTimeout(() => setResetAddr2(false), 0);
    setTimeout(() => setResetAddr3(false), 0);
    setTimeout(() => setResetAddr4(false), 0);
  };

  const handleSelectDistrict = async (label, value) => {
    setDistrict(value);
    setLabelProvince(value);
    const response = await fetchZipcode();
    setLabelZipcode(response.zipcode);

    /*const [parent, key] = label.split("."); // Split the input name to handle nested objects
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [key]: value,
      },
    }));



    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        ['zipcode']: response.zipcode,
        ['thaipost_id']: response.address_id
      },
    }));

    if (errors[label]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[label];
        return newErrors;
      });
    }

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors['contact.zipcode'];
      return newErrors;
    });
    */

    const [section, field, subfield] = label.split("."); // Split the input name to handle nested objects

    setFormData((prevData) => {
      const newData = { ...prevData };

      if (subfield) {
        newData[section][field]["thaipost_id"] = response.address_id;
      } else {
        newData[section][field] = value;
      }

      return newData;
    });
  };

  const handleZipcode = (value) => {
    console.log("zipcdoe : ", value);
  };

  const handleSelectProvince2 = (label, value) => {
    /*setProvince(value);
    setLabelProvince(value);
    fetchAmphoes(value);



    setResetAddr2(true);
    setResetAddr3(true);
    setResetAddr4(true);
    setLabelZipcode('');

    setTimeout(() => setResetAddr2(false), 0);
    setTimeout(() => setResetAddr3(false), 0);
    setTimeout(() => setResetAddr4(false), 0);
    */

    const [section, field, subfield] = label.split("."); // Split the input name to handle nested objects

    setFormData((prevData) => {
      const newData = { ...prevData };

      if (subfield) {
        newData[section][field][subfield] = value;
      } else {
        newData[section][field] = value;
      }

      return newData;
    });
  };

  const handleOptionChange = (label, value) => {
    const [section, field, subfield] = label.split("."); // Split the input name to handle nested objects

    setFormData((prevData) => {
      const newData = { ...prevData };

      if (subfield) {
        newData[section][field][subfield] = value;
      } else {
        newData[section][field] = value;
      }

      return newData;
    });
  };

  const handleChange = (label, value) => {
    const [section, field, subfield] = label.split("."); // Split the input name to handle nested objects

    setFormData((prevData) => {
      const newData = { ...prevData };

      if (subfield) {
        newData[section][field][subfield] = value;
      } else {
        newData[section][field] = value;
      }

      return newData;
    });
  };

  const confirmPay = async () => {
    setIsLoading(true);

    try {
      const updatedFormData = {
        ...formData,
        covered: {
          ...formData.covered,
          del_address: {
            no: formData.covered.address.no,
            moo: formData.covered.address.moo,
            thaipost_id: formData.covered.address.thaipost_id,
          },
          car: {
            ...formData.covered.car,
            no: [formData.covered.car.no1, formData.covered.car.no2],
          },
        },
      };

      delete updatedFormData.covered.car.no1;
      delete updatedFormData.covered.car.no2;

      console.log(updatedFormData);

      const updateResponse = await axios.post("/api/application", {
        action: "update",
        app_id: id,
        formData: updatedFormData,
        token,
      });
      if (updateResponse.status === 200) {
        //console.log(creaetAppReponse.data.data.data._id);
        //router.push(`/checkoutForm/${brand}/${model}/${year}/${car_id}/${creaetAppReponse.data.data.data._id}`);
        //setIsLoading(null);
        const checkoutReponst = await axios.post("/api/application", {
          action: "checkout",
          app_id: id,
          token,
        });

        if (checkoutReponst.status === 200) {
          //console.log(checkoutReponst.data.data.data.payment.invoice.invoice_url);
          router.push(
            checkoutReponst.data.data.data.payment.invoice.invoice_url
          );
        }
      }
    } catch (e) {
      console.error(e);
      alert("มีข้อผิดพลาด");
    }

    try {
    } catch (e) {}
  };

  return (
    <>
      <Head>
        <title>
          ประกันภัยรถยนต์ {car.model?.main} {car.model?.sub}
        </title>
      </Head>

      <Warning
        id="validateUser"
        isOpenWarning={isOpenWarning}
        textWarning={textWarning}
        closeModel={() => setIsOpenWarning(false)}
      />

      <NavLink navLink={navLink} />
      <div className="bg-singha max-xl:bg-[length:auto_60%]  py-9">
        <div className="container mx-auto">
          <p className="font-athitiBold text-center text-4xl leading-[48px] max-md:text-3xl max-lg:leading-[38px] max-lg:text-[28px]">
            กรอกข้อมูล
            <br className="md:hidden" />
            เพื่อซื้อประกันรถยนต์
          </p>
          <div className="flex w-fit mx-auto justify-center gap-[120px] max-xl:gap-[60px] max-md:gap-[20px]  relative mt-[20px] mb-[36px]">
            <div className="flex flex-col items-center gap-[12px]">
              {step === 1 ? (
                <Image
                  src="/circle-check.svg"
                  width={32}
                  height={32}
                  alt="promptpay"
                  priority={true}
                  className="z-20"
                />
              ) : (
                <Image
                  src="/check.svg"
                  width={32}
                  height={32}
                  alt="promptpay"
                  priority={true}
                  className="z-20"
                />
              )}
              <p className="font-athitiSemiBold text-[22px] leading-[30px] text-[#984333] z-10 max-md:text-[18px]">
                ข้อมูลผู้เอาประกัน
              </p>
            </div>
            <hr
              className={`h-px ${
                step >= 2 ? "border-[#984333]" : "border-[#808291]"
              }  border-[1px] absolute w-[220px] max-md:w-[250px] top-[15px] left-[90px]`}
            />
            <div className="flex flex-col items-center gap-[12px]">
              {step === 1 ? (
                <Image
                  src="/circle.svg"
                  width={32}
                  height={32}
                  alt="promptpay"
                  priority={true}
                  className="z-20"
                />
              ) : step === 2 ? (
                <Image
                  src="/circle-check.svg"
                  width={32}
                  height={32}
                  alt="promptpay"
                  priority={true}
                  className="z-20"
                />
              ) : step > 2 ? (
                <Image
                  src="/check.svg"
                  width={32}
                  height={32}
                  alt="promptpay"
                  priority={true}
                  className="z-20"
                />
              ) : null}
              <p
                className={`font-athitiSemiBold text-[22px] leading-[30px] max-md:text-[18px] ${
                  step >= 2 ? "text-[#984333]" : "text-[#808291]"
                }`}
              >
                ข้อมูลรถยนต์
              </p>
            </div>
            <hr
              className={`h-px ${
                step >= 3 ? "border-[#984333]" : "border-[#808291]"
              } border-[1px] absolute w-[220px] max-md:w-[220px] top-[15px] right-[75px]`}
            />
            <div className="flex flex-col items-center gap-[12px]">
              {step < 3 ? (
                <Image
                  src="/circle.svg"
                  width={32}
                  height={32}
                  alt="promptpay"
                  priority={true}
                  className="z-20"
                />
              ) : step === 3 ? (
                <Image
                  src="/circle-check.svg"
                  width={32}
                  height={32}
                  alt="promptpay"
                  priority={true}
                  className="z-20"
                />
              ) : step === 4 ? (
                <Image
                  src="/check.svg"
                  width={32}
                  height={32}
                  alt="promptpay"
                  priority={true}
                  className="z-20"
                />
              ) : null}
              <p
                className={`font-athitiSemiBold text-[22px] leading-[30px] max-md:text-[18px] ${
                  step == 4 ? "text-[#984333]" : "text-[#808291]"
                }`}
              >
                ข้อมูลการสั่งซื้อ
              </p>
            </div>
          </div>

          <div className="bg-[#ffffff] px-[24px] max-md:px-[20px] py-[24px] rounded-[12px] flex flex-col gap-y-[24px]">
            {step >= 2 ? (
              <div
                onClick={() => {
                  setStep(1);
                }}
                className="cursor-pointer flex bg-[#FDE68A] rounded-2xl p-[16px] items-center justify-between"
              >
                <div className="flex items-center font-athitiSemiBold text-[18px] leading-[22px] gap-[12px]">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="30" height="30" rx="15" fill="#181B31" />
                    <path
                      d="M8 16L12 20L22 10"
                      stroke="#FDE68A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <p>ข้อมูลผู้เอาประกัน</p>
                </div>

                <svg
                  width="12"
                  height="7"
                  viewBox="0 0 12 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${step >= 2 ? "rotate-180" : "rotate-0"}`}
                >
                  <path
                    d="M1.33334 5.99967L6.00001 1.33301L10.6667 5.99967"
                    stroke="#111928"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            ) : null}
            {step >= 3 ? (
              <div
                onClick={() => {
                  setStep(2);
                }}
                className="cursor-pointer flex bg-[#FED7AA] rounded-2xl p-[16px] items-center justify-between"
              >
                <div className="flex items-center font-athitiSemiBold text-[18px] leading-[22px] gap-[12px]">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="30" height="30" rx="15" fill="#181B31" />
                    <path
                      d="M8 16L12 20L22 10"
                      stroke="#FED7AA"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p>ข้อมูลรถยนต์</p>
                </div>

                <svg
                  width="12"
                  height="7"
                  viewBox="0 0 12 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${step >= 3 ? "rotate-180" : "rotate-0"}`}
                >
                  <path
                    d="M1.33334 5.99967L6.00001 1.33301L10.6667 5.99967"
                    stroke="#111928"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            ) : null}
            {step >= 4 ? (
              <div
                onClick={() => {
                  setStep(3);
                }}
                className="cursor-pointer flex bg-[#F1F5D8] rounded-2xl p-[16px] items-center justify-between"
              >
                <div className="flex items-center font-athitiSemiBold text-[18px] leading-[22px] gap-[12px]">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="30" height="30" rx="15" fill="#181B31" />
                    <path
                      d="M8 16L12 20L22 10"
                      stroke="#F1F5D8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p>ข้อมูลการสั่งซื้อ</p>
                </div>

                <svg
                  width="12"
                  height="7"
                  viewBox="0 0 12 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${step >= 4 ? "rotate-180" : "rotate-0"}`}
                >
                  <path
                    d="M1.33334 5.99967L6.00001 1.33301L10.6667 5.99967"
                    stroke="#111928"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            ) : null}
            {step === 1 ? (
              <FormCard
                title="ข้อมูลผู้เอาประกัน"
                text="center"
                bgTitle="#FDE68A"
                bgContent="#FFFBEB"
                paddingMbX="0"
              >
                <div className="md:bg-[#FFFFFF] rounded-[12px] p-[16px] flex flex-col gap-[20px]">
                  <TextOnLine text="ข้อมูลผู้เอาประกัน" />
                  <div className="grid grid-cols-3 max-md:grid-cols-1 gap-x-[24px] gap-y-[20px]">
                    <CustomSelect
                      title="คำนำหน้าชื่อ"
                      placeholderBottom="โปรดกรอกคำนำหน้าชื่อ"
                      options={titleOption}
                      onChange={(value) => {
                        handleOptionChange("covered.name.title", value.value);
                      }}
                      value={formData.covered.name.title}
                      defaultLabel="คำนำหน้าชื่อ"
                      valid={!errors["name.title"]}
                    />

                    <InputCheck
                      title="ชื่อ"
                      placeholderBottom="โปรดกรอกชื่อ"
                      valid={!errors["name.first"]}
                      value={formData.covered.name.first}
                      onChange={(value) => {
                        handleChange("covered.name.first", value);
                      }}
                    />

                    <InputCheck
                      title="นามสกุล"
                      placeholderBottom="โปรดกรอกนามสกุล"
                      valid={!errors["name.last"]}
                      value={formData.covered.name.last}
                      onChange={(value) => {
                        handleChange("covered.name.last", value);
                      }}
                    />

                    <InputCheck
                      title="วัน/เดือน/ปี เกิด"
                      placeholderBottom="โปรดกรอกวัน/เดือน/ปี เกิด"
                      type="date"
                      valid={!errors["name.birthdate"]}
                      onChange={(value) => {
                        handleChange("covered.name.birthdate", value);
                      }}
                      value={formData.covered.name.birthdate}
                    />

                    <InputCheck
                      title="เลขบัตรประชาชน 13 หลัก"
                      placeholderBottom="ตัวอย่าง 0123456789123"
                      valid={!errors["id_nbr"]}
                      maxlength="13"
                      onChange={(value) => {
                        handleOptionChange("covered.id_nbr", value);
                      }}
                      value={formData.covered.id_nbr}
                      onKeyPress
                    />

                    <InputCheck
                      title="หมายเลขติดต่อ"
                      placeholderBottom="*ตัวอย่าง 0987654321"
                      valid={!errors["mobile"]}
                      maxlength="10"
                      onChange={(value) => {
                        handleOptionChange("covered.mobile", value);
                      }}
                      value={formData.covered.mobile}
                      onKeyPress
                    />

                    <InputCheck
                      title="อีเมล"
                      placeholderBottom="ตัวอย่าง example@gmail.com"
                      valid={!errors["email"]}
                      onChange={(value) => {
                        handleOptionChange("covered.email", value);
                      }}
                      value={formData.covered.email}
                      type="email"
                    />
                  </div>
                </div>

                <div className="bg-[#F5F5F4] md:rounded-[12px] p-[16px] flex flex-col gap-[20px]">
                  <TextOnLine text="ที่อยู่หน้ากรมธรรม์" />

                  <div className="grid grid-cols-[15%_15%_auto_auto] max-md:grid-cols-1 gap-y-[20px] gap-x-[20px] max-lg:gap-x-[10px]">
                    <InputCheck
                      title="บ้านเลขที่"
                      onChange={(value) => {
                        handleOptionChange("covered.address.no", value);
                      }}
                      value={formData.covered.address.no}
                      type="text"
                    />

                    <InputCheck
                      title="หมู่"
                      onChange={(value) => {
                        handleOptionChange("covered.address.moo", value);
                      }}
                      value={formData.covered.address.moo}
                      type="text"
                    />

                    <InputCheck
                      title="หมู่บ้าน"
                      valid=""
                      required={false}
                      onChange=""
                    />

                    <InputCheck
                      title="โครงการ"
                      required={false}
                      valid=""
                      onChange=""
                    />

                    <InputCheck
                      title="ชั้น"
                      required={false}
                      valid=""
                      onChange=""
                    />

                    <InputCheck
                      title="ห้อง"
                      required={false}
                      valid=""
                      onChange=""
                    />

                    <InputCheck
                      title="ซอย"
                      required={false}
                      valid=""
                      onChange=""
                    />

                    <InputCheck
                      title="ถนน"
                      required={false}
                      valid=""
                      onChange=""
                    />

                    <div className="md:col-start-1 md:col-end-3">
                      <CustomSelect
                        title="จังหวัด"
                        placeholderBottom="โปรดเลือกจังหวัด"
                        options={provinces}
                        onChange={(value) => {
                          handleSelectProvince("contact.province", value.value);
                        }}
                        defaultLabel="เลือกจังหวัด"
                        valid={!errors["contact.province"]}
                        reset={resetAddr1}
                      />
                    </div>

                    <CustomSelect
                      title="อำเภอ / เขต"
                      placeholderBottom="โปรดเลือกอำเภอ / เขต"
                      options={amphoes}
                      onChange={(value) => {
                        handleSelectAmphoe("contact.district", value.value);
                      }}
                      defaultLabel="เลือกอำเภอ / เขต "
                      reset={resetAddr2}
                      valid={!errors["contact.district"]}
                    />

                    <CustomSelect
                      title="ตำบล / แขวง"
                      placeholderBottom="โปรดเลือกตำบล / แขวง"
                      options={districts}
                      valid={!errors["contact.subdistrict"]}
                      onChange={(value) => {
                        handleSelectDistrict(
                          "covered.address.subdistrict",
                          value.value
                        );
                      }}
                      defaultLabel="เลือกอตำบล / แขวง"
                      reset={resetAddr3}
                    />

                    <div className="md:col-start-1 md:col-end-3">
                      <InputCheck
                        title="รหัสไปรษณีย์"
                        placeholderBottom="โปรดกรอกรหัสไปรษณีย์"
                        initialValue={zipcode}
                        valid={!errors["contact.zipcode"]}
                        value={zipcode}
                        onChange={handleZipcode}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-[#FFFFFF] md:rounded-[12px] max-md:bg-[#FFFBEB] p-[16px] flex flex-col gap-[20px]">
                  <TextOnLine text="ที่อยู่ในการจัดส่งเอกสาร" />
                  <Checkbox text="ใช้ที่อยู่เดียวกับที่อยู่หน้ากรมธรรม์" />
                </div>

                <div className="bg-[#F5F5F4] md:rounded-[12px] p-[16px] flex flex-col gap-[20px]">
                  <TextOnLine text="ที่อยู่ในการออกใบกำกับภาษี" />
                  <Checkbox text="ใช้ที่อยู่เดียวกับที่อยู่หน้ากรมธรรม์" />
                </div>

                <div className="max-w-[210px] w-full mx-auto mt-[40px]  flex items-center">
                  <ButtonBrown
                    onClick={() => {
                      if (
                        formData.covered.name.title === "" &&
                        formData.covered.name.first === "" &&
                        formData.covered.name.last === ""
                      ) {
                        //alert('กรุณากรอกข้อมูลให้เรียบร้อย')
                        setIsOpenWarning(true);
                        setTextWarning("กรุณากรอกข้อมูลให้เรียบร้อย");
                      } else {
                        setStep(2);
                      }
                    }}
                    text="ถัดไป"
                  />
                </div>
              </FormCard>
            ) : step === 2 ? (
              <FormCard
                title="ข้อมูลรถยนต์"
                text="center"
                bgTitle="#FED7AA"
                bgContent="#FFF7ED"
                paddingMbX="20"
              >
                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-x-[24px] gap-y-[20px]">
                  <div className="grid gap-x-1 grid-cols-[50%_50%]">
                    <InputCheck
                      title="เลขทะเบียน(หมวดอักษร)"
                      placeholderBottom="*ตัวอย่าง กข หรือ 1กข"
                      maxlength="3"
                      onChange={(value) => {
                        handleOptionChange("covered.car.no1", value);
                      }}
                      value={formData.covered.car.no1}
                    />

                    <InputCheck
                      maxlength="5"
                      title="เลขทะเบียน(ตัวเลข)"
                      placeholderBottom="*ตัวอย่าง 1234"
                      onChange={(value) => {
                        handleOptionChange("covered.car.no2", value);
                      }}
                      value={formData.covered.car.no2}
                    />
                  </div>

                  <CustomSelect
                    title="จังหวัด"
                    placeholderBottom="โปรดเลือกจังหวัด"
                    options={provinces}
                    onChange={(value) => {
                      handleSelectProvince2(
                        "covered.car.province_code",
                        value.value
                      );
                    }}
                    defaultLabel="เลือกจังหวัด"
                    valid={!errors["covered.car.province_code"]}
                    reset={resetAddr1}
                  />

                  <InputCheck
                    title="เลขตัวรถ (ตัวถัง)"
                    placeholderBottom="*ตัวอย่าง MMTJJKK10FH006002"
                    onChange={(value) => {
                      handleOptionChange("covered.car.body_no", value);
                    }}
                    value={formData.covered.car.body_no}
                  />

                  <CustomSelect
                    title="ติดตั้งแก็ส"
                    required
                    options={gasOption}
                    onChange={(value) => {
                      handleOptionChange("covered.car.engin_no", value.value);
                    }}
                    value={formData.covered.car.engin_no}
                    defaultLabel="ไม่ติดตั้งแก๊ส"
                  />
                </div>
                <div className="flex flex-col gap-[20px]">
                  <p className="font-athitiMedium text-[#808291] text-[16px] leading-[20px]">
                    * หมายเหตุ มีผลต่อการคิดคำนวณเบี้ยประกันภัย
                  </p>
                  <hr className="h-px bg-[#FFFFFF] border-0" />
                  <div className="grid grid-cols-[minmax(210px,_1fr)_minmax(210px,_1fr)] max-md:grid-cols-[1fr_1fr] gap-[20px] md:mx-auto">
                    <ButtonWhite
                      onClick={() => {
                        setStep(1);
                      }}
                      text="ย้อนกลับ"
                    />
                    <ButtonBrown
                      onClick={() => {
                        setStep(3);
                      }}
                      text="ถัดไป"
                    />
                  </div>
                </div>
              </FormCard>
            ) : step === 3 ? (
              <FormCard
                title="ข้อมูลการสั่งซื้อ"
                text="center"
                bgTitle="#F1F5D8"
                bgContent="#FBFCF3"
                paddingMbX={20}
              >
                <TextOnLine text="รายละเอียดประกันภัย" />

                <p className="font-athitiSemiBold text-base leading-[22px]">
                  ระบุผู้ขับขี่
                </p>

                <div className="grid grid-cols-[auto_37%_37%] items-center max-md:grid-cols-1 gap-x-[24px] gap-y-[20px]">
                  <CustomSelect
                    title="คำนำหน้าชื่อ"
                    placeholderBottom="โปรดกรอกคำนำหน้าชื่อ"
                    options={titleOption}
                    onChange={(value) => {
                      handleOptionChange("covered.name.title", value.value);
                    }}
                    value={formData.covered.name.title}
                    defaultLabel="คำนำหน้าชื่อ"
                    valid={!errors["name.title"]}
                  />

                  <InputCheck
                    title="ชื่อ"
                    placeholderBottom="โปรดกรอกชื่อ"
                    valid=""
                    onChange=""
                  />
                  <InputCheck
                    placeholderBottom="โปรดกรอกคำนำนามสกุล"
                    title="นามสกุล"
                    valid=""
                    onChange=""
                  />
                  <p className="font-athitiSemiBold text-base leading-[20px]">
                    ระยะเวลา : 1 ปี วันเริ่มต้นความคุ้มครอง
                    <span className="text-[#FF0000]">*</span>
                  </p>
                  <InputCheck
                    type="date"
                    required={false}
                    valid=""
                    onChange=""
                  />
                </div>

                <TextOnLine text="รายละเอียดประกันภัย" />
                <Checkbox text="ซื้อประกันภัยภาคบังคับ (พ.ร.บ.)" />

                <div className="grid grid-cols-[auto_37%_37%] items-center max-md:grid-cols-1 gap-x-[24px] gap-y-[20px]">
                  <p className="font-athitiSemiBold text-base leading-[20px]">
                    ระยะเวลา : 1 ปี วันเริ่มต้นความคุ้มครอง
                    <span className="text-[#FF0000]">*</span>
                  </p>
                  <InputCheck
                    type="date"
                    required={false}
                    valid=""
                    onChange=""
                  />
                </div>

                <p className="font-athitiMedium  text-[#808291] text-[16px] leading-[20px]">
                  * เอกสารกรมธรรม์ภาคบังคับ (พ.ร.บ.)
                  เพื่อนำไปยื่นชำระภาษีประจำปีจะได้รับการจัดส่งให้คุณทางไปรษณีย์โดยไม่มีค่าใช้จ่ายเพิ่มเติม
                </p>

                <TextOnLine text="ค่าบริการจัดส่งเอกสาร" />

                <Checkbox text="จัดส่งกรมธรรม์ภาคสมัครใจทางไปรษณีย์ (+50 บาท)" />

                <div className=" md:rounded-[12px]  flex flex-col gap-[20px]">
                  <TextOnLine text="ที่อยู่ในการจัดส่งเอกสาร" />

                  <Checkbox text="ใช้ที่อยู่เดียวกับที่อยู่หน้ากรมธรรม์" />

                  <div className="grid grid-cols-[15%_15%_auto_auto] max-md:grid-cols-1 gap-y-[20px] gap-x-[20px] max-lg:gap-x-[10px]">
                    <InputCheck
                      title="บ้านเลขที่"
                      onChange={(value) => {
                        handleOptionChange("covered.address.no", value);
                      }}
                      value={formData.covered.address.no}
                      type="text"
                    />

                    <InputCheck
                      title="หมู่"
                      onChange={(value) => {
                        handleOptionChange("covered.address.moo", value);
                      }}
                      value={formData.covered.address.moo}
                      type="text"
                    />

                    <InputCheck
                      title="หมู่บ้าน"
                      valid=""
                      required={false}
                      onChange=""
                    />

                    <InputCheck
                      title="โครงการ"
                      required={false}
                      valid=""
                      onChange=""
                    />

                    <InputCheck
                      title="ชั้น"
                      required={false}
                      valid=""
                      onChange=""
                    />

                    <InputCheck
                      title="ห้อง"
                      required={false}
                      valid=""
                      onChange=""
                    />

                    <InputCheck
                      title="ซอย"
                      required={false}
                      valid=""
                      onChange=""
                    />

                    <InputCheck
                      title="ถนน"
                      required={false}
                      valid=""
                      onChange=""
                    />

                    <div className="md:col-start-1 md:col-end-3">
                      <CustomSelect
                        title="จังหวัด"
                        placeholderBottom="โปรดเลือกจังหวัด"
                        options={provinces}
                        onChange={(value) => {
                          handleSelectProvince("contact.province", value.value);
                        }}
                        defaultLabel="เลือกจังหวัด"
                        valid={!errors["contact.province"]}
                        reset={resetAddr1}
                      />
                    </div>

                    <CustomSelect
                      title="อำเภอ / เขต"
                      placeholderBottom="โปรดเลือกอำเภอ / เขต"
                      options={amphoes}
                      onChange={(value) => {
                        handleSelectAmphoe("contact.district", value.value);
                      }}
                      defaultLabel="เลือกอำเภอ / เขต "
                      reset={resetAddr2}
                      valid={!errors["contact.district"]}
                    />

                    <CustomSelect
                      title="ตำบล / แขวง"
                      placeholderBottom="โปรดเลือกตำบล / แขวง"
                      options={districts}
                      valid={!errors["contact.subdistrict"]}
                      onChange={(value) => {
                        handleSelectDistrict(
                          "covered.address.subdistrict",
                          value.value
                        );
                      }}
                      defaultLabel="เลือกอตำบล / แขวง"
                      reset={resetAddr3}
                    />

                    <div className="md:col-start-1 md:col-end-3">
                      <InputCheck
                        title="รหัสไปรษณีย์"
                        placeholderBottom="โปรดกรอกรหัสไปรษณีย์"
                        initialValue={zipcode}
                        valid={!errors["contact.zipcode"]}
                        value={zipcode}
                        onChange={handleZipcode}
                      />
                    </div>
                  </div>
                </div>

                <p className="font-athitiMedium  text-[#808291] text-[16px] leading-[20px]">
                  * กรมธรรม์ประกันภัยภาคสมัครใจ (ประเภท 1, 2, 2+, 3+ หรือ 3)
                  จะได้รับการส่งให้คุณทางอีเมลภายหลังการชำระเงินเสร็จสิ้นสมบูรณ์ในกรณีที่คุณ
                  ต้องการได้รับกรมธรรม์ภาคสมัครใจทางไปรษณีย์
                  กรุณาชำระค่าบริการจัดส่ง 50 บาท
                </p>

                <hr className="h-px bg-[#FFFFFF] border-0" />

                <div className="grid grid-cols-[minmax(210px,_1fr)_minmax(210px,_1fr)] max-md:grid-cols-[1fr_1fr] gap-[20px] md:mx-auto">
                  <ButtonWhite
                    onClick={() => {
                      setStep(2);
                    }}
                    text="ย้อนกลับ"
                  />
                  <ButtonBrown
                    onClick={() => {
                      setStep(4);
                    }}
                    text="ถัดไป"
                  />
                </div>
              </FormCard>
            ) : step === 4 ? (
              <FormCard
                title="สรุปการสั่งซื้อประกันรถยนต์"
                text="center"
                bgTitle="#E7E5E4"
                bgContent="#F5F5F4"
                paddingMbX="20"
              >
                <TextOnLine text=" สรุปข้อมูลการชำระเงิน" />

                <div className="grid grid-cols-2 max-md:grid-cols-1 md:[&>*:nth-child(even)]:text-end gap-[14px] max-md:gap-[6px] font-athitiMedium text-[18px] leading-[22px]">
                  <p>บจก.ประกันคุ้มภัย ชั้น {car.group}</p>
                  <p className="max-md:pb-[12px]">{car.coverage} บาท</p>
                  <p>ประกันภัยภาคบังคับ (พ.ร.บ.)</p>
                  <p className="max-md:pb-[12px]"> บาท</p>
                  <p>ส่งกรมธรรม์ภาคสมัครใจทางไปรษณีย์</p>
                  <p className="max-md:pb-[12px]">50 บาท</p>
                </div>
                <hr className="h-px bg-[#FFFFFF] border-0" />
                <div className="grid grid-cols-2 max-md:grid-cols-1 md:[&>*:nth-child(even)]:text-end">
                  <p className="font-athitiSemiBold text-[22px] leading-[20px] text-start">
                    ยอดเงินรวม <br />
                    <span className="font-athitiMedium text-[16px] leading-[20px] text-[#808291]">
                      (รวมภาษีมูลค่าเพิ่ม 7% แล้ว)
                    </span>
                  </p>
                  <p className="font-athitiSemiBold text-[22px] leading-[40px]">
                    {car.coverage + car.coverage * 0.07 + 50} บาท
                  </p>
                </div>

                <TextOnLine text=" รายละเอียดความคุ้มครอง" />

                <TableCard
                  bgTitle="#E7E5E4"
                  bgContent="#FFFFFF"
                  title="ความเสียหายต่อรถยนต์"
                  props={DamageToCars}
                />

                <TableCard
                  bgTitle="#E7E5E4"
                  bgContent="#FFFFFF"
                  title="ความรับผิดต่อบุคคลภายนอก"
                  props={ThirdPartyLiability}
                />

                <TableCard
                  bgTitle="#E7E5E4"
                  bgContent="#FFFFFF"
                  title="ความคุ้มครองตามเอกสารแนบท้าย"
                  props={ProtectedAccordingDocuments}
                />

                <p className="font-athitiMedium text-[16px] leading-[20px] text-[#808291] text-center">
                  การกดยืนยันหมายถึงคุณได้ยอมรับ&nbsp;
                  <br className="md:hidden" />
                  <span className="underline">ในข้อตกลงและเงื่อนไข</span>
                  &nbsp;แล้ว
                  <br />
                  คำเตือน :
                  ผู้ซื้อควรทำความเข้าใจในรายละเอียดความคุ้มครองและเงื่อนไข
                  ก่อนตัดสินใจซื้อทุกครั้ง
                </p>
                <hr className="h-px bg-[#FFFFFF] border-0" />
                <div className="grid grid-cols-[minmax(210px,_1fr)_minmax(210px,_1fr)] max-md:grid-cols-[1fr_1fr] gap-[10px] md:mx-auto">
                  <ButtonWhite
                    onClick={() => {
                      setStep(3);
                    }}
                    text="ย้อนกลับ"
                  />
                  <ButtonBrown
                    isLoading={isLoading}
                    onClick={() => router.push("/payment1")}
                    text="ยืนยันคำสั่งซื้อ"
                  />
                </div>
              </FormCard>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async ({ params }) => {
  // Assuming params.slug is something like '123-car-model'
  const { brand, model, year, carid, id } = params;
  console.log(" >>> ", params);

  return {
    props: {
      brand,
      model,
      year,
      carid,
      id,
    },
  };
};
