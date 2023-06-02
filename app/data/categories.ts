import { FaUmbrellaBeach } from "@react-icons/all-files/fa/FaUmbrellaBeach";
import { GiCastle } from "@react-icons/all-files/gi/GiCastle";
import { FaSwimmingPool } from "@react-icons/all-files/fa/FaSwimmingPool";
import { GiPalmTree } from "@react-icons/all-files/gi/GiPalmTree";
import { GiCampCookingPot } from "@react-icons/all-files/gi/GiCampCookingPot";
import { RiKey2Fill } from "@react-icons/all-files/ri/RiKey2Fill";
import { GiElvenCastle } from "@react-icons/all-files/gi/GiElvenCastle";
import { GiFarmTractor } from "@react-icons/all-files/gi/GiFarmTractor";
import { GiModernCity } from "@react-icons/all-files/gi/GiModernCity";
import { GiIsland } from "@react-icons/all-files/gi/GiIsland";
import { GiDesert } from "@react-icons/all-files/gi/GiDesert";
import { GiCaveEntrance } from "@react-icons/all-files/gi/GiCaveEntrance";
import { GiWhiteTower } from "@react-icons/all-files/gi/GiWhiteTower";
import { GiControlTower } from "@react-icons/all-files/gi/GiControlTower";

export const categories = [
  {
    label: "Apartment",
    description:
      "A self-contained unit in a multi-unit building or apartment complex.",
    icon: GiControlTower,
  },
  {
    label: "Towers",
    description:
      "Tall and majestic structures with multiple floors and breathtaking views.",
    icon: GiWhiteTower,
  },
  {
    label: "Beach",
    description:
      "Stunning beachfront properties for a relaxing and picturesque getaway.",
    icon: FaUmbrellaBeach,
  },
  {
    label: "Modern",
    description:
      "Contemporary houses with sleek designs and modern amenities.",
    icon: GiModernCity,
  },
  {
    label: "Castles",
    description:
      "Impressive and grand residences that resemble medieval fortifications.",
    icon: GiCastle,
  },
  {
    label: "Tropical",
    description:
      "Lush and exotic retreats surrounded by palm trees and tropical landscapes.",
    icon: GiPalmTree,
  },
  {
    label: "Villa",
    description:
      "Luxurious and opulent houses found in upscale resorts or exclusive areas.",
    icon: GiElvenCastle,
  },
  {
    label: "Pools",
    description:
      "Charming houses with refreshing pools, perfect for relaxation and recreation.",
    icon: FaSwimmingPool,
  },
  {
    label: "Exotic",
    description:
      "Unique and extraordinary dwellings set in breathtaking, far-flung locations.",
    icon: GiIsland,
  },
  {
    label: "Farmhouse",
    description:
      "Quaint and cozy homes situated on farms or in picturesque rural areas.",
    icon: GiFarmTractor,
  },
  {
    label: "Camping",
    description:
      "Rustic and adventurous accommodations for an immersive outdoor experience.",
    icon: GiCampCookingPot,
  },
  {
    label: "New",
    description:
      "Brand new and modern houses with the latest architectural styles and features.",
    icon: RiKey2Fill,
  },
  {
    label: "Desert",
    description:
      "Dwellings nestled amidst arid and awe-inspiring desert landscapes.",
    icon: GiDesert,
  },
  {
    label: "Caves",
    description:
      "Unique and extraordinary homes carved into natural cave formations.",
    icon: GiCaveEntrance,
  },
];
export const getCategoryByLabel = (label: string) => {
  return categories.find((category) => category.label === label);
};
