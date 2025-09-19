# Component Library Documentation

## Overview

This component library provides a complete set of React components for building the Work Hours Timezone Calculator application. The components follow modern React patterns including hooks, composition, RTK Query for API state management, React Hook Form for form handling, and Ark UI for accessible UI primitives.

## Technology Stack

- **React 19** with TypeScript
- **RTK Query** for API state management
- **React Hook Form** with Zod validation
- **Ark UI** for headless accessible components
- **Tailwind CSS** for styling
- **Component Design Patterns** for reusability and composition

## Core Components

### 1. TimeDisplay

**Purpose**: Displays current time for any timezone with automatic updates

**Features**:
- Real-time updates every second
- Timezone-aware formatting
- Date and time display
- Clean, professional styling

**Usage**:
```tsx
import { TimeDisplay } from './components';

<TimeDisplay
  timezone="America/New_York"
  label="Manager's Time"
  className="mb-4"
/>
```

**Props**:
- `timezone?` (string): Target timezone (defaults to user's local timezone)
- `label` (string): Display label for the time widget
- `className?` (string): Additional CSS classes

### 2. CitySearchRTK

**Purpose**: Search and select cities using RTK Query with World Time API

**Features**:
- Real-time search with debouncing
- RTK Query integration for API calls
- Redux state management for selected city
- Accessible combobox with Ark UI
- Loading states and error handling
- Auto-complete suggestions

**Usage**:
```tsx
import { CitySearchRTK } from './components';

<CitySearchRTK
  placeholder="Search for your manager's city..."
  className="mb-6"
/>
```

**Props**:
- `placeholder?` (string): Input placeholder text
- `className?` (string): Additional CSS classes

**Redux Integration**:
- Uses `useLazySearchCitiesQuery` for API calls
- Dispatches `setSelectedCity` action on selection
- Reads `selectedCity` from Redux state

### 3. WorkHoursForm

**Purpose**: Form for inputting work schedule with validation

**Features**:
- React Hook Form integration
- Zod schema validation
- Auto-save functionality
- Time input controls
- Real-time validation feedback
- Support for overnight schedules

**Usage**:
```tsx
import { WorkHoursForm } from './components';

<WorkHoursForm className="mb-6" />
```

**Props**:
- `className?` (string): Additional CSS classes

**Validation**:
- Time format validation (HH:MM)
- Start/end time difference validation
- Support for overnight shifts (22:00 - 06:00)

### 4. AvailabilitySummary

**Purpose**: Shows current availability status and timezone comparison

**Features**:
- Real-time availability calculation
- Timezone conversion display
- Visual status indicators
- Communication helper text
- Schedule comparison between timezones

**Usage**:
```tsx
import { AvailabilitySummary } from './components';

<AvailabilitySummary className="mt-6" />
```

**Props**:
- `className?` (string): Additional CSS classes

**Display Elements**:
- Current availability status (Available/Not Available)
- Side-by-side time comparison
- Converted work hours in manager's timezone
- Quick communication template

## State Management

### Redux Store Structure

```typescript
{
  workSchedule: {
    userSchedule: { startTime: string, endTime: string },
    userTimezone: string,
    selectedCity: CitySearchResult | null,
    managerTimezone: string | null,
  },
  timezoneApi: {
    // RTK Query state for timezone data
  }
}
```

### RTK Query Endpoints

1. **getTimezones**: Fetch all available timezones
2. **getTimezoneData**: Get detailed timezone information
3. **searchCities**: Search and filter cities by query

## Hooks

### useCurrentTime

**Purpose**: Provides real-time current time with timezone support

**Returns**:
- `currentTime`: Current Date object
- `formatTime()`: Formatted time string
- `formatDate()`: Formatted date string
- `getTimezone()`: Current timezone identifier

### useTimezoneAPI (Legacy)

**Purpose**: Direct API integration (replaced by RTK Query)
- Kept for compatibility and reference

## Utility Functions

### timeUtils.ts

**Key Functions**:
- `parseTimeString()`: Parse HH:MM time strings
- `isTimeWithinSchedule()`: Check if current time is within work hours
- `calculateAvailability()`: Calculate availability status
- `convertScheduleToTimezone()`: Convert work schedule between timezones

## Form Validation

### Work Schedule Schema

```typescript
const workScheduleSchema = z.object({
  startTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
  endTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
}).refine(/* validation logic */);
```

**Features**:
- Time format validation
- Overnight schedule support
- Real-time validation feedback

## Styling Approach

**Design System**:
- Tailwind CSS for utility-first styling
- Consistent color palette (blue, green, red, gray)
- Professional appearance suitable for workplace
- Responsive design patterns
- High contrast for accessibility

**Component Patterns**:
- Card-based layouts with shadows and borders
- Status indicators with color coding
- Loading states with spinners
- Error states with clear messaging

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support via Ark UI
- **Screen Readers**: Proper ARIA labels and semantics
- **Color Contrast**: High contrast color combinations
- **Focus Management**: Clear focus indicators
- **Error Handling**: Descriptive error messages

## Performance Optimizations

- **Debounced Search**: 300ms debounce for city search
- **Memoization**: useMemo for expensive calculations
- **Auto-save**: Debounced form auto-save (500ms)
- **RTK Query Caching**: Automatic API response caching
- **Component Optimization**: Proper React.memo usage where needed

## Integration Patterns

### Provider Setup

```tsx
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      {/* Your app components */}
    </Provider>
  );
}
```

### Component Composition

```tsx
function WorkHoursCalculator() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <TimeDisplay label="Your Local Time" />
      <CitySearchRTK />
      <TimeDisplay
        timezone={managerTimezone}
        label="Manager's Current Time"
      />
      <WorkHoursForm />
      <AvailabilitySummary />
    </div>
  );
}
```

## Future Enhancements

1. **Offline Support**: Cache timezone data for offline use
2. **Multiple Managers**: Support for multiple timezone comparisons
3. **Calendar Integration**: Connect with calendar applications
4. **Customizable Themes**: Dark mode and custom color schemes
5. **Mobile App**: React Native version of components
6. **Notification System**: Alerts for availability changes

## Testing Strategy

- **Unit Tests**: Individual component testing
- **Integration Tests**: Redux store integration
- **API Tests**: RTK Query endpoint testing
- **E2E Tests**: Complete user workflows
- **Accessibility Tests**: Screen reader and keyboard navigation

This component library provides a solid foundation for building timezone-aware work hour calculation applications with modern React patterns and excellent user experience.