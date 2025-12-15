// 날짜를 YYYY.MM.DD 형식으로 변환
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  } catch (error) {
    console.error("날짜 포맷 변환 실패:", error);
    return dateString;
  }
};

// 날짜 범위를 YYYY.MM.DD ~ YYYY.MM.DD 형식으로 변환
export const formatDateRange = (
  startDate: string,
  endDate: string
): string => {
  return `${formatDate(startDate)} ~ ${formatDate(endDate)}`;
};

