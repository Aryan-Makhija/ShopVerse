

import LogoLoop from '../LogoLoop';

import {
  SiNike,
  SiAdidas,
  SiApple,
  SiSamsung,
  SiSony,
  SiPuma,
  SiLg,

  SiXiaomi,
  SiZara,


} from "react-icons/si";


export const techlogos = [
  {
    node: <SiNike className="text-black" />,
    title: "Nike",
    href: "https://www.nike.com",
  },
  {
    node: <SiAdidas className="text-black" />,
    title: "Adidas",
    href: "https://www.adidas.com",
  },
  {
    node: <SiApple className="text-gray-800" />,
    title: "Apple",
    href: "https://www.apple.com",
  },
  {
    node: <SiSamsung className="text-blue-700" />,
    title: "Samsung",
    href: "https://www.samsung.com",
  },
  {
    node: <SiSony className="text-black" />,
    title: "Sony",
    href: "https://www.sony.com",
  },
  {
    node: <SiPuma className="text-black" />,
    title: "Puma",
    href: "https://www.puma.com",
  },
  {
    node: <SiLg className="text-pink-600" />,
    title: "LG",
    href: "https://www.lg.com",
  },
  {
    node: <SiXiaomi className="text-orange-500" />,
    title: "Xiaomi",
    href: "https://www.mi.com",
  },
  {
    node: <SiZara className="text-black" />,
    title: "Zara",
    href: "https://www.zara.com",
  },
];





export function Branding() {
  return (
    <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
      <LogoLoop
        logos={techlogos}
        speed={100}
        direction="left"
        logoHeight={98}
        gap={70}
        pauseOnHover
        scaleOnHover
       
   
        ariaLabel="Technology partners"
      />
    </div>
  );
}