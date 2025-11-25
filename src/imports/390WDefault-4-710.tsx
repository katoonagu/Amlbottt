import svgPaths from "./svg-snfg2a3vdu";
import imgTron from "figma:asset/3f415cd75e8a755a032ae16a3406c41dcc2d667a.png";
import imgTrustPng from "figma:asset/3b26afbbdb37dd8d6d80ef072c64f6bb1cb62f6e.png";
import imgMetamaskPng from "figma:asset/95cfcdc3aa4cbdf3af7a2d6dd2914b3db8ca4527.png";
import { imgGroup, imgGroup1 } from "./svg-10z05";

function LogoBeLdo7OzSvg() {
  return (
    <div className="h-[32px] relative shrink-0 w-[134px]" data-name="logo-BeLdo7OZ.svg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 134 32">
        <g id="logo-BeLdo7OZ.svg">
          <g filter="url(#filter0_i_4_714)" id="Group">
            <path d={svgPaths.p2d4ee280} fill="var(--fill-0, #0075FF)" id="Vector" />
          </g>
          <path d={svgPaths.p244271f0} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p2a1a0300} fill="var(--fill-0, #050F19)" id="Vector_3" />
          <path d={svgPaths.pbf78900} fill="var(--fill-0, #050F19)" id="Vector_4" />
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="36" id="filter0_i_4_714" width="32" x="0.5" y="0">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="3" />
            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.35 0" />
            <feBlend in2="shape" mode="normal" result="effect1_innerShadow_4_714" />
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
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#0075ff] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Step 2</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start justify-between relative shrink-0 w-full" data-name="Container">
      <OverlayBorder />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#050f19] text-[24px] text-nowrap">
        <p className="leading-[32px] whitespace-pre">Check wallet</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[360px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[normal] not-italic relative shrink-0 text-[16px] text-[rgba(5,15,25,0.4)] w-full">
        <p className="mb-0">To continue, select and connect your</p>
        <p>wallet</p>
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

function Tron() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="tron">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgTron} />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black text-nowrap">
        <p className="leading-[24px] whitespace-pre">Ethereum Network</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(5,15,25,0.4)] text-nowrap">
        <p className="leading-[20px] whitespace-pre">Selected network</p>
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

function OverlayBorder1() {
  return (
    <div className="bg-[rgba(5,15,25,0.03)] relative rounded-[16px] shrink-0 w-full" data-name="Overlay+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(5,15,25,0.08)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center px-[17px] py-[13px] relative w-full">
          <Tron />
          <Container4 />
        </div>
      </div>
    </div>
  );
}

function WalletconnectSvg() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="walletconnect.svg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g clipPath="url(#clip0_4_267)" id="walletconnect.svg">
          <path d={svgPaths.p29cd0740} fill="var(--fill-0, #E7EEFC)" id="Vector" />
          <path d={svgPaths.p3e591cf0} fill="var(--fill-0, #3B99FC)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_4_267">
            <rect fill="white" height="40" width="40" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function WalletconnectSvgFill() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[40px]" data-name="walletconnect.svg fill">
      <WalletconnectSvg />
    </div>
  );
}

function WalletconnectSvg1() {
  return (
    <div className="aspect-[40/40] content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="walletconnect.svg">
      <WalletconnectSvgFill />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Arial:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black text-center text-nowrap">
        <p className="leading-[24px] whitespace-pre">Check Wallet</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container5 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(5,15,25,0.08)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center px-[17px] py-[13px] relative w-full">
          <WalletconnectSvg1 />
          <Container6 />
        </div>
      </div>
    </div>
  );
}

function TrustPng() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="trust.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgTrustPng} />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Arial:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black text-center text-nowrap">
        <p className="leading-[24px] whitespace-pre">Trust Wallet</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container7 />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(5,15,25,0.08)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center px-[17px] py-[13px] relative w-full">
          <TrustPng />
          <Container8 />
        </div>
      </div>
    </div>
  );
}

