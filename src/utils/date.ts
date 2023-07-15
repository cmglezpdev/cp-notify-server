
export const formatDate = (dateTime: string | number) : string => {
    const date = new Date(dateTime);    
    const day = (date.getDate() >= 10) ? date.getDate() : `0${date.getDate()}`;
    const month = (date.getMonth() + 1 >= 10) ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
    const year = (date.getFullYear() >= 10) ? date.getFullYear() : `0${date.getFullYear()}`;
    const hour = (date.getHours() >= 10) ? date.getHours() : `0${date.getHours()}`;
    const minutes = (date.getMinutes() >= 10) ? date.getMinutes() : `0${date.getMinutes()}`;

    return `${day}/${month}/${year}, ${hour}:${minutes}`;
}


export const formatDuration = (duration: number) : string => {
    const hour = Math.floor(duration / 3600);
    const minutes = Math.floor((duration - 3600 * hour) / 60);
    return `${hour < 10 ? `0${hour}` : hour}:${minutes < 10 ? `0${minutes}` : minutes}`;
}

export const timeToSeconds = (duration: string) : number => {
    const [hours, minutes] = duration.split(":");
    const totalSeconds = (parseInt(hours) * 60 + parseInt(minutes)) * 60;
    return totalSeconds;
}

export const parseDate = (dateString: string) : Date => {
    // 2023-06-24(Sat) 08:00
    const regex = /^(\d{4})-(\d{2})-(\d{2})\(([a-zA-Z]{3})\)\s(\d{2}):(\d{2})$/;
    const match = dateString.match(regex);
    
    if (match) {
        const year = parseInt(match[1]);
        const month = parseInt(match[2]) - 1;
        const day = parseInt(match[3]);
        const hour = parseInt(match[5]);
        const minute = parseInt(match[6]);
        
        return new Date(year, month, day, hour, minute);
    } else {
        throw new Error('Invalid Date');
    }
}
