import React from "react";

export function useStickyState<T>(defaultValue:T, key:string):[T, React.Dispatch<T>] {
    const [value, setValue] = React.useState<T>(() => {
      const stickyValue = window.localStorage.getItem(key);
      return stickyValue !== null
        ? (JSON.parse(stickyValue) as T)
        : defaultValue;
    });
    return [value, setValue]
  }
  