function MetamaskPng() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="metamask.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgMetamaskPng} />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Arial:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black text-center text-nowrap">
        <p className="leading-[24px] whitespace-pre">Metamask</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container9 />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(5,15,25,0.08)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center px-[17px] py-[13px] relative w-full">
          <MetamaskPng />
          <Container10 />
        </div>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Button />
      <Button1 />
      <Button2 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[24px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container11 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-0 relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#f04438] text-[16px] text-center w-full">
        <p className="leading-[normal]">error</p>
      </div>
    </div>
  );
}

function Margin2() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[24px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container12 />
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#0075ff] h-[48px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex h-[48px] items-center justify-center pb-[14.5px] pt-[13.5px] px-[10px] relative w-full">
          <div className="basis-0 flex flex-col font-['Arial:Bold',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[18px] text-center text-white">
            <p className="leading-[normal]">Back</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ButtonMargin() {
  return (
    <div className="box-border content-stretch flex flex-col h-[72px] items-end pb-0 pt-[24px] px-0 relative shrink-0 w-full" data-name="Button:margin">
      <Button3 />
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-white min-h-[474px] relative rounded-[20px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(5,15,25,0.08)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="min-h-inherit size-full">
        <div className="box-border content-stretch flex flex-col items-start min-h-inherit p-[21px] relative w-full">
          <Container />
          <Margin />
          <OverlayBorder1 />
          <Margin1 />
          <Margin2 />
          <ButtonMargin />
        </div>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="max-w-[534px] relative shrink-0 w-full" data-name="Container">
      <div className="max-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col items-start max-w-inherit pb-[68px] pt-[40px] px-[15px] relative w-full">
          <BackgroundBorder />
        </div>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start min-h-[780px] relative shrink-0 w-full" data-name="Container">
      <Header />
      <Container13 />
    </div>
  );
}

function Container15() {
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
          <Container15 />
        </div>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-0" data-name="Container">
      <Container14 />
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

function Group() {
  return (
    <div className="absolute inset-[2.15%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 31">
        <g id="Group">
          <path d={svgPaths.p1cf90f00} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.p27da90b0} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[2.15%]" data-name="Group">
      <Group />
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="SVG">
      <Group1 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#01091b] text-[18px] text-nowrap tracking-[0.18px]">
        <p className="leading-[normal] whitespace-pre">Injected Wallet</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0" data-name="Container">
      <Svg />
      <Container17 />
    </div>
  );
}

function Container19() {
  return (
    <div className="relative rounded-[24px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between p-[20px] relative w-full">
          <Container18 />
          <div className="bg-white relative rounded-[50px] shrink-0 size-[20px]" data-name="Input">
            <div aria-hidden="true" className="absolute border border-[#767676] border-solid inset-0 pointer-events-none rounded-[50px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute bottom-[3.84%] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-1.229px] mask-size-[32px_32px] right-0 top-[3.84%]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 30">
        <g id="Group">
          <path d={svgPaths.p3eceb000} fill="var(--fill-0, #E27525)" id="Vector" />
          <path d={svgPaths.p64ad500} fill="var(--fill-0, #E27525)" id="Vector_2" />
          <path d={svgPaths.pa000d00} fill="var(--fill-0, #E27525)" id="Vector_3" />
          <path d={svgPaths.p16d9dc00} fill="var(--fill-0, #E27525)" id="Vector_4" />
          <path d={svgPaths.pecd800} fill="var(--fill-0, #E27525)" id="Vector_5" />
          <path d={svgPaths.p14837300} fill="var(--fill-0, #E27525)" id="Vector_6" />
          <path d={svgPaths.p23c43f10} fill="var(--fill-0, #D5BFB2)" id="Vector_7" />
          <path d={svgPaths.pdcea00} fill="var(--fill-0, #D5BFB2)" id="Vector_8" />
          <path d={svgPaths.p36ae4b00} fill="var(--fill-0, #233447)" id="Vector_9" />
          <path d={svgPaths.p3b1c3f00} fill="var(--fill-0, #233447)" id="Vector_10" />
          <path d={svgPaths.pa350400} fill="var(--fill-0, #CC6228)" id="Vector_11" />
          <path d={svgPaths.p98b9680} fill="var(--fill-0, #CC6228)" id="Vector_12" />
          <path d={svgPaths.p1b4f6b80} fill="var(--fill-0, #E27525)" id="Vector_13" />
          <path d={svgPaths.p26410800} fill="var(--fill-0, #E27525)" id="Vector_14" />
          <path d={svgPaths.p163f000} fill="var(--fill-0, #F5841F)" id="Vector_15" />
          <path d={svgPaths.p17813400} fill="var(--fill-0, #F5841F)" id="Vector_16" />
          <path d={svgPaths.p3ff87000} fill="var(--fill-0, #C0AC9D)" id="Vector_17" />
          <path d={svgPaths.p35a1bdf0} fill="var(--fill-0, #C0AC9D)" id="Vector_18" />
          <path d={svgPaths.p2fadd200} fill="var(--fill-0, #161616)" id="Vector_19" />
          <path d={svgPaths.p26019c00} fill="var(--fill-0, #161616)" id="Vector_20" />
          <path d={svgPaths.p2e681ed0} fill="var(--fill-0, #763E1A)" id="Vector_21" />
          <path d={svgPaths.p175850f0} fill="var(--fill-0, #763E1A)" id="Vector_22" />
          <path d={svgPaths.p2f18f880} fill="var(--fill-0, #F5841F)" id="Vector_23" />
          <path d={svgPaths.p31a7a380} fill="var(--fill-0, #F5841F)" id="Vector_24" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group2 />
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="SVG">
      <ClipPathGroup />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#01091b] text-[18px] text-nowrap tracking-[0.18px]">
        <p className="leading-[normal] whitespace-pre">MetaMask</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0" data-name="Container">
      <Svg1 />
      <Container20 />
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white relative rounded-[50px] shrink-0 size-[20px]" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#0075ff] border-solid inset-0 pointer-events-none rounded-[50px]" />
      <div className="absolute bg-[#0075ff] left-[4px] rounded-[50px] size-[12px] top-1/2 translate-y-[-50%]" data-name="Input:checked" />
    </div>
  );
}

function Container22() {
  return (
    <div className="relative rounded-[24px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between p-[20px] relative w-full">
          <Container21 />
          <Input />
        </div>
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[32px_32px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Group">
          <path d={svgPaths.p2e3fd300} fill="var(--fill-0, #0075FF)" id="Vector" />
          <path d={svgPaths.p2613bc80} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup1() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group3 />
    </div>
  );
}

function Svg2() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="SVG">
      <ClipPathGroup1 />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#01091b] text-[18px] text-nowrap tracking-[0.18px]">
        <p className="leading-[normal] whitespace-pre">Coinbase</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0" data-name="Container">
      <Svg2 />
      <Container23 />
    </div>
  );
}

function Container25() {
  return (
    <div className="relative rounded-[24px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between p-[20px] relative w-full">
          <Container24 />
          <div className="bg-white relative rounded-[50px] shrink-0 size-[20px]" data-name="Input">
            <div aria-hidden="true" className="absolute border border-[#767676] border-solid inset-0 pointer-events-none rounded-[50px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute inset-[0.06%_0.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.024px_-0.02px] mask-size-[32px_32px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Group">
          <path d={svgPaths.p1dc92480} fill="var(--fill-0, #F0B90B)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup2() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group4 />
    </div>
  );
}

function Svg3() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="SVG">
      <ClipPathGroup2 />
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#01091b] text-[18px] text-nowrap tracking-[0.18px]">
        <p className="leading-[normal] whitespace-pre">Binance Wallet</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0" data-name="Container">
      <Svg3 />
      <Container26 />
    </div>
  );
}

