import svgPaths from "./svg-pruaafdf23";
import imgUsdt from "figma:asset/841f3d1f868a3d71a01649b4307b9a1c1259e399.png";
import imgUsdt1 from "figma:asset/3f415cd75e8a755a032ae16a3406c41dcc2d667a.png";
import imgUsdt2 from "figma:asset/ba6dfbe8a2524a21851b06772dc28366a4c8ed67.png";

function LogoBeLdo7OzSvg() {
  return (
    <div className="h-[32px] relative shrink-0 w-[134px]" data-name="logo-BeLdo7OZ.svg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 134 32">
        <g id="logo-BeLdo7OZ.svg">
          <g filter="url(#filter0_i_3_123)" id="Group">
            <path d={svgPaths.p2d4ee280} fill="var(--fill-0, #0057FF)" id="Vector" />
          </g>
          <path d={svgPaths.p244271f0} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p2a1a0300} fill="var(--fill-0, #050F19)" id="Vector_3" />
          <path d={svgPaths.pbf78900} fill="var(--fill-0, #050F19)" id="Vector_4" />
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="36" id="filter0_i_3_123" width="32" x="0.5" y="0">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="3" />
            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.35 0" />
            <feBlend in2="shape" mode="normal" result="effect1_innerShadow_3_123" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

function LogoBeLdo7OzSvgFill() {
  return (
    <div className="content-stretch flex flex-col h-[32px] items-center justify-center overflow-clip relative shrink-0 w-[134px]" data-name="logo-BeLdo7OZ.svg fill">
      <LogoBeLdo7OzSvg />
    </div>
  );
}

function LogoBeLdo7OzSvg1() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="logo-BeLdo7OZ.svg">
      <LogoBeLdo7OzSvgFill />
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Link">
      <LogoBeLdo7OzSvg1 />
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex items-center justify-center px-[15px] py-[20px] relative w-full">
          <Link />
        </div>
      </div>
    </div>
  );
}

function OverlayBorder() {
  return (
    <div className="bg-[rgba(0,87,255,0.1)] box-border content-stretch flex h-[24px] items-center px-[13px] py-[5px] relative rounded-[12px] shrink-0" data-name="Overlay+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,87,255,0.15)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#0057ff] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Step 1</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start justify-between relative shrink-0 w-full" data-name="Container">
      <OverlayBorder />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#050f19] text-[24px] text-nowrap">
        <p className="leading-[32px] whitespace-pre">Wallet check</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[360px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[normal] not-italic relative shrink-0 text-[15px] text-[rgba(5,15,25,0.4)] w-full">
        <p className="mb-0">To continue, please select the desired</p>
        <p>network</p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="box-border content-stretch flex flex-col items-start max-w-[360px] pb-[20px] pt-[6px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container1 />
    </div>
  );
}

function Usdt() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="USDT">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgUsdt} />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black text-nowrap">
        <p className="leading-[24px] whitespace-pre">Tron Network</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(5,15,25,0.4)] text-nowrap">
        <p className="leading-[20px] whitespace-pre">TRC-20</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container2 />
      <Container3 />
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(5,15,25,0.08)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center px-[17px] py-[13px] relative w-full">
          <Usdt />
          <Container4 />
        </div>
      </div>
    </div>
  );
}

function Usdt1() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="USDT">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgUsdt1} />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black text-nowrap">
        <p className="leading-[24px] whitespace-pre">Ethereum Network</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(5,15,25,0.4)] text-nowrap">
        <p className="leading-[20px] whitespace-pre">ERC-20</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container5 />
      <Container6 />
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-white max-h-[70px] relative rounded-[16px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(5,15,25,0.08)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center max-h-inherit size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center max-h-inherit px-[17px] py-[13px] relative w-full">
          <Usdt1 />
          <Container7 />
        </div>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="box-border content-stretch flex flex-col items-start max-h-[80px] pb-0 pt-[10px] px-0 relative shrink-0 w-full" data-name="Margin">
      <BackgroundBorder1 />
    </div>
  );
}

function Usdt2() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="USDT">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgUsdt2} />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black text-nowrap">
        <p className="leading-[24px] whitespace-pre">BSC Network</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(5,15,25,0.4)] text-nowrap">
        <p className="leading-[20px] whitespace-pre">BEP-20</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container8 />
      <Container9 />
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-white max-h-[70px] relative rounded-[16px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(5,15,25,0.08)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center max-h-inherit size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center max-h-inherit px-[17px] py-[13px] relative w-full">
          <Usdt2 />
          <Container10 />
        </div>
      </div>
    </div>
  );
}

function Margin2() {
  return (
    <div className="box-border content-stretch flex flex-col items-start max-h-[80px] pb-0 pt-[10px] px-0 relative shrink-0 w-full" data-name="Margin">
      <BackgroundBorder2 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#0057ff] h-[48px] opacity-25 relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex h-[48px] items-center justify-center pb-[14.5px] pt-[13.5px] px-[10px] relative w-full">
          <div className="basis-0 flex flex-col font-['Arial:Bold',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[18px] text-center text-white">
            <p className="leading-[normal]">Continue</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ButtonMargin() {
  return (
    <div className="box-border content-stretch flex flex-col h-[72px] items-end pb-0 pt-[24px] px-0 relative shrink-0 w-full" data-name="Button:margin">
      <Button />
    </div>
  );
}

function BackgroundBorder3() {
  return (
    <div className="bg-white min-h-[474px] relative rounded-[20px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(5,15,25,0.08)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="min-h-inherit size-full">
        <div className="box-border content-stretch flex flex-col items-start min-h-inherit p-[21px] relative w-full">
          <Container />
          <Margin />
          <BackgroundBorder />
          <Margin1 />
          <Margin2 />
          <ButtonMargin />
        </div>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="max-w-[534px] relative shrink-0 w-full" data-name="Container">
      <div className="max-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col items-start max-w-inherit pb-[192px] pt-[40px] px-[15px] relative w-full">
          <BackgroundBorder3 />
        </div>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start min-h-[780px] relative shrink-0 w-full" data-name="Container">
      <Header />
      <Container11 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(5,15,25,0.4)] text-center w-full">
        <p className="leading-[normal]">© 2025 AML Bot. All rights reserved.</p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Footer">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start px-[15px] py-[22px] relative w-full">
          <Container13 />
        </div>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-0" data-name="Container">
      <Container12 />
      <Footer />
    </div>
  );
}

function Alertdialog() {
  return <div className="bg-[rgba(0,0,0,0.3)] h-[780px] opacity-0 shrink-0 sticky top-0 w-[390px]" data-name="Alertdialog" />;
}

function WcmModal() {
  return (
    <div className="absolute box-border content-stretch flex items-start left-0 pb-[64px] pt-0 px-0 right-0 top-0" data-name="wcm-modal">
      <Alertdialog />
    </div>
  );
}

export default function Component390WDefault() {
  return (
    <div className="relative size-full" data-name="390w default" style={{ backgroundImage: "linear-gradient(90deg, rgb(250, 251, 252) 0%, rgb(250, 251, 252) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <Container14 />
      <WcmModal />
    </div>
  );
}