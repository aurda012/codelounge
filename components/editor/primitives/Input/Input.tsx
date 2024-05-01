import clsx from "clsx";
import { ComponentProps, forwardRef } from "react";
import styles from "./Input.module.css";

const Input = forwardRef<HTMLInputElement, ComponentProps<"input">>(
  function Input({ className, ...props }, ref) {
    return (
      <input ref={ref} className={clsx(className, styles.input)} {...props} />
    );
  }
);

Input.displayName = "Input";

export { Input };
