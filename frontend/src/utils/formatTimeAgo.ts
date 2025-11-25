export function formatTimeAgo(dateString: string, short?: boolean): string {
    const date = new Date(dateString).getTime(); // Convert to timestamp
    const now = Date.now(); // Current timestamp
    const diffInMs = now - date;
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (short) {
        // Short format (like Facebook comments)
        if (diffInYears > 0) {
            return `${diffInYears}y`;
        } else if (diffInMonths > 0) {
            return `${diffInMonths}mo`;
        } else if (diffInDays > 0) {
            return `${diffInDays}d`;
        } else if (diffInHours > 0) {
            return `${diffInHours}h`;
        } else if (diffInMinutes > 0) {
            return `${diffInMinutes}m`;
        } else {
            return 'now';
        }
    } else {
        // Original format
        if (diffInYears > 0) {
            return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
        } else if (diffInMonths > 0) {
            return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
        } else if (diffInDays > 0) {
            return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
        } else if (diffInHours > 0) {
            return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
        } else if (diffInMinutes > 0) {
            return `${diffInMinutes} min ago`;
        } else {
            return 'just now';
        }
    }
}