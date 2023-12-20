import React from "react";
import styles from "@/app/styles/index.module.scss";

function Index() {
  const colors = ["red", "green", "blue", "yellow", "purple"];

  return (
    <div className={styles.container}>
      {colors.map((color, index) => (
        <div key={index} className={styles.div} style={{ backgroundColor: color }} />
      ))}
    </div>
  );
}

export default Index;