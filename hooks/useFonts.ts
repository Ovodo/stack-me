import { Jim_Nightshade, Poppins, Jacques_Francois } from "next/font/google";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });
const Jim = Jim_Nightshade({ weight: "400", subsets: ["latin"] });
const agba = Jacques_Francois({ weight: "400", subsets: ["latin"] });

const useFonts = () => {
  return { Jim, poppins, agba };
};

export default useFonts;
