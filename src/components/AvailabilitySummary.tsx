import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { calculateAvailability, convertScheduleToTimezone } from '../utils/timeUtils';
import type { RootState } from '../store';
import type { AvailabilitySummaryProps } from '../types';

export const AvailabilitySummary = ({ className = '' }: Omit<AvailabilitySummaryProps, 'userSchedule' | 'userTimezone' | 'managerTimezone'>) => {
  const { userSchedule, userTimezone, managerTimezone } = useSelector((state: RootState) => state.workSchedule);

  const availability = useMemo(() => {
    return calculateAvailability(userSchedule, userTimezone, managerTimezone || undefined);
  }, [userSchedule, userTimezone, managerTimezone]);

  const convertedSchedule = useMemo(() => {
    if (!managerTimezone) return null;
    return convertScheduleToTimezone(userSchedule, userTimezone, managerTimezone);
  }, [userSchedule, userTimezone, managerTimezone]);

  const formatScheduleTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  if (!managerTimezone) {
    return (
      <div className={`p-6 bg-yellow-50 rounded-lg border border-yellow-200 ${className}`}>
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">
          Availability Summary
        </h3>
        <p className="text-yellow-700">
          Please select your manager's location to see availability comparison.
        </p>
      </div>
    );
  }

  return (
    <div className={`p-6 bg-white rounded-lg shadow-sm border ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Availability Summary
      </h3>

      <div className="space-y-4">
        {/* Current Status */}
        <div className={`p-4 rounded-lg ${
          availability.isAvailable
            ? 'bg-green-50 border border-green-200'
            : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-center space-x-2 mb-2">
            <div className={`w-3 h-3 rounded-full ${
              availability.isAvailable ? 'bg-green-500' : 'bg-red-500'
            }`} />
            <span className={`font-medium ${
              availability.isAvailable ? 'text-green-800' : 'text-red-800'
            }`}>
              {availability.message}
            </span>
          </div>

          {!availability.isAvailable && availability.nextAvailable && (
            <p className="text-sm text-red-700">
              Next available: {availability.nextAvailable}
            </p>
          )}
        </div>

        {/* Time Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Your Time</h4>
            <p className="text-lg font-mono font-bold text-blue-900">
              {availability.currentLocalTime}
            </p>
            <p className="text-sm text-blue-700 mt-1">
              Work hours: {formatScheduleTime(userSchedule.startTime)} - {formatScheduleTime(userSchedule.endTime)}
            </p>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-purple-800 mb-2">Manager's Time</h4>
            <p className="text-lg font-mono font-bold text-purple-900">
              {availability.currentManagerTime}
            </p>
            {convertedSchedule && (
              <p className="text-sm text-purple-700 mt-1">
                Your hours there: {formatScheduleTime(convertedSchedule.startTime)} - {formatScheduleTime(convertedSchedule.endTime)}
              </p>
            )}
          </div>
        </div>

        {/* Communication Helper */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">
            💬 Quick Communication
          </h4>
          <p className="text-sm text-gray-700">
            "I'm available from{' '}
            <span className="font-mono font-medium">
              {convertedSchedule ?
                `${formatScheduleTime(convertedSchedule.startTime)} - ${formatScheduleTime(convertedSchedule.endTime)}` :
                `${formatScheduleTime(userSchedule.startTime)} - ${formatScheduleTime(userSchedule.endTime)}`
              }
            </span>{' '}
            your time."
          </p>
        </div>
      </div>
    </div>
  );
};

AvailabilitySummary.displayName = 'AvailabilitySummary';