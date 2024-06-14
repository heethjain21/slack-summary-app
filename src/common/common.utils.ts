import moment from 'moment-timezone';

export namespace CommonUtils {
  export function isTimeForSummary(timezone: string, hour: number): boolean {
    const currentTime = moment().tz(timezone);
    return currentTime.format('HH') === hour.toString();
  }

  export function getPreviousDayRange(timezone: string) {
    const startOfDay = moment().tz(timezone).subtract(1, 'days').startOf('day').unix();

    const endOfDay = moment().tz(timezone).startOf('day').unix();

    return { startOfDay, endOfDay };
  }

  export function getPreviousDate(timezone: string): string {
    return moment().tz(timezone).subtract(1, 'days').format('YYYY-MM-DD');
  }
}
