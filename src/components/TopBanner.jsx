import { useEffect, useState } from "react";
import { TruckIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

const banners = [
    { id: 1, text: "FREE AUS DELIVERY FOR ORDERS $90+", icon: <TruckIcon className="size-6"/> },
    { id: 2, text: "10% OFF YOUR NEXT ORDER*. JOIN NOW", icon: <ShoppingBagIcon className="size-6"/> },
];

const TopBanner = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrent((prev) => (prev + 1) % banners.length);
      }, 4000); // every 3s
      return () => clearInterval(timer);
    }, []);
  
    return (
      <div className="bg-primary py-2 text-center text-sm font-medium flex justify-center items-center gap-4 text-white">
        <span>{banners[current].icon}</span>
        <span>{banners[current].text}</span>
      </div>
    );
}

export default TopBanner