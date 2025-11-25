import svgPaths from "../imports/svg-pruaafdf23";

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

export function Header() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex items-center justify-center px-[15px] py-[20px] relative w-full">
          <div className="content-stretch flex items-center relative shrink-0">
            <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0">
              <div className="content-stretch flex flex-col h-[32px] items-center justify-center overflow-clip relative shrink-0 w-[134px]">
                <LogoBeLdo7OzSvg />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
