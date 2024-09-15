export enum Day {
    SATURDAY = 'saturday',
    SUNDAY = 'sunday',
    MONDAY = 'monday',
    TUESDAY = 'tuesday',
    WEDNESDAY = 'wednesday',
    THURSDAY = 'thursday',
    FRIDAY = 'friday',
}

const dayOrder: Day[] = [
    Day.SATURDAY,
    Day.SUNDAY,
    Day.MONDAY,
    Day.TUESDAY,
    Day.WEDNESDAY,
    Day.THURSDAY,
    Day.FRIDAY,
];

export const getDayIndex = (day: Day): number => {
    return dayOrder.indexOf(day);
};