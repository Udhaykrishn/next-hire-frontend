export function formatSalaryAmount(
  amount: string | number,
  currencyCode: string,
  formatStyle: string = "compact",
): string {
  const num = Number(amount);
  if (
    Number.isNaN(num) ||
    amount === "" ||
    amount === undefined ||
    amount === null
  ) {
    return "";
  }

  const currencySymbols: Record<string, string> = {
    USD: "$",
    INR: "₹",
    EUR: "€",
    GBP: "£",
    CAD: "C$",
    AUD: "A$",
  };

  const symbol = currencySymbols[currencyCode] || currencyCode;

  if (formatStyle === "compact") {
    if (currencyCode === "INR") {
      if (num >= 100000) {
        const value = num / 100000;
        return `${symbol}${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}L`;
      }
      if (num >= 1000) {
        const value = num / 1000;
        return `${symbol}${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}k`;
      }
      return `${symbol}${num.toLocaleString("en-IN")}`;
    } else {
      if (num >= 1000) {
        const value = num / 1000;
        return `${symbol}${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}k`;
      }
      return `${symbol}${num.toLocaleString("en-US")}`;
    }
  } else {
    const locale = currencyCode === "INR" ? "en-IN" : "en-US";
    return `${symbol}${num.toLocaleString(locale)}`;
  }
}

export function formatSalaryRange(
  minSalary: string | number,
  maxSalary: string | number,
  currencyCode: string = "USD",
  salaryFrequency: string = "year",
  formatStyle: string = "compact",
): string {
  const formattedMin = formatSalaryAmount(minSalary, currencyCode, formatStyle);
  const formattedMax = formatSalaryAmount(maxSalary, currencyCode, formatStyle);

  const freqLabels: Record<string, string> = {
    year: "year",
    month: "month",
    hour: "hour",
  };
  const freqLabel = freqLabels[salaryFrequency] || salaryFrequency;

  if (formattedMin && formattedMax) {
    return `${formattedMin} - ${formattedMax} / ${freqLabel}`;
  }
  if (formattedMin) {
    return `From ${formattedMin} / ${freqLabel}`;
  }
  if (formattedMax) {
    return `Up to ${formattedMax} / ${freqLabel}`;
  }
  return "";
}
