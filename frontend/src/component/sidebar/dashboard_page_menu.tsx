import classNames from "classnames";
import type { ReactNode } from "react";

import styles from "./sidebar.module.css";

interface Param {
  text: string;
  is_selected: boolean;
  handleOnClick: () => void;
  icon: ReactNode;
}

function DashboardPageMenu({ text, is_selected, handleOnClick, icon }: Param) {
  const wrapperClass = classNames(styles.text_menu_wrap, {
    [styles.menu_selected]: is_selected,
  });

  return (
    <div>
      <div className={wrapperClass} onClick={handleOnClick}>
        {icon}
        <p className={styles.text_menu}>{text}</p>
      </div>
    </div>
  );
}

export default DashboardPageMenu;