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
      "A self-contained unit in a multi-unit building or apartment complex.",
    icon: GiWhiteTower,
  },

  {
    label: "Beach",
    description:
      "A standalone house designed for a single family or household.",
    icon: FaUmbrellaBeach,
  },
  {
    label: "Modern",
    description:
      "A multi-level house that shares walls with neighboring units.",
    icon: GiModernCity,
  },
  {
    label: "Castles",
    description: "A house divided into two separate living units.",
    icon: GiCastle,
  },
  {
    label: "Tropical",
    description: "A privately owned unit within a larger complex or building.",
    icon: GiPalmTree,
  },
  {
    label: "Villa",
    description:
      "A luxurious and spacious house typically located in a resort or upscale area.",
    icon: GiElvenCastle,
  },
  {
    label: "pools",
    description:
      "A small, cozy house, often located in a rural or scenic area.",
    icon: FaSwimmingPool,
  },
  {
    label: "Exotic",
    description:
      "A self-contained unit in a multi-unit building or apartment complex.",
    icon: GiIsland,
  },
  {
    label: "Farmhouse",
    description: "A house located on a farm or in a rural agricultural area.",
    icon: GiFarmTractor,
  },
  {
    label: "Camping",
    description: "A house located on a farm or in a rural agricultural area.",
    icon: GiCampCookingPot,
  },
  {
    label: "New",
    description: "A house located on a farm or in a rural agricultural area.",
    icon: RiKey2Fill,
  },
  {
    label: "Desert",
    description: "A house located on a farm or in a rural agricultural area.",
    icon: GiDesert,
  },
  {
    label: "Caves",
    description: "A house located on a farm or in a rural agricultural area.",
    icon: GiCaveEntrance,
  },
];

export const getCategoryByLabel = (label: string) => {
  return categories.find((category) => category.label === label);
};