function Container28() {
  return (
    <div className="relative rounded-[24px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between p-[20px] relative w-full">
          <Container27 />
          <div className="bg-white relative rounded-[50px] shrink-0 size-[20px]" data-name="Input">
            <div aria-hidden="true" className="absolute border border-[#767676] border-solid inset-0 pointer-events-none rounded-[50px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[32px_32px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Group">
          <path d={svgPaths.p3cc06c00} fill="var(--fill-0, #F1F7FE)" id="Vector" />
          <path d={svgPaths.p6b86300} id="Vector_2" stroke="var(--stroke-0, #3375BB)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2.56" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup3() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group5 />
    </div>
  );
}

function Svg4() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="SVG">
      <ClipPathGroup3 />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#01091b] text-[18px] text-nowrap tracking-[0.18px]">
        <p className="leading-[normal] whitespace-pre">Trust Wallet</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0" data-name="Container">
      <Svg4 />
      <Container29 />
    </div>
  );
}

function Container31() {
  return (
    <div className="relative rounded-[24px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between p-[20px] relative w-full">
          <Container30 />
          <div className="bg-white relative rounded-[50px] shrink-0 size-[20px]" data-name="Input">
            <div aria-hidden="true" className="absolute border border-[#767676] border-solid inset-0 pointer-events-none rounded-[50px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Container19 />
      <Container22 />
      <Container25 />
      <Container28 />
      <Container31 />
    </div>
  );
}

