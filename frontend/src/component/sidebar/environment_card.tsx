import classNames from "classnames";
import type { ReactNode } from "react";
import styles from "./sidebar.module.css";

interface Param {
  icon_src: ReactNode;
  alt_msg: string;
  name: string;
  value: string | number;
  unit?: string;
  width: number;
  was_warning: boolean;
  isExpanded?: boolean;
  onToggle?: () => void;
}

const EnvironmentCard: React.FC<Param> = ({
  icon_src,
  name,
  value,
  unit,
  was_warning,
  isExpanded = false,
  onToggle,
}) => {
  const wrapperClass = classNames(styles.temp_wrap, {
    [styles.env_warning]: was_warning,
    [styles.env_expanded]: isExpanded,
  });

  const valueClass = classNames(styles.value_env, {
    [styles.env_value_warning]: was_warning,
    [styles.env_value_expanded]: isExpanded,
  });

  const nameClass = classNames(styles.name_env, {
    [styles.name_env_expanded]: isExpanded,
  });

  return (
    <div 
      className={wrapperClass}
      role="alert"
      aria-live={was_warning ? "assertive" : "polite"}
      onClick={onToggle}
    >
      {/* Icon */}
      <div className={styles.temp_icon_wrap}>
        <div className={styles.icon_wrap}>{icon_src}</div>
      </div>

      {/* Text Content */}
      <div>
        <div>
          <p className={nameClass}>{name}</p>
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