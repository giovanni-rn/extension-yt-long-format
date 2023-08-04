const hideShortVideos = () => {
  setInterval(() => {
    let items; // HTMLCollection (videos in feed)
    const ytSubsUrl = "https://www.youtube.com/feed/subscriptions"; // YouTube subscription feed URL
    const ytVideoUrl = "https://www.youtube.com/watch?"; // YouTube video player URL
    const currentUrl = window.location.href; // String

    // Get video items from page
    switch (true) {
      case currentUrl === ytSubsUrl: // Subscription page
        items = document.querySelectorAll("ytd-shelf-renderer"); // HTMLCollection
        break;
      case currentUrl.includes(ytVideoUrl): // Video page (with recommandations)
        items = document.querySelectorAll("ytd-compact-video-renderer"); // HTMLCollection
        break;
      default:
        return; // Other pages
    }
    const itemsArray = [...items]; // HTMLCollection -> Array

    // Get duration of each videos
    itemsArray.map((item) => {
      const counterElement = item.querySelector("span#text"); // HTMLElement
      const counterString = counterElement.innerHTML; // String
      const counterTime = counterString.split(":"); // Array
      const counterMinutes = counterTime[counterTime.length - 2]; // String (prevents hiding 1:00:00+ videos)
      const counterMinutesInt = parseInt(counterMinutes); // Number

      // Hide too short videos
      if (counterMinutesInt < 15) item.style.display = "none";
    });
  }, 100);
};

hideShortVideos();
