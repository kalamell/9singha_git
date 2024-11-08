import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import InputCheck from "../../app/components/inputCheck";
import TemplateLogin from "@/app/components/templateComponent/login";
import ButtonBrown from "@/app/components/button/btn-brown";

export default function ForgotPassword({ handleKeyPress }) {
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [validateTelephoneNumber, setValidateTelephoneNumber] = useState(null);
  const [step, setStep] = useState(3);

  const handleTelephoneNumber = (value) => {
    setTelephoneNumber(value);
    setValidateTelephoneNumber(true);
  };

  const onClickSubmit = () => {
    telephoneNumber == "" ? setValidateTelephoneNumber(false) : "";
    let _step = step;
    _step++;
    if (_step == 5) {
      _step = 1;
    }
    setStep(_step);
  };

  return (
    <TemplateLogin
      title="ลืมรหัสผ่าน"
      subTitle={`${
        step === 1
          ? "กรอกเบอร์โทรศัพท์ของคุณเพื่อยืนยัน OTP ทาง SMS"
          : step === 2
          ? "กรอกรหัส OTP ของคุณ"
          : step === 3 || step === 4
          ? "กำหนดรหัสผ่านใหม่"
          : null
      }`}
    >
      <div className="flex flex-col gap-y-4">
        {step === 1 && (
          <>
            <InputCheck
              type="text"
              title="เบอร์โทรศัพท์"
              placeholderBottom="โปรดกรอกเบอร์โทรศัพท์"
              valid=""
              onChange=""
              onKeyPress
              maxlength="10"
            />

            <ButtonBrown text="รับรหัส OTP" onClick={onClickSubmit} />
          </>
        )}

        {step === 2 && (
          <>
            <InputCheck
              type="text"
              title={
                <>
                  ยืนยันรหัส โปรดกรอกรหัส OTP (REF:SFMAQR)
                  <br /> ที่ได้รับทาง SMS ที่ 083-XXX-5566
                </>
              }
              placeholder="รหัส OTP"
              placeholderBottom="รหัส OTP มีอายุการใช้งาน 5 นาที"
              required={false}
              valid=""
              onChange=""
              onKeyPress
              maxlength="10"
            />
            <ButtonBrown text="ยืนยัน OTP" onClick={onClickSubmit} />
          </>
        )}

        {step === 3 && (
          <>
            <InputCheck
              type="password"
              title="รหัสผ่านใหม่"
              placeholder="รหัสผ่านใหม่"
              placeholderBottom={
                <>
                  โปรดกรอกรหัสผ่านยาว 6-10 ตัวอักษร
                  <br />
                  มีตัวอักษรภาษาอังกฤษพิมพ์ใหญ่ และพิมพ์เล็ก (A-Z, a-z)
                  <br /> มีตัวเลข (0-9) และอักขระพิเศษ
                  <br className="md:hidden" />
                  (@ # - ! ,)
                </>
              }
              valid=""
              onChange=""
              onKeyPress=""
            />

            <InputCheck
              type="password"
              title="ยืนยันรหัสผ่านใหม่"
              placeholder="ยืนยันรหัสผ่านใหม่"
              placeholderBottom=""
              valid=""
              onChange=""
              onKeyPress=""
            />
            <ButtonBrown text="เปลี่ยนรหัสผ่าน" onClick={onClickSubmit} />
          </>
        )}

        {step === 4 && (
          <>
            <div>
              <p className="font-athitiMedium text-xl text-[#374151] leading-[30px] text-center">
                เปลี่ยนรหัสผ่านเรียบร้อย
                <br />
                ท่านสามารถเข้าใช้งานระบบ <br className="md:hidden" />
                โดยใช้รหัสผ่านใหม่
              </p>
            </div>

            <ButtonBrown
              link="/login"
              text="เข้าสู่ระบบ"
              onClick={onClickSubmit}
            />
          </>
        )}
      </div>
    </TemplateLogin>
  );
}
