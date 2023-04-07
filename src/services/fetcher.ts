export const fetcherOptions = () => {
  if (typeof localStorage.getItem('jwt') === 'undefined') return {};
  if (localStorage.getItem('jwt')) {
    return {
      headers: {
        "Content-Type" : "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    };
  }
  return {};
};

export const fetcherMultipart = () => {
  if (typeof localStorage.getItem('jwt') === 'undefined') return {};
  if(localStorage.getItem('jwt')) {
    return {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'multipart/form-data'
      },
    }
  }
}