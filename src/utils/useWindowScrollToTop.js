import { useEffect } from "react";

const useWindowScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};

export default useWindowScrollToTop;


// Función para capitalizar cada palabra
function capitalizeWords(str) {
  return str.replace(/\w\S*/g, (w) =>
    w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
  );
}