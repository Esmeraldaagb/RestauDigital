import TableQRCode from "@/page/client/tableQrCode"

export default function QRCodePage() {
  const tables = ["1", "2", "3", "A1", "A2"];

  return (
    <div className="min-h-screen p-8 grid grid-cols-2 md:grid-cols-3 gap-8">
      {tables.map((tableId) => (
        <TableQRCode key={tableId} tableId={tableId} />
      ))}
    </div>
  );
}
