import Image from "next/image";
import TemplateLogin from "@/app/components/templateComponent/login";
import Link from "next/link";
export default function TermAndCondigitons() {
  return (
    <>
      <div className="bg-singha max-xl:bg-[length:auto_40%] min-h-[calc(100vh_-_152px)] max-md:min-h-[calc(100vh_-_198px)] content-center">
        <div className="container mx-auto w-[800] max-md:w-full py-9 px-4">

        <h1 className="text-[#181B31] font-athitiBold text-[36px] leading-[48px] text-center">
        นโยบายและเงื่อนไขการยกเลิกกรมธรรม์
          </h1>
         
        
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg mt-10">
        <p className="text-xl font-athitiSemiBold  mb-4">ท่านสามารถแจ้งยกเลิกกรมธรรม์ประกันภัยออนไลน์ที่ซื้อกับ บริษัท <span className="font-nineBold">๙</span> สิงห์โบรกเกอร์ จำกัด ได้ที่หมายเลขโทรศัพท์ <Link href="tel:022759119">02-275-9119</Link> (ในเวลาทำการ) โดยทางเจ้าหน้าที่จะเป็นผู้แจ้งรายละเอียดในการส่งเอกสารให้กับท่านได้รับทราบ</p>

       


        <section className="mb-8">
            <h2 className="text-2xl font-athitiSemiBold mb-2">เงื่อนไขการยกเลิกกรมธรรม์</h2>
            
            <p className="indent-6 text-xl font-athitiSemiBold mb-4">กรณีผู้เอาประกันภัยบอกยกเลิกกรมธรรม์</p>
            <ul className="list-none list-inside text-xl font-athitiMedium pl-10 mb-4">
                <li className="mb-0">- กรณีแจ้งยกเลิกกรมธรรม์ในวันเดียวกับที่ซื้อและแจ้งให้บริษัทฯทราบไม่เกิน 17.00 น. เมื่อบริษัทฯได้รับเอกสารพร้อมตรวจสอบความถูกต้องเรียบร้อยแล้ว จะดำเนินการประสานงานกับธนาคารเจ้าของบัตรเครดิตให้ปรับยอดคืนเครดิตให้กับท่าน ทั้งนี้เป็นไปตามเงื่อนไขของบริษัทฯ และธนาคารที่ท่านใช้บริการ</li>
                <li className="mb-0">- กรณีแจ้งยกเลิกโดยที่กรมธรรม์ยังไม่เริ่มคุ้มครอง ท่านจะได้รับการคืนเบี้ยประกันภัยภายใน 7 วันทำการ ทั้งนี้หลังจากที่บริษัทฯได้รับเอกสารและตรวจสอบความถูกต้องเรียบร้อยแล้ว</li>
                <li className="mb-0">- กรณีแจ้งยกเลิกโดยที่กรมธรรม์เริ่มความคุ้มครองแล้ว บริษัทฯจะคืนเบี้ยประกันภัยให้แก่ผู้เอาประกันภัย โดยหักเบี้ยประกันภัยตามระยะเวลาที่กรมธรรม์ใช้บังคับ แล้วคืนเบี้ยประกันภัยตามสัดส่วนให้ตรงตามเงื่อนไขของกรมธรรม์ โดยท่านจะได้รับการคืนเบี้ยประกันภัยภายใน 7 วันทำการ ทั้งนี้หลังจากที่บริษัทฯได้รับเอกสารและตรวจสอบความถูกต้องเรียบร้อยแล้ว</li>
            
            </ul>

            <p className="indent-6 text-xl font-athitiSemiBold mb-4">กรณีบริษัทเป็นฝ่ายยกเลิกกรมธรรม์</p>
            <ul className="list-none list-inside text-xl font-athitiMedium pl-10 mb-4">
                <li className="mb-0">-	บริษัทฯจะส่งหนังสือบอกกล่าวไม่น้อยกว่า 30 วัน ทางไปรษณีย์ลงทะเบียนถึงผู้เอาประกันภัย และจะคืนเบี้ยประกันภัยให้แก่ผู้เอาประกันภัย โดยหักเบี้ยประกันภัยตามสัดส่วนที่ระบุตามเงื่อนไขกรมธรรม์</li>
            </ul>

        </section>

        <section className="mb-8">
            <h2 className="text-2xl font-athitiSemiBold mb-2">หมายเหตุ</h2>
            
            <p className="text-xl font-athitiMedium mb-4">บริษัทฯขอสงวนสิทธิ์ในการเปลี่ยนแปลงเงื่อนไขโดยไม่ต้องแจ้งให้ทราบล่วงหน้า และการยกเลิกกรมธรรม์จะพิจารณาเป็นไปตามเงื่อนไขและข้อกำหนดของกรมธรรม์นั้นๆ ที่บริษัทฯได้จัดทำขึ้นและถือเป็นที่สิ้นสุด</p>

            

        </section>



        
    </div>
      
          
          
        </div>
      </div>
    </>
  );
}
