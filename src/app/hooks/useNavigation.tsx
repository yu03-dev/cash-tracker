import { useCallback, useEffect, useState } from "react";

export const useNavigation = () => {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const handleNav = useCallback(() => setOpenNav((prev) => !prev), []);

  return { openNav, handleNav };
};
