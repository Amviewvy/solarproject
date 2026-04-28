// usis_buttonConfig.ts

export interface ButtonConfig {
  id: number;
  location: string[];
  top: string;
  left: string;
  label: string;
  type?: 'single' | 'multi';
  meterIds?: number[]; // สำหรับปุ่มประเภท multi
}

export interface ButtonConfigs {
  greenButtons: ButtonConfig[];
  orangeButton: ButtonConfig;
  zoomModeButtons: ButtonConfig[];
}

export const buttonConfigs: ButtonConfigs = {
  greenButtons: [
    {
      id: 2,
      location: ['Air Conditioner'],
      top: '40%',
      left: '30%',
      label: 'A',
      type: 'single',
    },
    {
      id: 4,
      location: ['Coffee Shop'],
      top: '45%',
      left: '55%',
      label: 'B',
      type: 'single',
    },
    {
      id: 3,
      location: ['Sanitation System'],
      top: '30%',
      left: '65%',
      label: 'C',
      type: 'single',
    },
    {
      id: 6,
      location: ['Electric Control Room'],
      top: '15%',
      left: '58%',
      label: 'C',
      type: 'single',
    }
  ],

  orangeButton: {
    id: 1000,
    location: [''],
    top: '15%',
    left: '50%',
    label: 'O',
    type: 'single',
  },

  zoomModeButtons: [
    {
      id: 99,
      location: ['Solation grid-tied PV Protection', 'Solation AC Protection'],
      meterIds: [10, 11],
      top: '58%',
      left: '38%',
      label: 'GROUP 1',
      type: 'multi',
    },
    // {
    //   id: 100,
    //   location: ['Inverters Overall', 'Electric Control Room'],
    //   meterIds: [5, 6],
    //   top: '32%',
    //   left: '53%',
    //   label: 'GROUP 2',
    //   type: 'multi',
    // },
    {
      id: 5,
      location: ['Inverters Overall'],
      top: '32%',
      left: '53%',
      label: 'E',
      type: 'single',
    },
    {
      id: 9,
      location: ['Inverter 1.5kW'],
      top: '46%',
      left: '59%',
      label: 'F',
      type: 'single',
    },
    {
      id: 7,
      location: ['Inverters (Must+Goodwe)'],
      top: '32%',
      left: '65%',
      label: 'G',
      type: 'single',
    },
    {
      id: 8,
      location: ['Inverters (Must)'],
      top: '55%',
      left: '68%',
      label: 'o',
      type: 'single',
    },
  ],
};
