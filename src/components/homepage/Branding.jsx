
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';
import LogoLoop from '../LogoLoop';

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

// Alternative with image sources
const imageLogos = [
  { src: "https://toppng.com/uploads/preview/logo-png-images-free-nike-logo-transparent-11562934947mhvvjcktas.png", alt: "Company 1", href: "https://company1.com" },
  { src: "https://www.citypng.com/public/uploads/preview/adidas-black-logo-701751694777212bstvn6c2g9.png", alt: "Company 2", href: "https://company2.com" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9ZD7hF4YDRQORA83DWSIzixViEyoPLyhgBQ&s", alt: "Company 3", href: "https://company3.com" },
  { src: "https://download.logo.wine/logo/Zara_(retailer)/Zara_(retailer)-Logo.wine.png", alt: "Company 3", href: "https://company3.com" },
//   { src: "https://download.logo.wihttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9OD3Bq9d19qcSfL_mTPj4BOC_W7WzHQ73pQ&s", alt: "Company 3", href: "https://company3.com" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgWS-RsyrkfIVwCyRB7L8SECa40zRl0VkJMQ&s", alt: "Company 3", href: "https://company3.com" },
  { src: "https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png", alt: "Company 3", href: "https://company3.com" },
  { src: "https://www.shutterstock.com/image-vector/samsung-company-logo-south-korean-260nw-2394493913.jpg", alt: "Company 3", href: "https://company3.com" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGTcuc324di3XZSSWBok1a_vcy4yTQ7ZMMcw&s", alt: "Company 3", href: "https://company3.com" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/8/8d/LG_logo_%282014%29.svg", alt: "Company 3", href: "https://company3.com" },
 
];

export function Branding() {
  return (
    <div style={{ height: '200px', position: 'relative', overflow: 'hidden'}}>
      <LogoLoop
        logos={imageLogos}
        speed={100}
        direction="left"
        logoHeight={98}
        gap={40}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="#ffffff"
        ariaLabel="Technology partners"
      />
    </div>
  );
}