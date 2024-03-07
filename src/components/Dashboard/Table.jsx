import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../../custom css/Table.css";
import { useAuth } from "../../utils/AuthContext";
import {
  Collection_Id,
  Database_Id,
  databases,
} from "../../appwrite/appWriteConfig";

function createData(events, rsvps, invites) {
  return { events, rsvps, invites };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
  const { user } = useAuth();
  const [events, setEvents] = React.useState([]);
  // console.log(user);
  React.useEffect(() => {
    const fetchData = async function () {
      try {
        const response = await databases.listDocuments(
          Database_Id,
          Collection_Id
        );
        // Filter events based on the currently logged-in user
        const filteredEvents = response.documents.filter(
          (event) => event.creatorUserId === user.$id
        );
        console.log("filtered", filteredEvents);

        // Sort filtered events by some criteria, assuming 'createdAt' field exists
        const sortedEvents = filteredEvents.sort(
          (a, b) => b.createdAt - a.createdAt
        );

        // Set only the first 3 events
        setEvents(sortedEvents.slice(0, 3));
        console.log(events, "fetched");
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="Table">
      <h3>Recent Activities</h3>

      <TableContainer component={Paper} className="tableContainer">
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          className="mainTable"
        >
          <TableHead>
            <TableRow>
              <TableCell align="left">Events</TableCell>
              <TableCell align="left">RSVPs</TableCell>
              <TableCell align="left">Invites</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.length > 0 ? (
              events.map((event) => (
                <TableRow
                  key={event.$id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {event.eventName}
                  </TableCell>
                  <TableCell align="left">{event.RSVP}</TableCell>
                  <TableCell align="left">{event.invites}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No events found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
