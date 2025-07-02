export default function ArabicDate({ dateString }: { dateString: string }) {
    const date = new Date(dateString);

    const formatted = new Intl.DateTimeFormat("ar-EG", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date);

    return <span>{formatted}</span>;
}