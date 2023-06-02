
'use clinet'
import { useState, useLayoutEffect } from "react";
import dynamic from "next/dynamic";

import useCountries from "@/app/hooks/useCountries";

import './ListingMap.scss'

const Map = dynamic(() => import("../../../components/Map"), { ssr: false });

interface ListingMapProps {
  locationValue: any;
  
}

const ListingMap: React.FC<ListingMapProps> = ({ locationValue }) => {
  const { getCountryByValue } = useCountries();
  const [isBig, setIsBig] = useState(false);
  const country = getCountryByValue(locationValue);
  const coordinates = country && country[0].latlng;

  useLayoutEffect(() => {
    const handleResize = () => {
      setIsBig(window.innerWidth > 700);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="listing-map">
      <div className="listing-map__location">
        <span className="listing-map__location-flag">{country && country[0].flag}</span>
        <span className="listing-map__location-country">{`${country && country[0].label}, ${
          country && country[0].region
        }`}</span>
      </div>
      {isBig && <Map big center={coordinates} />}
      {!isBig && <Map center={coordinates} />}
    </section>
  );
};

export default ListingMap;
