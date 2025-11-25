import Org1 from "@/assets/icon/org-1.svg";
import Org2 from "@/assets/icon/org-2.svg";
import Org3 from "@/assets/icon/org-3.svg";
import Facebook from "@/assets/icon/facebook.svg";
import Instagram from "@/assets/icon/instagram.svg";
import Blog from "@/assets/icon/blog.svg";
import Newsletter from "@/assets/icon/newsletter.svg";
import Smile from "@/assets/icon/smile.svg";

export default function Footer() {
  return (
    <div className="bg-[#F5F5F7] px-[35px] py-[27px] text-[#424242] text-[9px]">
      <div className="flex gap-[20px] mb-[20px]">
        <span>이용약관</span>
        <span>개인정보처리방침</span>
      </div>
      <div className="flex flex-col gap-[3px] mb-[20px]">
        <p className="text-[10px] font-semibold">사단법인 다시입다연구소</p>
        <p>대표자 정주연 | 사업자등록번호 618-82-05893</p>
        <p>이메일 lab@wearagain.org</p>
        <p>전화 02-2038-7949</p>
        <p>주소 서울시 성동구 뚝섬로1나길5 헤이그라운드 성수시작점 G605</p>
      </div>
      <div className="flex gap-[30px]">
        <Org1 />
        <Org2 />
        <Org3 />
      </div>
      <p className="my-[20px] text-[8px]">
        Copyright ⓒ 2025 다시입다연구소 | 당신이 다시 입을 때까지 연구합니다 All
        rights reserved.
      </p>
      <div className="flex gap-4">
        <a
          href="https://www.facebook.com/wearagaincampaign/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Facebook />
        </a>

        <a
          href="https://www.instagram.com/wearagaincampaign/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram />
        </a>

        <a
          href="https://blog.naver.com/wearagain"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Blog />
        </a>

        <a
          href="https://page.stibee.com/subscriptions/69943"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Newsletter />
        </a>

        <a
          href="https://wearagain.mixon.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Smile />
        </a>
      </div>
    </div>
  );
}
