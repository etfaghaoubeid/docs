import React from "react";

export function useClickOutside(
  elRef: React.Ref<HTMLElement>,
  callback: (event: TouchEvent) => void
) {
  const callbackRef = React.useRef<(event: TouchEvent) => void>();
  callbackRef.current = callback;
  React.useEffect(() => {
    const handleCallbackClick = (event: TouchEvent) => {
      if (!elRef?.current?.contains(event?.target) && callbackRef?.current) {
        console.log("CLiCK");
        callbackRef?.current(event);
      }
    };
    document.addEventListener("click", handleCallbackClick, true);
    return () => {
      document.removeEventListener("click", handleCallbackClick, true);
    };
  }, [callbackRef, elRef]);
}
