export const formatJoinDate = (date: Date) => {
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  return month + " " + year;
};

export const formatGeneralDate = (date: string) => {
  return new Date(date).toLocaleDateString([], {
    month: "numeric",
    day: "numeric",
    year: "2-digit",
  });
};

export const formatCommentDate = (dateString: string) => {
  const now = new Date();
  const date = new Date(dateString);
  const diff = (now.getTime() - date.getTime()) / 1000;

  if (diff < 300) {
    return "Just now";
  } else if (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    return "Today";
  } else if (diff < 3600 && diff >= 300) {
    const minutesAgo = Math.floor(diff / 60);
    return `${minutesAgo} minutes ago`;
  } else if (
    date.getDate() === now.getDate() - 1 &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    return "Yesterday";
  } else if (diff < 518400 && diff >= 86400) {
    const daysAgo = Math.floor(diff / 86400);
    return `${daysAgo} days ago`;
  } else {
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
    });
  }
};
