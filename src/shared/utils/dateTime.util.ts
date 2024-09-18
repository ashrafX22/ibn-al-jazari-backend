import { DateTime } from 'luxon';
import { formatISO, set, addDays } from 'luxon';
import { Day, getDayIndex } from 'src/models/enums/day.enum';

export function addHoursToDateTime(dateTimeStr: string, hours: number): string {
  // Parse the input string into a DateTime object with timezone information
  const dateTime = DateTime.fromISO(dateTimeStr);

  // Add 1 hour to the DateTime object
  const newDateTime = dateTime.plus({ hours: hours });

  // Convert the updated DateTime object back to ISO string format with timezone
  return newDateTime.toISO();
}

export function getNextDateForDay(day: Day): Date {
  const today = new Date();
  const currentDayIndex = today.getDay(); // 0 (Sunday) to 6 (Saturday)

  // Your getDayIndex will map enum values to indices in the dayOrder array
  const targetDayIndex = getDayIndex(day);

  // Calculate how many days until the next occurrence of the target day
  const dayDifference = (targetDayIndex + 7 - currentDayIndex) % 7;

  // If today is the target day, it will return 0, so we add 7 to skip to next week
  const nextDate: Date = addDays(
    today,
    dayDifference === 0 ? 7 : dayDifference,
  );

  return nextDate;
}

export function combineDateAndTime(date: Date, time: string): DateTime {
  const [hours, minutes, seconds] = time.split(':').map(Number);

  const newDateTime = set(date, {
    hours,
    minutes,
    seconds: seconds || 0,
  });

  return formatISO(newDateTime); // 'YYYY-MM-DDTHH:mm:ss.sssZ'
}
