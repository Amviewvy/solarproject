"use client";
import React, { useState } from "react";
import styles from "./MeterComparison.module.css";
import { Checkbox } from "./../ui/checkbox";
import { Button } from "./../ui/button";
import { Label } from "./../ui/label";
import { RadioGroup, RadioGroupItem } from "./../ui/radio-group";

interface CompareGraphPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onCompare: (
    meters: string[],
    fields: string[],
    mode: "meter" | "data"
  ) => void;
}

const meterList = Array.from({ length: 11 }, (_, i) => `Meter ${i + 1}`);

const resultFields = [
  "Volt",
  "Current",
  "Power",
  "VA",
  "VAR",
  "PF",
  "Frequency",
  "Energy_Im",
  "Energy_Ex",
  "PowerSum",
  "PowerAve",
  "VA_SUM",
  "VA_AVE",
];

const CompareGraphPopup: React.FC<CompareGraphPopupProps> = ({
  isOpen,
  onClose,
  onCompare,
}) => {
  const [compareMode, setCompareMode] = useState<"meter" | "data">("meter");
  const [selectedMeters, setSelectedMeters] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);

  const toggleMeter = (meter: string) => {
    setSelectedMeters((prev) =>
      prev.includes(meter) ? prev.filter((m) => m !== meter) : [...prev, meter]
    );
  };

  const toggleField = (field: string) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  if (!isOpen) return null;

  const handleCompareClick = () => {
    onCompare(selectedMeters, selectedFields, compareMode);
    onClose();
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContainer}>
        <h2 className={styles.popupTitle}>Compare Graph Settings</h2>

        {/* เลือกโหมดการเปรียบเทียบ */}
        <div className={styles.popupSection}>
          <Label className={styles.sectionTitle}>Select Comparison Type</Label>
          <RadioGroup
            defaultValue="meter"
            onValueChange={(value: "meter" | "data") => setCompareMode(value)}
            className={styles.radioGroup}
          >
            <div className={styles.radioItem}>
              <RadioGroupItem value="meter" id="meter" />
              <Label htmlFor="meter">Compare between Meters</Label>
            </div>
            <div className={styles.radioItem}>
              <RadioGroupItem value="data" id="data" />
              <Label htmlFor="data">Compare between Data</Label>
            </div>
          </RadioGroup>
        </div>

        {/* โหมดเปรียบเทียบระหว่างมิเตอร์ */}
        {compareMode === "meter" && (
          <div className={styles.popupSection}>
            <Label className={styles.sectionTitle}>Select Meters</Label>
            <div className={styles.checkboxGrid}>
              {meterList.map((meter) => (
                <div key={meter} className={styles.checkboxItem}>
                  <Checkbox
                    id={meter}
                    checked={selectedMeters.includes(meter)}
                    onCheckedChange={() => toggleMeter(meter)}
                  />
                  <Label htmlFor={meter}>{meter}</Label>
                </div>
              ))}
            </div>

            <Label className={styles.sectionTitle}>Select Data Type</Label>
            <div className={styles.checkboxGrid}>
              {resultFields.map((field) => (
                <div key={field} className={styles.checkboxItem}>
                  <Checkbox
                    id={`field-${field}`}
                    checked={selectedFields.includes(field)}
                    onCheckedChange={() => toggleField(field)}
                  />
                  <Label htmlFor={`field-${field}`}>{field}</Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* โหมดเปรียบเทียบระหว่างข้อมูล */}
        {compareMode === "data" && (
          <div className={styles.popupSection}>
            <div>
              <Label className={styles.sectionTitle}>
                Select Data Fields to Compare
              </Label>
              <div className={styles.checkboxGrid}>
                {resultFields.map((field) => (
                  <div key={field} className={styles.checkboxItem}>
                    <Checkbox
                      id={field}
                      checked={selectedFields.includes(field)}
                      onCheckedChange={() => toggleField(field)}
                    />
                    <Label htmlFor={field}>{field}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label className={styles.sectionTitle}>
                Select Meters to Use
              </Label>
              <div className={styles.checkboxGrid}>
                {meterList.map((meter) => (
                  <div key={meter} className={styles.checkboxItem}>
                    <Checkbox
                      id={`meter-${meter}`}
                      checked={selectedMeters.includes(meter)}
                      onCheckedChange={() => toggleMeter(meter)}
                    />
                    <Label htmlFor={`meter-${meter}`}>{meter}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ปุ่ม */}
        <div className={styles.popupActions}>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className={styles.confirmButton} onClick={handleCompareClick}>
            Compare
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompareGraphPopup;
