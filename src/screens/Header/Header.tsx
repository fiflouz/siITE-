import React from "react";

export const Header = (): JSX.Element => {
  const navigationItems = [
    { id: 1, label: "configurateur", rightPosition: "986px" },
    { id: 2, label: "comparateur", rightPosition: "740px" },
    { id: 3, label: "fonctionnalité", rightPosition: "496px" },
  ];

  return (
    <header className="w-[1446px] h-[86px] flex" data-model-id="2005:43">
      <div className="flex flex-1 w-[1455px] relative h-[93.82px] items-start gap-2.5 pl-0 pr-60 pt-0 pb-2.5 rounded-[15px] overflow-hidden backdrop-blur-[2.0px] backdrop-brightness-[100.0%] backdrop-saturate-[100.0%] [-webkit-backdrop-filter:blur(2.0px)_brightness(100.0%)_saturate(100.0%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.13),inset_-1px_0_1px_rgba(0,0,0,0.11)] bg-[linear-gradient(90deg,rgba(24,18,83,0.2)_0%,rgba(30,22,112,0.2)_100%)]">
        <div className="relative w-[100px] h-[100px] mb-[-16.18px] bg-[#d9d9d9] rounded-[50px]" />

        {navigationItems.map((item) => (
          <nav
            key={item.id}
            className="absolute top-[26px] w-[272px] [font-family:'Inter',Helvetica] font-semibold text-white text-[32px] tracking-[0] leading-[normal]"
            style={{ right: item.rightPosition }}
          >
            {item.label}
          </nav>
        ))}
      </div>
    </header>
  );
};
