import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

export const WorkersTable = (props) => {
  const { workers } = props;

  return (
    <div>
      <Table
        sortdirection='desc'>
        <TableHead>
          <TableRow>
            <TableCell>
              WorkerID
            </TableCell>
            <TableCell>
              Email
            </TableCell>
            <TableCell>
              Name
            </TableCell>
            <TableCell>
              Experience
            </TableCell>
            <TableCell>
              Rating
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workers.map((worker) => {
            return (
              <TableRow key={worker.id}>
                <TableCell>
                  {worker.id}
                </TableCell>

                <TableCell>
                  {worker.email}
                </TableCell>

                <TableCell>
                  {worker.name}
                </TableCell>

                <TableCell>
                  {worker.workExperience} hours
                </TableCell>

                <TableCell>
                  {worker.rating}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

WorkersTable.propTypes = {
  workers: PropTypes.array.isRequired
};
