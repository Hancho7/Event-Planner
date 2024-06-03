import event1 from "../assets/event 1.jpeg";
import event1b from "../assets/event1b.jpg";
import event2 from "../assets/event 2.jpeg";
import event2b from "../assets/event2b.jpg";
import event3 from "../assets/event 3.jpeg";
import event3b from "../assets/event3b.jpg";
import event4 from "../assets/event 4.jpeg";
import event4b from "../assets/event4b.jpg";
import event5 from "../assets/event 5.jpeg";
import event6 from "../assets/event 6.jpeg";
import event6b from "../assets/event6b.jpg";
import meeting from "../assets/meeting.jpg";
import event7 from "../assets/event7.jpg";
import event7b from "../assets/event7b.jpg";
import event8 from "../assets/event8.jpg";
import event8b from "../assets/event8b.jpg";
import event9 from "../assets/event9.jpg";
import event9b from "../assets/event9b.jpg";
import event10  from "../assets/event10.jpg";
import event10b from "../assets/event10b.jpg";
import event11 from "../assets/event11.jpg";
import event11b from "../assets/event11b.jpg";
import event12 from "../assets/event12.jpg";
import event12b from "../assets/event12b.jpg";
import event13 from "../assets/event13.jpg";
import event13b from "../assets/event13b.jpg";
import event14 from "../assets/event14.jpg";
import event14b from "../assets/even14b.jpg";
import event15 from "../assets/event15.jpg";
import event15b from "../assets/event15b.jpg";
import event16 from "../assets/event16.jpg";
import event16b from "../assets/event16b.jpg";


const featuredEvents = [
  {
    id: 1,
    title: "SRC party",
    imageUrl: event1,
    slides: [
      {
        imageUrls: [event1, event1b],
        title: "SRC party",
        location: "Trinity Hall",
        description:
          "Join us for the SRC’s annual Spring Fest, a vibrant celebration that marks the end of the academic year with a day full of fun, entertainment, and community spirit. This event is open to all students, faculty, and staff, promising a memorable experience for everyone!",
        date: "20/05/2020",
        time: "10:00 AM",
      },
    ],
  },
  {
    id: 2,
    title: "National Service Workshop",
    imageUrl: event2,
    slides: [
      {
        imageUrls: [event2, event2b],
        title: "National Service Workshop",
        location: "Location for event 2",
        description: "Slide 1 description",
        date: "20/05/2020",
        time: "10:00 AM",
      },
    ],
  },
  {
    id: 3,
    title: "Student conference",
    imageUrl: event3,
    slides: [
      {
        imageUrls: [event3, event3b],
        title: "Student conference",
        location: "Location for event 3",
        description: "Slide 1 description",
        date: "20/05/2020",
        time: "10:00 AM",
      },
    ],
  },
  {
    id: 4,
    title: "Seminars",
    imageUrl: event4,
    slides: [
      {
        imageUrls: [event4, event4b],
        title: "Seminars",
        location: "Location for event 4",
        description: "Slide 1 description",
        date: "20/05/2020",
        time: "10:00 AM",
      },
    ],
  },
  {
    id: 5,
    title: "Board meeting",
    imageUrl: event5,
    slides: [
      {
        imageUrls: [event5, meeting],
        title: "Board meeting",
        location: "Location for event 5",
        description: "Slide 1 description",
        date: "20/05/2020",
        time: "10:00 AM",
      },
    ],
  },
  {
    id: 6,
    title: "CU Graduation",
    imageUrl: event6,
    slides: [
      {
        imageUrls: [event6, event6b],
        title: "CU Graduation",
        location: "Location  for event 6",
        description: "Slide 1 description",
        date: "20/05/2020",
        time: "10:00 AM",
      },
    ],
  },
  {
    id: 7,
    title: "Tech Conference",
    imageUrl: event7,
    slides: [
      {
        imageUrls: [event7, event7b],
        title: "Tech Conference",
        location: "Tech Hub",
        description:
          "Join us for the annual tech conference where experts discuss the latest trends and innovations in technology.",
        date: "15/06/2020",
        time: "9:00 AM",
      },
    ],
  },
  {
    id: 8,
    title: "Music Festival",
    imageUrl: event8,
    slides: [
      {
        imageUrls: [event8, event8b],
        title: "Music Festival",
        location: "City Park",
        description:
          "Enjoy a day of music and fun with live performances from top artists at the annual Music Festival.",
        date: "10/07/2020",
        time: "12:00 PM",
      },
    ],
  },
  {
    id: 9,
    title: "Art Exhibition",
    imageUrl: event9,
    slides: [
      {
        imageUrls: [event9, event9b],
        title: "Art Exhibition",
        location: "Art Gallery",
        description:
          "Explore stunning artworks from various artists at the annual Art Exhibition.",
        date: "05/08/2020",
        time: "11:00 AM",
      },
    ],
  },
  {
    id: 10,
    title: "Health Talk",
    imageUrl: event10,
    slides: [
      {
        imageUrls: [event10, event10b],
        title: "Health Talk",
        location: "Main Square",
        description:
          "Taste a variety of delicious dishes and drinks at the Food Festival.",
        date: "25/08/2020",
        time: "1:00 PM",
      },
    ],
  },
  {
    id: 11,
    title: "Sports Meet",
    imageUrl: event11,
    slides: [
      {
        imageUrls: [event11, event11b],
        title: "Sports Meet",
        location: "Sports Complex",
        description:
          "Join us for a day of exciting sports competitions at the annual Sports Meet.",
        date: "10/09/2020",
        time: "8:00 AM",
      },
    ],
  },
  {
    id: 12,
    title: "Science Fair",
    imageUrl: event12,
    slides: [
      {
        imageUrls: [event12, event12b],
        title: "Science Fair",
        location: "Expo Center",
        description:
          "Discover amazing science projects and experiments at the Science Fair.",
        date: "20/09/2020",
        time: "10:00 AM",
      },
    ],
  },
  {
    id: 13,
    title: "Matriculation ",
    imageUrl: event13b,
    slides: [
      {
        imageUrls: [event13b, event13],
        title: "Matriculation",
        location: "University Hall",
        description:
          "Learn new dance moves and techniques at the Dance Workshop.",
        date: "30/09/2020",
        time: "2:00 PM",
      },
    ],
  },
  {
    id: 14,
    title: "Film Screening",
    imageUrl: event14,
    slides: [
      {
        imageUrls: [event14, event14b],
        title: "Film Screening",
        location: "Cinema Hall",
        description:
          "Watch a special screening of the latest blockbuster movie.",
        date: "10/10/2020",
        time: "6:00 PM",
      },
    ],
  },
  {
    id: 15,
    title: "Fashion Show",
    imageUrl: event15,
    slides: [
      {
        imageUrls: [event15, event15b],
        title: "Fashion Show",
        location: "Grand Ballroom",
        description:
          "Experience the latest fashion trends at the Fashion Show.",
        date: "20/10/2020",
        time: "7:00 PM",
      },
    ],
  },
  {
    id: 16,
    title: "Book Fair",
    imageUrl: event16,
    slides: [
      {
        imageUrls: [event16, event16b],
        title: "Book Fair",
        location: "Convention Center",
        description:
          "Browse through a wide selection of books at the Book Fair.",
        date: "30/10/2020",
        time: "9:00 AM",
      },
    ],
  },
];

export default featuredEvents;
