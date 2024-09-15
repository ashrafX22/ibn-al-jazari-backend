import { DateTime } from 'luxon';

export function addHoursToDateTime(dateTimeStr: string, hours: number): string {
    // Parse the input string into a DateTime object with timezone information
    const dateTime = DateTime.fromISO(dateTimeStr);

    // Add 1 hour to the DateTime object
    const newDateTime = dateTime.plus({ hours: hours });

    // Convert the updated DateTime object back to ISO string format with timezone
    return newDateTime.toISO();
}