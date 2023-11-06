export const ConvertDate = (date) => {
    const inputDate = new Date(date);
    // Extract the year, month, day, and time
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(inputDate.getDate()).padStart(2, '0');
    const hours = String(inputDate.getUTCHours()).padStart(2, '0');
    const minutes = String(inputDate.getUTCMinutes()).padStart(2, '0');
    const seconds = String(inputDate.getUTCSeconds()).padStart(2, '0');
    // Create the desired format
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }