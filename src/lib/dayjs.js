import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime'; // Plugin para fechas relativas

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime); // Extiende dayjs con el plugin relativeTime

export default dayjs;