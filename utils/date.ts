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