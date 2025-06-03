

export default function MetricCard({ title, value }: { title: string; value: number }) {
    return (
        <div>
            <h4 className="font-semibold">{title}</h4>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    );
}