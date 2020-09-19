import * as React from 'react'
import {
    Theme, makeStyles,
    createStyles,
    TableContainer, Table, TableHead,
    TableRow, TableCell, TableBody, Paper, IconButton
} from '@material-ui/core'
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded';
import { IncomingMessage } from 'http';

interface Props {
    items: IDepositItems;
    changeCount: (item: string, add: boolean) => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            fontSize: '35px',
        },
        list: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

        },
        table: {
            minWidth: 100,
        }

    })
);


const ItemsList: React.FC<Props> = ({ items, changeCount }) => {
    const classes = useStyles();

    console.log(items)

    return (

        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell >Item</TableCell>
                        <TableCell align="right">Count</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.entries(items).map(([itemName, count]) => (
                        <TableRow key={itemName}>
                            <TableCell component="th" scope="row">
                                {itemName}
                            </TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => { if (count !== 0) { changeCount(itemName, false) } }}>
                                    <RemoveCircleOutlineRoundedIcon />
                                </IconButton>
                                {count}
                                <IconButton onClick={() => { changeCount(itemName, true) } }>
                                    <AddCircleOutlineRoundedIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>


        // <div>

        //     <MaterialTable columns={[
        //         { title: 'Name', field: 'itemName' },
        //         { title: 'Count', field: 'count' }
        //     ]}
        //         data={Object.entries(items).map(([itemName, count]) => ({ itemName: itemName, count: '' + count }))}

        //         components={{
        //             Toolbar: props => null,
        //             Pagination: props => null, 
        //         }}
        //     />
        // </div>

    )
}

export default ItemsList; 