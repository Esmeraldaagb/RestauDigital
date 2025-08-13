"use client";

import { QRCodeCanvas } from "qrcode.react";

export default function TableQRCode({ tableId }: { tableId: string }) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/client/${tableId}`;

  return (
    <div className="flex flex-col items-center gap-4">
      <QRCodeCanvas value={url} size={180} />
      <p className="font-semibold text-gray-700">Table {tableId}</p>
    </div>
  );
}
