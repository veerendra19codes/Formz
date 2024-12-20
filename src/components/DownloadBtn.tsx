"use client";

type Row = { [key: string]: string } & {
    submittedAt: Date;
};

export default function DownloadButton({ row, columns }: { row: Row, columns: { id: string, label: string }[] }) {
    function downloadCSV(row: Row) {
        const csvContent = columns
            .map((column) => `${column.label},${row[column.id] || ""}`)
            .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `submission_${row.submittedAt}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <button
            onClick={() => downloadCSV(row)}
            className="text-blue-500 hover:underline"
        >
            Export CSV
        </button>
    );
}
