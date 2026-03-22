export function groupTelemetry(rows: any[]) {
  const grouped: Record<string, any> = {};

  for (const row of rows) {
    const ts = row.ts;
    const label =
      row.deviceRegister?.modelRegister?.registerDefinition?.label ||
      Object.keys(row).find((k) => k !== 'ts'); // fallback ถ้าคุณแปลงแล้ว

    if (!grouped[ts]) {
      grouped[ts] = { ts };
    }

    grouped[ts][label] = row.valueNum ?? row[label];
  }

  return Object.values(grouped);
}