function Background() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-center left-1/2 top-[-10px] translate-x-[-50%] w-[46px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#939bac] text-[16px] text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">OR</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="bg-[#ccd1db] h-px shrink-0 w-full" data-name="Horizontal Divider" />
      <Background />
    </div>
  );
}

function Margin3() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[5px] pt-0 px-0 relative shrink-0 w-full" data-name="Margin">
      <Container33 />
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute bottom-[19.34%] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0.002px] mask-size-[32px_19.616px] right-[-0.03%] top-[19.34%]" data-name="Group" style={{ maskImage: `url('${imgGroup1}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 20">
        <g id="Group">
          <path d={svgPaths.pede6200} fill="var(--fill-0, #3B99FC)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup4() {
  return (
    <div className="absolute bottom-[19.35%] contents left-0 right-0 top-[19.35%]" data-name="Clip path group">
      <Group6 />
    </div>
  );
}

function Svg5() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="SVG">
      <ClipPathGroup4 />
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#01091b] text-[18px] text-nowrap tracking-[0.18px]">
        <p className="leading-[normal] whitespace-pre">WalletConnect</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0" data-name="Container">
      <Svg5 />
      <Container34 />
    </div>
  );
}

function Container36() {
  return (
    <div className="relative rounded-[24px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between p-[20px] relative w-full">
          <Container35 />
          <div className="bg-white relative rounded-[50px] shrink-0 size-[20px]" data-name="Input">
            <div aria-hidden="true" className="absolute border border-[#767676] border-solid inset-0 pointer-events-none rounded-[50px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Margin3 />
      <Container36 />
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full" data-name="Container">
      <Container32 />
      <Container37 />
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#01091b] text-[32px] text-nowrap tracking-[0.32px]">
        <p className="leading-[normal] whitespace-pre">Connect wallet</p>
      </div>
      <Container38 />
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#0075ff] box-border content-stretch flex items-center justify-center px-[92.28px] py-[20px] relative rounded-[16px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white tracking-[0.16px]">
        <p className="leading-[normal] whitespace-pre">Connect Wallet</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Button4 />
    </div>
  );
}

function Background1() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[40px] items-start left-[10px] max-w-[560px] p-[32px] rounded-[32px] top-[39.5px] w-[370px]" data-name="Background">
      <Container39 />
      <Container40 />
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(8,5,23,0.5)] h-[780px] pointer-events-auto sticky top-0 w-[390px]" data-name="Overlay">
      <Background1 />
    </div>
  );
}

export default function Component390WDefault() {
  return (
    <div className="relative size-full" data-name="390w default" style={{ backgroundImage: "linear-gradient(90deg, rgb(250, 251, 252) 0%, rgb(250, 251, 252) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <Container16 />
      <WcmModal />
      <div className="absolute bottom-0 left-0 pointer-events-none top-0">
        <Overlay />
      </div>
    </div>
  );
}