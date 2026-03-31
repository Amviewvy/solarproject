import React, { useState } from 'react';
import styles from '../../styles/plc_inverter_main_1.module.css';
import PowerFlowDiagram from './PowerFlowDiagram';
import LogBox from './plc_inverter_log';
import InverterControl from './InverterControl';

type Props = {
  requireLoginThen: (action: () => void) => void;
};

const GridLayout: React.FC<Props> = ({ requireLoginThen }) => {
  const [mode, setMode] = useState<'inverter' | 'control'>('inverter');

  return (
    <div>
      <div className={styles.parent}>
        <div className={styles.div3}>
          <div className={styles.filterSwitch}>
            {/* Option: Inverter */}
            <input
              type="radio"
              id="inverter"
              name="modeOptions"
              checked={mode === 'inverter'}
              onChange={() => setMode('inverter')}
              className={styles.inputHide}
            />
            <label className={styles.option} htmlFor="inverter">
              Control
            </label>

            {/* Option: Control */}
            <input
              type="radio"
              id="control"
              name="modeOptions"
              checked={mode === 'control'}
              onChange={() => setMode('control')}
              className={styles.inputHide}
            />
            <label className={styles.option} htmlFor="control">
              Inverter
            </label>

            {/* แถบพื้นหลังที่เลื่อนไปมา */}
            <span
              className={`${styles.background} ${mode === 'control' ? styles.isControl : ''}`}
            ></span>
          </div>
        </div>
        
        <div className={styles.div1}>
          {mode === 'inverter' ? (
            <PowerFlowDiagram />
          ) : (
            <InverterControl requireLoginThen={requireLoginThen} />
          )}
        </div>
        {mode === 'inverter' && (
          <div className={styles.div2}>
            <LogBox />
          </div>
        )}
      </div>
    </div>
  );
};

export default GridLayout;