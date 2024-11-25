import { PasswordItemType } from "@/interfaces";

export const groupByDate = (data: PasswordItemType[]) => {
  type Section = { title: string; data: PasswordItemType[] };
  const sections: { [key: string]: Section } = {};

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const todayString = today.toISOString().split("T")[0];
  const yesterdayString = yesterday.toISOString().split("T")[0];

  data.forEach((item) => {
    const itemDate = item.date.toString();

    let sectionTitle: string;
    if (itemDate === todayString) {
      sectionTitle = "Today";
    } else if (itemDate === yesterdayString) {
      sectionTitle = "Yesterday";
    } else {
      sectionTitle = itemDate;
    }

    if (!sections[sectionTitle]) {
      sections[sectionTitle] = { title: sectionTitle, data: [] };
    }
    sections[sectionTitle].data.push(item);
  });

  return Object.values(sections);
};

export const formatDate = (isoDateString: string): string => {
  try {
    const date = new Date(isoDateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error("Invalid date string:", isoDateString);
    return "Invalid Date";
  }
};
