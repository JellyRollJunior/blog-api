import { format } from 'date-fns';

const iso8061ToDate = (dateString, formatString) => {
    const date = new Date(dateString);
    return format(date, formatString);
};

export { iso8061ToDate };
