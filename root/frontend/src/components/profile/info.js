import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(name, calories) {
  id += 1;
  return { id, name, calories };
}

const rows = [
  createData('Frozen yoghurt', 159),
  createData('Ice cream sandwich', 237),
  createData('Eclair', 262),
  createData('Cupcake', 305),
  createData('Gingerbread', 356),
];

function SimpleTable(props) {
    console.log(props.info.contactInfo)
    const rows = [
        createData('user name', props.info.name?props.info.name:"none"),
        createData('email',  props.info.email?props.info.email:"none" ),
        createData('rate', props.info.rate?props.info.rate:"none"),
        
        // createData('description', props.info.description?props.info.description:"none"),
        // createData('website',props.info.website?props.info.website:"none"),
        // createData('fax',props.info.fax?props.info.fax:"none"),
        // createData('address',props.info.address?props.info.address:"none"),
        createData('fieldOfWork',props.info.fieldOfWork?props.info.fieldOfWork:"none")
      ];
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="auto">{row.calories}</TableCell>
              <button>update</button>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
  
  
};

export default withStyles(styles)(SimpleTable);
