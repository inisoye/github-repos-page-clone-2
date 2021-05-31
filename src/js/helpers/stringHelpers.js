const getQueryString = () => {
  let result = {},
    queryString = location.search.slice(1),
    re = /([^&=]+)=([^&]*)/g,
    m;

  while ((m = re.exec(queryString))) {
    result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }

  return result;
};

const removeHTMLFromString = (str) => {
  return (
    !!str &&
    str.replace(/[^\w. ]/gi, function (c) {
      return '&#' + c.charCodeAt(0) + ';';
    })
  );
};

const formatUpdatedDate = (updatedDateData) => {
  const todaysDate = new Date();
  const updatedDate = new Date(updatedDateData);

  const updatedMonth = new Intl.DateTimeFormat('en-US', {
    month: 'short',
  }).format(updatedDate);
  const updatedDay = updatedDateData.slice(8, 10);

  // Render year only if repository is from a previous year
  var updatedDateString = 'on ' + updatedMonth + ' ' + updatedDay;
  if (updatedDate.getFullYear() !== todaysDate.getFullYear()) {
    updatedDateString =
      'on ' + updatedDay + ' ' + updatedMonth + ' ' + updatedDate.getFullYear();
  }

  const daysAgo = Math.round(
    Math.abs((todaysDate - updatedDate) / (60 * 60 * 24 * 1000))
  );
  const hoursAgo = Math.round(
    Math.abs((todaysDate - updatedDate) / (60 * 60 * 1000))
  );
  const minutesAgo = Math.round(
    Math.abs((todaysDate - updatedDate) / (60 * 1000))
  );

  let timeAgoString;

  if (minutesAgo <= 1) {
    timeAgoString = minutesAgo.toString() + ' minute ago';
  } else if (minutesAgo > 1 && minutesAgo < 60) {
    timeAgoString = minutesAgo.toString() + ' minutes ago';
  } else if (hoursAgo <= 1) {
    timeAgoString = hoursAgo.toString() + ' hour ago';
  } else if (hoursAgo > 1 && hoursAgo < 24) {
    timeAgoString = hoursAgo.toString() + ' hours ago';
  } else if (daysAgo < 2) {
    timeAgoString = 'yesterday';
  } else {
    timeAgoString = daysAgo.toString() + ' days ago';
  }

  /* 
  /* Return a formatted date string if a repository 
  /* has been updated more than 30 days ago 
  */
  return daysAgo > 30 ? updatedDateString : timeAgoString;
};

export { getQueryString, removeHTMLFromString, formatUpdatedDate };
