import { z } from 'zod';

const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

export const workScheduleSchema = z.object({
  startTime: z
    .string()
    .regex(timeRegex, 'Please enter a valid time in HH:MM format')
    .refine((time) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
    }, 'Please enter a valid time'),
  endTime: z
    .string()
    .regex(timeRegex, 'Please enter a valid time in HH:MM format')
    .refine((time) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
    }, 'Please enter a valid time'),
}).refine((data) => {
  const parseTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const startMinutes = parseTime(data.startTime);
  const endMinutes = parseTime(data.endTime);

  // Allow overnight schedules (e.g., 22:00 - 06:00)
  return startMinutes !== endMinutes;
}, {
  message: 'End time must be different from start time',
  path: ['endTime'],
});

export type WorkScheduleFormData = z.infer<typeof workScheduleSchema>;