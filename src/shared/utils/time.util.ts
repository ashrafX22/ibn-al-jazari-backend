import { DateTime } from 'luxon';

export function addHoursToDateTime(dateTimeStr: string, hours: number): string {
  // Parse the input string into a DateTime object with timezone information
  const dateTime = DateTime.fromISO(dateTimeStr);

  // Add 1 hour to the DateTime object
  const newDateTime = dateTime.plus({ hours: hours });

  // Convert the updated DateTime object back to ISO string format with timezone
  return newDateTime.toISO();
}

const daysOfWeekMap: { [key: string]: number } = {
  "saturday": 0,
  "sunday": 1,
  "monday": 2,
  "tuesday": 3,
  "wednesday": 4,
  "thursday": 5,
  "friday": 6,
};

export function getFirstNextDateTime(day: string, time: string, timezone: string): string {
  const currentDate = DateTime.now().setZone(timezone);

  const currentDayOfWeek = (currentDate.weekday + 1) % 7;

  const [startHour, startMinute] = time.split(":").map(Number);

  const targetDayOfWeek = daysOfWeekMap[day.toLowerCase()];

  let daysToAdd = targetDayOfWeek - currentDayOfWeek;

  if (daysToAdd < 0
    || (
      daysToAdd === 0 && (currentDate.hour > startHour
        || (currentDate.hour === startHour && currentDate.minute >= startMinute))
    )) {
    daysToAdd += 7;
  }

  const targetDate = currentDate.plus({ days: daysToAdd })
    .set({ hour: startHour, minute: startMinute, second: 0, millisecond: 0 });

  const targetDateTime = targetDate.setZone('UTC').toISO();
  return targetDateTime;
}