// Side Bar
import { Calendar, BookmarkSimple, ShareNetwork } from "@phosphor-icons/react";
import img1 from "../assets/sand dunes.jpeg";
import img2 from "../assets/evente.png";
import img3 from "../assets/pexels-mohamad-tamer-2406785.jpg";
export const cardsData = [
  {
    title: "Events",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 70,
    value: "13",
    png: Calendar,
    series: [
      {
        name: "Events",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  {
    title: "RSVP",
    color: {
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    barValue: 80,
    value: "3",
    png: BookmarkSimple,
    series: [
      {
        name: "RSVP",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
  {
    title: "Invites",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 60,
    value: "1",
    png: ShareNetwork,
    series: [
      {
        name: "Invites",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
  },
];
export const UpdatesData = [
  {
    img: img1,
    name: "Joy",
    noti: 'has sent you an Invite for the Event "The Last of Us" ',
    time: "25 seconds ago",
  },
  {
    img: img2,
    name: "James Bond",
    noti: 'has sent you an Invite  for the Event "Diamonds are Forever"',
    time: "55 Minutes ago",
  },
  {
    img: img3,
    name: "Peter Parker",
    noti: 'has sent you an Invite  for the Event "SpiderMan No way Home"',
    time: "2 hours ago",
  },
];
