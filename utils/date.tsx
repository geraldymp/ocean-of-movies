export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short', // or 'short' for Jan, Feb...
      day: 'numeric',
    }).format(date);
  };
  