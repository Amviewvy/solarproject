// usis_buttonConfig.ts

export interface ButtonConfig {
  id: number;
  top: string;
  left: string;
  label: string;
  type?: "single" | "multi";
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
      top: "40%",
      left: "30%",
      label: "A",
      type: "single"
    },
    {
      id: 4,
      top: "45%",
      left: "50%",
      label: "B",
      type: "single"
    },
    {
      id: 3,
      top: "30%",
      left: "60%",
      label: "C",
      type: "single"
    },
  ],

  orangeButton: {
    id: 1000,
    top: "15%",
    left: "50%",
    label: "O",
    type: "single"
  },

  zoomModeButtons: [
    {
      id: 99,
      meterIds: [10, 11],
      top: "58%",
      left: "38%",
      label: "GROUP 1",
      type: "multi"
    },
    {
      id: 100,
      meterIds: [5, 6],
      top: "32%",
      left: "53%",
      label: "GROUP 2",
      type: "multi"
    },
    {
      id: 9,
      top: "46%",
      left: "59%",
      label: "F",
      type: "single"
    },
    {
      id: 7,
      top: "32%",
      left: "65%",
      label: "G",
      type: "single"
    },
    {
      id: 8,
      top: "55%",
      left: "68%",
      label: "o",
      type: "single"
    },
  ],
};