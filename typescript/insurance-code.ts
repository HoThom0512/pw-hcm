


interface Benefit {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
}

const filterBenefits = (
    benefits: Benefit[], 
    startDate: string, 
    endDate: string, 
    type: "include" | "exclude"
): Benefit[] => benefits.filter(({ start_date, end_date }) => 
    (type === "include") === !(new Date(end_date) < new Date(startDate) || new Date(start_date) > new Date(endDate))
);

// Dữ liệu mẫu
const benefits: Benefit[] = [
    { id: 1, name: "Bảo hiểm thất nghiệp", start_date: "2024-01-01", end_date: "2024-06-30" },
    { id: 2, name: "Bảo hiểm y tế", start_date: "2024-02-01", end_date: "2024-12-31" },
    { id: 3, name: "Bảo hiểm xã hội", start_date: "2023-05-01", end_date: "2025-05-01" }
];

// Kiểm tra kết quả
console.log("Include:", filterBenefits(benefits, "2024-03-01", "2024-09-01", "include"));
console.log("Exclude:", filterBenefits(benefits, "2024-03-01", "2024-09-01", "exclude"));
