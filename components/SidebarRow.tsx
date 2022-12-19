import React, { SVGProps } from "react";

interface Props {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  onClick?: () => {};
}

const SidebarRow = ({ Icon, title, onClick }: Props) => {
  return (
    <div
      onClick={() => onClick?.()}
      className="group flex cursor-pointer max-w-fit items-center space-x-2 rounded-full px-4 py-3 transition-all duration-200 hover:bg-extralightgray"
    >
      <Icon className="h-6 w-6" />
      <p className="group-hover:text-twitter hidden md:inline-flex text-base font-light lg:text-xl">
        {title}
      </p>
    </div>
  );
};

export default SidebarRow;
