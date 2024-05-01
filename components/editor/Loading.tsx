import Image from "next/image";
import styles from "./Loading.module.css";

export function Loading() {
  return (
    <div className={styles.loading}>
      <Image src="https://liveblocks.io/loading.svg" fill alt="Loading" />
    </div>
  );
}
