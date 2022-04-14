import { Button, TableCell, TableRow } from "@mui/material";
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useCallback, useEffect } from "react";

const Board_copy = ({ lists, pageSize }) => {
    console.log("Board pagesize: ", pageSize);
    console.log(lists);

    // const rowsPerPage = page * rowsPerPage, page * rowsPerPage + rowsPerPage;

    const onDelete = useCallback( (params) => {
        console.log("on delete : ", params);
        console.log("lists : ", lists);
    }, [])

    // function onDelete(params) {
    //     getSvcList(lists.filter(data => data.id !== params.id));
    // };
    const rawsView = (params) => {
        console.log("raws view : ", params);
    }

    const DrawCell = ( {uid, items} ) => {
        return (
            <>
                <TableCell>
                    <Button label="rawview" onClick={rawsView(items)}>
                        <VisibilityIcon />
                    </Button>
                </TableCell>
                <TableCell key={uid.toString().concat('-name')}>{items.name}</TableCell>
                <TableCell key={uid.toString().concat('host')}>{items.host}</TableCell>
                <TableCell key={uid.toString().concat('tags')}>{items.tags}</TableCell>
                <TableCell key={uid.toString().concat('create_at')}>{items.created_at}</TableCell>
                <TableCell>
                    <Button label="Delete" onClick={onDelete(items)}>
                        <DeleteIcon />Delete
                    </Button>
                </TableCell>
            </>
        )
    }
    const DrawRow = ({uid, items}) => {
        const rowSuffix = items[0].toString();
        // console.log(uid);
    
        return items.map( (rItem, rIdx) => {
            if( rIdx === (items.length-1) ) {
                const cellKey = rowSuffix.concat(rIdx.toString());
                // console.log('row item key : ', cellKey);
    
                return (
                    <TableRow key={uid}>
                        <DrawCell key={cellKey} uid={cellKey} items={rItem} />
                    </TableRow>
                )
            } else {
                return null;
            }
        });
    }

    // return lists?.map( (items, idx) => {
    //     return <DrawRow key={idx} uid={idx} items={items} />
    // });

    return lists ? lists.slice().map( (items, idx) => {
                return <DrawRow key={idx} uid={idx} items={items} />
            }) : <DrawRow key='key' uid='uid' items={[]} />
    ;
}

Board_copy.propTypes = {
    lists: PropTypes.array.isRequired
}

export default Board_copy;