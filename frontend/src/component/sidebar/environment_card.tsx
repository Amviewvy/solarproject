import classNames from "classnames";
import type React from "react";

import styles from "./sidebar.module.css";

interface Param {
  icon_src: string;
  alt_msg: string;
  name: string;
  value: string | number;
  unit?: string;
  width: number;
  was_warning: boolean;
}

const EnvironmentCard: React.FC<Param> = ({
  icon_src,
  alt_msg,
  name,
  value,
  unit,
  width,
  was_warning,
}) => {
  const wrapperClass = classNames(styles.temp_wrap, {
    [styles.env_warning]: was_warning,
  });

  const valueClass = classNames(styles.value_env, {
    [styles.env_value_warning]: was_warning,
  });

  return (
    <div className={wrapperClass}>
      {/* Icon */}
      <div className={styles.temp_icon_wrap}>
        <img src={icon_src} alt={alt_msg} width={width} />
      </div>
      {/* Text */}
      <div>
        <div>
          <p className={styles.name_env}>{name}</p>
        </div>
        <div>
          <p className={valueClass}>
            {value}
            {unit}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentCard;
