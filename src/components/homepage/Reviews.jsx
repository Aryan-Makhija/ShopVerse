import { AnimatedTestimonials } from "../ui/animated-testimonials";
export function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote: "I bought the XtremePro Wireless Earbuds, and they exceeded my expectations! The sound is crisp, with deep bass and clear highs.The battery easily lasts over 8 hours, and the charging case is super compact.The Bluetooth connection is stable, and pairing was effortless.Definitely worth the price — I’ll be getting another pair for my husband!",
      name: "Sarah Chen",
      designation: "",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The Cotton Crew Neck Tee looks great and feels soft, but the medium size fit more like a small. The color is true to the pictures, and the fabric quality is good, but I recommend ordering one size up. Delivery was on time, and packaging was neat.",
      name: "Michael Rodriguez",
      designation: "",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "I really wanted to love this non-stick frying pan, but after just two weeks of light use, the coating started to peel. It cooks evenly, but cleaning is difficult now. Customer service did offer a replacement, but I expected better quality for the price.",
      name: "Emily Watson",
      designation: "",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The HydraGlow Daily Face Cream is amazing! It’s lightweight, absorbs quickly, and keeps my skin soft all day. No greasy feeling, and it works well under makeup. I’ve noticed a real improvement in my skin texture after two weeks. Highly recommend!.",
      name: "James Kim",
      designation: "",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The Smart Fitness Tracker works perfectly — accurate step counting, heart rate monitor, and battery lasts several days. However, shipping took longer than expected (10 days instead of 5). Overall, great value for money, just wish the delivery was faster..",
      name: "Lisa Thompson",
      designation: "",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
