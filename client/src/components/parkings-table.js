import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

export const ParkingsTable = (props) => {
  const { parkings } = props;

  return (
    <div>
      <Table
        sortdirection='desc'>
        <TableHead>
          <TableRow>
            <TableCell>
              parkingID
            </TableCell>
            <TableCell>
              Location
            </TableCell>
            <TableCell>
              Rating
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {parkings.map((parking) => {
            return (
              <TableRow key={parking.id}>
                <TableCell>
                  {parking.id}
                </TableCell>

                <TableCell>
                  {parking.location}
                </TableCell>

                <TableCell>
                  {parking.rating}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

ParkingsTable.propTypes = {
  parkings: PropTypes.array.isRequired
};
