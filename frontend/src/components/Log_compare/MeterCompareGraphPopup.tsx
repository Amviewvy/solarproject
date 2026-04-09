'use client';
import React, { useEffect, useState } from 'react';
import styles from './MeterComparison.module.css';
import { Checkbox } from './../ui/checkbox';
import { Button } from './../ui/button';
import { Label } from './../ui/label';
import { RadioGroup, RadioGroupItem } from './../ui/radio-group';
import type { DeviceDetail } from '../../types/common';

interface CompareGraphPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onCompare: (meters: string[], fields: string[], mode: 'meter' | 'data') => void;
}

const API_URL = import.meta.env.VITE_API_URL;

const resultFields = [
  'Volts Ave',
  'Current Sum',
  'Watts Sum',
  'VA Sum',
  'VAr Sum',
  'PF Ave',
  'Freq',
  'Wh Import',
  'Wh Export',
];

const CompareGraphPopup: React.FC<CompareGraphPopupProps> = ({ isOpen, onClose, onCompare }) => {
  const [compareMode, setCompareMode] = useState<'meter' | 'data'>('meter');
  const [meterList, setMeterList] = useState<DeviceDetail[]>([]);
  const [selectedMeters, setSelectedMeters] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);

  const toggleMeter = (meterId: string) => {
    setSelectedMeters((prev) =>
      prev.includes(meterId) ? prev.filter((m) => m !== meterId) : [...prev, meterId],
    );
  };
  const toggleField = (field: string) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field],
    );
  };

  useEffect(() => {
    async function fetchAllMeter() {
      try {
        const res = await fetch(`${API_URL}/devices?device_type=meter`);
        const json = await res.json();
        const sorted = (json.result ?? []).sort((a: any, b: any) => a.name.localeCompare(b.name));

        setMeterList(sorted);
      } catch (error) {
        console.error(error);
      }
    }

    fetchAllMeter();
  }, []);
  if (!isOpen) return null;

  const handleCompareClick = () => {
    onCompare(selectedMeters, selectedFields, compareMode);
    onClose();
  };

  const toggleAllMeters = () => {
    if (selectedMeters.length === meterList.length) {
      setSelectedMeters([]);
    } else {
      setSelectedMeters(meterList.map((m) => m.id));
    }
  };

  const toggleAllFields = () => {
    if (selectedFields.length === resultFields.length) {
      setSelectedFields([]);
    } else {
      setSelectedFields(resultFields);
    }
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
            onValueChange={(value: 'meter' | 'data') => setCompareMode(value)}
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
        {compareMode === 'meter' && (
          <div className={styles.popupSection}>
            <Label className={styles.sectionTitle}>Select Meters</Label>
            <div className={styles.checkboxGrid}>
              <div className={styles.checkboxItem}>
                <Checkbox
                  id="all-meters"
                  checked={selectedMeters.length === meterList.length}
                  onCheckedChange={toggleAllMeters}
                />
                <Label htmlFor="all-meters">All Meters</Label>
              </div>
              {meterList.map((meter) => (
                <div key={meter.id} className={styles.checkboxItem}>
                  <Checkbox
                    id={meter.id}
                    checked={selectedMeters.includes(meter.id)}
                    onCheckedChange={() => toggleMeter(meter.id)}
                  />
                  <Label htmlFor={meter.id}>{meter.name}</Label>
                </div>
              ))}
            </div>

            <Label className={styles.sectionTitle}>Select Data Type</Label>
            <div className={styles.checkboxGrid}>
              <div className={styles.checkboxItem}>
                <Checkbox
                  id="all-fields"
                  checked={selectedFields.length === resultFields.length}
                  onCheckedChange={toggleAllFields}
                />
                <Label htmlFor="all-fields">All Data</Label>
              </div>
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
        {compareMode === 'data' && (
          <div className={styles.popupSection}>
            <div>
              <Label className={styles.sectionTitle}>Select Data Fields to Compare</Label>
              <div className={styles.checkboxGrid}>
                <div className={styles.checkboxItem}>
                  <Checkbox
                    id="all-fields"
                    checked={selectedFields.length === resultFields.length}
                    onCheckedChange={toggleAllFields}
                  />
                  <Label htmlFor="all-fields">All Data</Label>
                </div>
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
              <Label className={styles.sectionTitle}>Select Meters to Use</Label>
              <div className={styles.checkboxGrid}>
                <div className={styles.checkboxItem}>
                  <Checkbox
                    id="all-meters"
                    checked={selectedMeters.length === meterList.length}
                    onCheckedChange={toggleAllMeters}
                  />
                  <Label htmlFor="all-meters">All Meters</Label>
                </div>
                {meterList.map((meter) => (
                  <div key={meter.id} className={styles.checkboxItem}>
                    <Checkbox
                      id={`${meter.id}`}
                      checked={selectedMeters.includes(meter.id)}
                      onCheckedChange={() => toggleMeter(meter.id)}
                    />
                    <Label htmlFor={`meter-${meter.id}`}>{meter.name}</Label>
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
